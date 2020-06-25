# Things we need to get from Streamline

## Needed to filter units for search results

- availability by day
- number of guests a house can support
- number of bedrooms
- number of bathrooms

## Needed to display in search results

- unit name
- a single image (the "main" image, if available)
- number of guests a house can support
- number of bedrooms
- number of showers?
- number of ratings
- rating average

## Needed to display property detail page

- Price per night
- Fees per stay
- number of ratings/opinions
- list of reviews: name of reviewer, text of review, 1-5 star rating
- "about this house"
- pictures
- list of amenities (plain text, one line)
- bedroom details (each room with its name/description, and the list of beds in that room)
- location in a form that can be passed to Google Maps
- distances from the house to local attractions

# Notes about the Streamline API

- all dates input/output are in stupid MM/DD/YYYY format
- it's really slow
    - we need to cache aggressively
    - when we need to make requests based on user interaction, we need to pass in lots of limiting arguments to make the requests faster

# Requests the client needs to make to our server

- properties
    - request
        - startDate
        - endDate
        - occupants (optional)
        - bedrooms (optional)
        - bathrooms (optional)
    - response
        - array of matching properties including
            - name
            - unitId
            - imageUrl
            - maxOccupants
            - bedroomCount
            - bathroomCount
            - minimumDayPrice
            - taxAmount
            - feeAmount
            - totalPrice
            - ratingCount
            - ratingAverage
            - locationAddress
            - locationCity
            - locationState
            - locationZip
- property summary
    - request
        - unitId
    - response (like the object above, but without pricing or unitId)
            - name
            - imageUrl
            - maxOccupants
            - bedroomCount
            - bathroomCount
            - ratingCount
            - ratingAverage
            - locationAddress
            - locationCity
            - locationState
            - locationZip
- property details/pricing
    - request
        - unitId
        - startDate
        - endDate
    - response
        - totalPrice
        - taxAmount
        - fees (array of objects)
            - name
            - description
            - amount
        - taxes (array of objects)
            - name
            - amount
        - dayPrices (array of objects)
            - date
            - amount
        - imageUrls (array of strings)
        - amenities (array of strings)
        - bedrooms (array of objects)
            - name
            - amenities (array of strings)
        - address (object)
            - street
            - city
            - state
            - zip

# Requests to the Streamline API

Originally I was trying to figure out a way where we could cache almost everything on the server and avoid having to make requests to Streamline until it was time to make a reservation, but their pricing machinations are a bit arcane, so I wasn't able to pull that off.

## Cached property data

These requests should only be run when the server starts up, and then only periodically after that, so that we can maintain an in-memory map of property ids to the property data we care about, and avoid making more requests later.

The latter two requests need to be run for each unit, so it may be best to only run them lazily when they are needed, and cache them from that point.

- [GetPropertyList](https://xstreamline.atlassian.net/wiki/spaces/APT/pages/41954785/GetPropertyList): returns all properties.
    - data.property is an array of objects containing
        - id
        - name
        - bedrooms_number
        - bathrooms_number
        - max_occupants
        - rating_count
        - rating_average
        - default_image_path
        - default_thumbnail_path
        - description
        - one way to get location:
            - address
            - city
            - zip
            - state_name
        - OR
            - location_latitude
            - location_longitude
- [GetPropertyInfoWordPress](https://xstreamline.atlassian.net/wiki/spaces/APT/pages/41954624/GetPropertyInfoWordPress): takes `unit_id`
    - data.unit_amenities.amenity: an array of objects containing
        - amenity_name
        - amenity_show_on_website
    - data.gallery.image: an array of objects containing
        - image_path
        - thumbnail_path
- [GetPropertyRoomDetails](https://xstreamline.atlassian.net/wiki/spaces/APT/pages/41955413/GetPropertyRoomDetails): takes `unit_id`
    - data.room_details: an array of objects containing
        - name
        - group: an array of objects containing
            - name (filter to just the ones named "Bedroom Details" to get what the display page needs)
            - amenity.name

## Search requests

Since we need pricing data at the time of displaying search results, I couldn't find any way to get that information without making another call to Streamline.

- [GetPropertyAvailabilityWithRates](https://xstreamline.atlassian.net/wiki/spaces/APT/pages/41957773/GetPropertyAvailabilityWithRates) - takes `unit_id` (a string containing comma-separated unit ids) and `startdate` + `enddate`
    - data.available_properties.property: an array of objects containing
        - unit_id
        - minimum_day_price
        - price
        - taxes
        - fees
        - total
        - detail_nightly_rates: an array of objects containing
            - price
            - date


## Property detail

Most of the data we need for the detail page will already be cached, but to give the full reservation pricing details, we'll need to make this request.

- [GetPreReservationPrice](https://xstreamline.atlassian.net/wiki/spaces/APT/pages/45252772/GetPreReservationPrice) - takes `unit_id`, `startdate`, `enddate`
    - data: an object containing
        - price
        - taxes
        - required_fees: an array of objects containing
            - name ("Cleaning At Exit")
            - value ("240.00")
            - description ("Fee applied for 9 bedroom homes.")
        - optional_fees: an array of objects like required_fees
        - taxes_details: an array of objects containing
            - name
            - value
        - reservation_days: an array of objects containing
            - date
            - price

# Other notes

- While the client doesn't have any customer reviews yet, there are at least API endpoints that return those values.  However, I couldn't find any endpoints that return rating/review text.  Perhaps Streamline will expose that data in the future?
- I could not find any reference to Streamline exposing a list of nearby attractions.
