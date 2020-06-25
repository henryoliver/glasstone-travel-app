const gateKeeper = require('gate-keeper');

const throwErrorWithResponse = (err, body) => {
    throw new Error(`Error '${ err.message } when interpreting response ${ JSON.stringify(body) }`);
};
const hour = 60 * 60 * 1000;
const defaultTtl = 12 * hour;

module.exports = (makeRequest, methodTransforms = {}, ttl = defaultTtl) => {
    const responseCache = createCache(ttl);

    const mutexRequestMaker = createMutexRequestMaker(makeRequest);

    async function makeRequestAndUpdateCache({ methodName, body }) {
        const key = makeMethodBodyKey({ methodName, body });
        const response = await mutexRequestMaker({ methodName, body });

        try {
            const transformedResponse = methodTransforms[methodName]
                ? methodTransforms[methodName](response)
                : response;

            responseCache.add(key, transformedResponse);

            return transformedResponse;
        } catch (e) {
            throwErrorWithResponse(e, response);
        }
    }

    function clearResponse({ methodName, body }) {
        const key = makeMethodBodyKey({ methodName, body });
        responseCache.clearCacheKey(key);
    }

    return {
        clearResponse,
        async getResponse({ methodName, body }) {
            const key = makeMethodBodyKey({ methodName, body });

            const cachedResponseExists = responseCache.exists(key);

            if (cachedResponseExists) {
                if (responseCache.isExpired(key)) {
                    makeRequestAndUpdateCache({ methodName, body });
                }
                return responseCache.get(key);
            }

            return makeRequestAndUpdateCache({ methodName, body });
        },
        refreshResponse({ methodName, body }) {
            clearResponse({ methodName, body });
            return makeRequestAndUpdateCache({ methodName, body });
        }
    };
};

function createCache(ttl) {
    const cache = Object.create(null);

    return {
        exists(key) {
            return !!cache[key];
        },
        get(key) {
            return cache[key].object;
        },
        clearCacheKey(key) {
            delete cache[key];
        },
        isExpired(key) {
            const cached = cache[key];
            return cached && Date.now() - cached.date.getTime() >= ttl;
        },
        add(key, object) {
            cache[key] = {
                date: new Date(),
                object
            };
        }
    };
}

function createMutexRequestMaker(makeRequest) {
    const requestMakers = Object.create(null);

    return function makeNoMoreThanOneRequestAtATimeFor({ methodName, body }) {
        const key = makeMethodBodyKey({ methodName, body });

        if (!requestMakers[key]) {
            requestMakers[key] = gateKeeper(() => makeRequest(methodName, body));
        }

        return requestMakers[key]();
    };
}

const makeMethodBodyKey = ({ methodName, body }) =>
    makeCacheKey(Object.assign({}, body, { methodName }));

const makeCacheKey = object => Object.keys(object)
    .sort()
    .reduce(
        (cacheKey, objectProperty) => `${ cacheKey }|${ objectProperty }:${ object[objectProperty] }`,
        ''
    );
