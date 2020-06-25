const test = require('ava');

const makeMockRequest = require('./helpers/streamline-request-mock');
const createServerInterface = require('../../api/streamline/');

test('Testing info request', async (t) => {
    const streamlineApi = createServerInterface(makeMockRequest);

    const response = await streamlineApi.propertySummary(({ unitId: 154486 }));

    t.is(response.name, 'LV 20-103 Edenshire');
    t.is(response.maxOccupants, 8);
});

test('Search request', async (t) => {
    const streamlineApi = createServerInterface(makeMockRequest);

    const response = await streamlineApi.properties(({
        startDate: '2017-11-20',
        endDate: '2017-11-26'
    }));

    t.is(response.length, 11);
    t.is(response[0].unitId, 154156);
    t.is(response[0].dayPrices.length, 6);
});

test('Search request with local filtering on number of bathrooms', async (t) => {
    const streamlineApi = createServerInterface(makeMockRequest);

    const response = await streamlineApi.properties(({
        startDate: '2017-11-20',
        endDate: '2017-11-26',
        bathrooms: 4
    }));

    t.is(response.length, 3);
});

test('Property pricing', async (t) => {
    const streamlineApi = createServerInterface(makeMockRequest);

    const response = await streamlineApi.propertyDetail({
        startDate: '2017-11-20',
        endDate: '2017-11-26',
        unitId: 154486
    });

    t.is(response.totalPrice, 1080);
    t.is(response.fees.length, 3);

    t.is(response.bedrooms.length, 3);
    t.is(response.bedrooms[0].name, 'Master Bedroom');
});
