const popsicle = require('popsicle');
const status = require('popsicle-status');
const snakeCase = require('snake-case');

const stupidStreamlineDateFormatting = require('./streamline-date-format');

module.exports = ({ tokenKey, tokenSecret }) => (methodName, body = {}) => popsicle.request({
    method: 'POST',
    url: 'https://web.streamlinevrs.com/api/json',
    body: {
        methodName,
        params: Object.assign({
            token_key: tokenKey,
            token_secret: tokenSecret
        }, streamlineReadyBody(body))
    }
}).use(status()).use(popsicle.plugins.parse('json')).then(response => response.body);

const snakeCaseSpecialCases = Object.freeze({
    startDate: 'startdate',
    endDate: 'enddate'
});
const streamlineSnakeCase = key => snakeCaseSpecialCases[key] || snakeCase(key);

const streamlineValueSpecialCaseFormatters = Object.freeze({
    startDate: stupidStreamlineDateFormatting,
    endDate: stupidStreamlineDateFormatting
});

function streamlineReadyBody(body) {
    const snakeCasedBody = {};
    Object.keys(body).forEach((key) => {
        const value = streamlineValueSpecialCaseFormatters[key]
            ? streamlineValueSpecialCaseFormatters[key](body[key])
            : body[key];

        snakeCasedBody[streamlineSnakeCase(key)] = value;
    });
    return snakeCasedBody;
}
