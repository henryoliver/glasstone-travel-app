const streamlineDateFormat = require('./streamline/streamline-date-format');
const router = require('koa-bestest-router');

const { streamline: streamlineConfig } = require('./streamline/config');
const makeStreamlineRequest = require('./streamline/streamline-http-request')(streamlineConfig);
const createStreamlineApi = require('./streamline');
const sendMail = require('./email');

const streamlineApi = createStreamlineApi(makeStreamlineRequest);

module.exports = router({
    GET: {
        '/properties-search': async (context) => {
            const {
                startDate, endDate, occupants, bedrooms, bathrooms
            } = context.query;

            if (!startDate || !endDate) {
                context.status = 400;
                context.body = {
                    error: 'Must supply startDate and endDate'
                };
            } else {
                context.body = await streamlineApi.properties({
                    startDate, endDate, occupants, bedrooms, bathrooms
                });
            }
        },
        '/property-detail/:unitId(\\d+)': async (context) => {
            const { startDate, endDate } = context.query;

            if (!startDate || !endDate) {
                context.status = 400;
                context.body = {
                    error: 'Must supply startDate and endDate'
                };
            } else {
                const { unitId } = context.params;

                const [detail, summary] = await Promise.all([
                    streamlineApi.propertyDetail({
                        startDate, endDate, unitId
                    }),
                    streamlineApi.propertySummary({ unitId })
                ]);

                context.body = Object.assign({}, summary, detail);
            }
        }
    },
    POST: {
        '/reservation': async (context) => {
            const {
                unitId,
                startDate,
                endDate,
                occupants,
                givenName,
                familyName,
                email,
                phone,
                address,
                city,
                state,
                country,
                zip,
                ccTypeId,
                ccNumber,
                ccExpMonth,
                ccExpYear,
                ccCsc,
                ccAmount
            } = context.request.body;

            if (!unitId || !startDate || !endDate || Number.isNaN(occupants) || !givenName || !familyName || !email || !phone || !address || !city || !state || !country || !zip || !ccTypeId || !ccNumber || !ccExpMonth || !ccExpYear || !ccCsc || !ccAmount) {
                context.status = 400;
                context.body = {
                    error: 'Must supply unitId, startDate, endDate, occupants, givenName, familyName, email, phone, address, city, state, country, zip, ccTypeId, ccNumber, ccExpMonth, ccExpYear, ccCsc, ccAmount'
                };
            } else {
                context.body = await makeStreamlineRequest('MakeReservation', {
                    unit_id: unitId,
                    startdate: streamlineDateFormat(startDate),
                    enddate: streamlineDateFormat(endDate),
                    occupants,
                    first_name: givenName,
                    last_name: familyName,
                    email,
                    mobile_phone: phone,
                    address,
                    city,
                    state_name: state,
                    country_name: country,
                    zip,
                    credit_card_type_id: ccTypeId,
                    credit_card_number: ccNumber,
                    credit_card_expiration_month: ccExpMonth,
                    credit_card_expiration_year: ccExpYear,
                    credit_card_cid: ccCsc,
                    credit_card_amount: ccAmount
                });
            }
        },
        '/email': async (context) => {
            const {
                name,
                phone,
                email,
                message
            } = context.request.body;

            if (!name || !phone || !email || !message) {
                context.status = 400;
                context.body = {
                    error: 'Must supply name, phone, email, message'
                };
            } else {
                context.body = await sendMail({
                    name,
                    phone,
                    email,
                    message
                });
            }
        }
    }
});
