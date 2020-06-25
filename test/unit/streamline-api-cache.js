const test = require('ava');
const delay = require('delay');

const createCachingApi = require('../../api/streamline/streamline-api-cache');

test('Only runs one identical request at a time', async (t) => {
    let running = false;
    const coolResponse = { cool: true };
    const cachingApi = createCachingApi(async () => {
        t.false(running);
        running = true;
        await delay(100);
        running = false;
        return coolResponse;
    });

    const request = {
        methodName: 'whatever',
        body: {}
    };

    const properties = await Promise.all([
        cachingApi.getResponse(request),
        cachingApi.getResponse(request)
    ]);

    t.is(properties[0], coolResponse);
    t.is(properties[1], coolResponse);
});

test('Different request methods are cached separately', async (t) => {
    const responses = {
        first: { value: 1 },
        second: { value: 2 }
    };
    let requests = 0;
    const cachingApi = createCachingApi(async (methodName, body) => {
        requests++;
        await delay(100);
        return responses[methodName];
    });

    await Promise.all([
        cachingApi.getResponse({ methodName: 'first', body: {} }),
        cachingApi.getResponse({ methodName: 'second', body: {} })
    ]);

    t.is(requests, 2);

    const properties = await Promise.all([
        cachingApi.getResponse({ methodName: 'first', body: {} }),
        cachingApi.getResponse({ methodName: 'second', body: {} })
    ]);

    t.is(requests, 2);

    t.is(properties[0], responses.first);
    t.is(properties[1], responses.second);
});

test('Requests with different bodies are cached separately', async (t) => {
    const responses = {
        first: { value: 1 },
        second: { value: 2 }
    };
    let requests = 0;
    const cachingApi = createCachingApi(async (methodName, body) => {
        requests++;
        await delay(100);
        return responses[body.thingy];
    });

    await Promise.all([
        cachingApi.getResponse({ methodName: 'coolMethod', body: { thingy: 'first' } }),
        cachingApi.getResponse({ methodName: 'coolMethod', body: { thingy: 'second' } })
    ]);

    t.is(requests, 2);

    const properties = await Promise.all([
        cachingApi.getResponse({ methodName: 'coolMethod', body: { thingy: 'first' } }),
        cachingApi.getResponse({ methodName: 'coolMethod', body: { thingy: 'second' } })
    ]);

    t.is(requests, 2);

    t.is(properties[0], responses.first);
    t.is(properties[1], responses.second);
});

test('When the response is past the ttl, return it anyway, but also refresh the cached data', async (t) => {
    const ttl = 10;
    let serverRequests = 0;

    const cachingApi = createCachingApi(async () => {
        serverRequests++;

        return serverRequests;
    }, {}, ttl);

    t.is(await cachingApi.getResponse({ methodName: 'coolMethod', body: {} }), 1);
    await delay(50);
    t.is(await cachingApi.getResponse({ methodName: 'coolMethod', body: {} }), 1, 'Still returning the first response');
    await delay(5);
    t.is(await cachingApi.getResponse({ methodName: 'coolMethod', body: {} }), 2, 'Returned the value from the second request');
    await (delay, 50);

    t.is(serverRequests, 2, 'The last getResponse call did not trigger a server request');
});

test('refreshResponse', async (t) => {
    let serverRequests = 0;

    const cachingApi = createCachingApi(async () => {
        serverRequests++;

        await delay(50);

        return serverRequests;
    });

    const request = { methodName: 'whatevs', body: { cool: false } };

    t.is(await cachingApi.getResponse(request), 1);
    cachingApi.refreshResponse(request);
    t.is(await cachingApi.getResponse(request), 2);
});

test('Error responses are not cached', async (t) => {
    let serverRequests = 0;

    const cachingApi = createCachingApi(async () => {
        serverRequests++;

        await delay(50);

        if (serverRequests === 1) {
            throw new Error('Something went wrong I guess');
        }

        return 'legit response';
    });

    const request = { methodName: 'whatevs', body: { cool: false } };

    try {
        await cachingApi.getResponse(request);
        t.fail('Should reject the promise before this line');
    } catch (e) {
        t.is(e.message, 'Something went wrong I guess');
    }

    t.is(await cachingApi.getResponse(request), 'legit response');
});

test('Transform responses per-method', async (t) => {
    const cachingApi = createCachingApi(async () => 'cool response', {
        first: str => str.toUpperCase()
    });

    t.is(await cachingApi.getResponse({ methodName: 'first', body: {} }), 'COOL RESPONSE');
    t.is(await cachingApi.getResponse({ methodName: 'second', body: {} }), 'cool response');
});
