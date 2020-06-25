const makeStreamlikeApiRequestCache = require('./streamline-api-cache');
const throttle = require('p-throttle');
const parseDate = require('date-fns/parse');
const formatDate = require('date-fns/format');

const requestsPerMinute = 70;
const msInAMinute = 1000 * 60;
const coerceObjectToString = str => (typeof str === 'object' ? '' : str);
const coerceObjectToNull = value => (typeof value === 'object' ? null : value);
const putObjectInArray = object => (object ? [object] : []);
const coerceToArray = value => (Array.isArray(value) ? value : putObjectInArray(value));
const throwErrorWithResponse = (err, body) => {
    throw new Error(`Error '${ err.message } when interpreting response ${ JSON.stringify(body) }`);
};

module.exports = (makeRequest) => {
    const throttledRequest = throttle(makeRequest, requestsPerMinute, msInAMinute);
    const cachedRequest = makeStreamlikeApiRequestCache(throttledRequest, {
        GetPropertyList: (body) => {
            const propertyArray = coerceToArray(body.data.property)
                .filter((property) => property.online_bookings)
                .map((streamlineObject) => ({
                    name: streamlineObject.name,
                    unitId: streamlineObject.id,
                    imageUrl: streamlineObject.default_image_path,
                    maxOccupants: streamlineObject.max_occupants,
                    bedroomCount: streamlineObject.bedrooms_number,
                    bathroomCount: streamlineObject.bathrooms_number,
                    rating: {
                        count: streamlineObject.rating_count,
                        average: streamlineObject.rating_average
                    },
                    address: {
                        address: streamlineObject.address,
                        city: streamlineObject.city,
                        state: streamlineObject.state_name,
                        zip: streamlineObject.zip
                    },
                    location: {
                        latitude: coerceObjectToNull(streamlineObject.location_latitude),
                        longitude: coerceObjectToNull(streamlineObject.location_longitude)
                    },
                    description: streamlineObject.description,
                    shortDescription: streamlineObject.short_description,
                    locationAreaName: streamlineObject.location_area_name,
                    locationResortName: streamlineObject.location_resort_name,
                    onlineBookings: streamlineObject.online_bookings
                }));

            const propertyMap = Object.create(null);

            propertyArray.forEach((property) => {
                propertyMap[property.unitId] = property;
            });

            return propertyMap;
        },
        GetPropertyInfoWordPress: body => ({
            amenities: coerceToArray(body.data.unit_amenities.amenity)
                .filter(streamlineAmenity => streamlineAmenity.amenity_show_on_website)
                .map(streamlineAmenity => streamlineAmenity.amenity_name),
            imageUrls: coerceToArray(body.data.gallery.image)
                .map(streamlineImage => streamlineImage.image_path)
        }),
        GetPropertyRoomDetails: body => coerceToArray(body.data.room_details).map(streamlineRoom => ({
            name: streamlineRoom.name,
            amenities: coerceToArray(streamlineRoom.group)
                .filter(streamlineRoomDetail => streamlineRoomDetail.name === 'Bedroom Details'
                    && streamlineRoomDetail.amenity)
                .map(streamlineRoomDetail => streamlineRoomDetail.amenity.name)
        }))
    });

    const translateDayPrices = days => coerceToArray(days).map(({ date, price }) => ({
        date: formatDate(parseDate(date, 'MM/DD/YYYY'), 'YYYY-MM-DD'),
        price
    }));

    const preReservationPriceRequest = ({ unitId, startDate, endDate }) =>
        throttledRequest('GetPreReservationPrice', { unitId, startDate, endDate })
            .then((body) => {
                try {
                    const data = body.data;
                    return {
                        totalPrice: data.price,
                        taxAmount: data.taxes,
                        fees: data.required_fees.map(({ name, value, description }) =>
                            ({
                                name,
                                amount: value,
                                description: coerceObjectToString(description)
                            })),
                        taxes: data.taxes_details.map(({ name, value }) =>
                            ({ name, amount: value })),
                        dayPrices: translateDayPrices(data.reservation_days)
                    };
                } catch (e) {
                    throwErrorWithResponse(e, body);
                }
            });

    const propertyAvailabilityWithRatesRequest = ({
        startDate, endDate, occupants
    }) =>
        throttledRequest('GetPropertyAvailabilityWithRates', {
            startDate,
            endDate,
            occupants,
            getDetailNightlyRates: 'yes'
        })
            .then((body) => {
                try {
                    const streamlineProperty = body.data.available_properties.property;

                    if (streamlineProperty === undefined) {
                        return [];
                    }

                    const properties = coerceToArray(streamlineProperty);

                    return properties.map(property => ({
                        unitId: property.unit_id,
                        minimumDayPrice: property.minimum_day_price,
                        subtotal: property.price,
                        taxAmount: property.taxes,
                        feeAmount: property.fees,
                        totalPrice: property.total,
                        dayPrices: translateDayPrices(property.detail_nightly_rates)
                    }));
                } catch (e) {
                    throwErrorWithResponse(e, body);
                }
            });

    const getPropertyDetails = async (unitId) => {
        const propertyIdToPropertyDetails = await cachedRequest.getResponse({ methodName: 'GetPropertyList', body: {} });
        return propertyIdToPropertyDetails[unitId];
    };

    return {
        async properties({
            startDate,
            endDate,
            occupants,
            bedrooms,
            bathrooms
        }) {
            const [
                availabilityWithPrices,
                propertyIdToPropertyDetails
            ] = await Promise.all([
                propertyAvailabilityWithRatesRequest({ startDate, endDate, occupants }),
                cachedRequest.getResponse({ methodName: 'GetPropertyList', body: {} })
            ]);

            return availabilityWithPrices.map((availabilityWithPrice) => {
                const details = propertyIdToPropertyDetails[availabilityWithPrice.unitId];
                return Object.assign({}, availabilityWithPrice, details, { description: undefined });
            }).filter((result) => {
                const bedroomsAcceptable = bedrooms === undefined || bedrooms <= result.bedroomCount;
                const bathroomsAcceptable = bathrooms === undefined || bathrooms <= result.bathroomCount;
                return bedroomsAcceptable && bathroomsAcceptable;
            });
        },
        async propertySummary({ unitId }) {
            const response = await getPropertyDetails(unitId);

            if (!response) {
                return null;
            }

            const {
                name,
                imageUrl,
                maxOccupants,
                bedroomCount,
                bathroomCount,
                rating
            } = response;

            return {
                name,
                imageUrl,
                maxOccupants,
                bedroomCount,
                bathroomCount,
                rating
            };
        },
        async propertyDetail({ unitId, startDate, endDate }) {
            const [
                pricing,
                amenitiesAndImages,
                bedrooms,
                propertyDetails
            ] = await Promise.all([
                preReservationPriceRequest({ unitId, startDate, endDate }),
                cachedRequest.getResponse({ methodName: 'GetPropertyInfoWordPress', body: { unitId } }),
                cachedRequest.getResponse({ methodName: 'GetPropertyRoomDetails', body: { unitId } }),
                getPropertyDetails(unitId)
            ]);

            const {
                totalPrice,
                taxAmount,
                fees,
                taxes,
                dayPrices
            } = pricing;

            const {
                imageUrls,
                amenities
            } = amenitiesAndImages;

            const {
                address,
                location,
                description
            } = propertyDetails;

            return {
                totalPrice,
                taxAmount,
                fees,
                taxes,
                dayPrices,
                imageUrls,
                amenities,
                bedrooms,
                address,
                location,
                description
            };
        }
    };
};
