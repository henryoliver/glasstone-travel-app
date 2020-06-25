import 'url-search-params-polyfill';

export default {
    namespaced: true,

    state: {
        detail: {
            address: {},
            amenities: [],
            bathroomCount: 0,
            bedroomCount: 0,
            bedrooms: [],
            dayPrices: [],
            description: '',
            fees: [],
            imageUrl: '',
            imageUrls: [],
            location: {},
            maxOccupants: 0,
            name: '',
            rating: {},
            taxAmount: 0,
            taxes: [],
            totalPrice: 0
        },
        selection: {
            slide: [],
            lightbox: []
        },
        map: ''
    },

    getters: {
        detail(state) {
            return state.detail;
        },

        selection(state) {
            return state.selection;
        },

        map(state) {
            return state.map;
        }
    },

    actions: {
        async detail({ commit, rootGetters }, id) {
            commit('toggleLoader', true, { root: true });

            const search = rootGetters['search/parameters'];

            const params = Object.assign({}, search, {
                startDate: new Date(search.startDate).toISOString().split('T')[0],
                endDate: new Date(search.endDate).toISOString().split('T')[0]
            });

            const query = new URLSearchParams(params);

            let property;

            try {
                const response = await fetch(`/property-detail/${ id }?${ query }`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'same-origin'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                property = await response.json();
                commit('setDetail', property);
                commit('setSelection', property.imageUrls);
                commit('setMap', property);
            } catch (error) {
                console.error(error);
            } finally {
                console.info('Finally');
                commit('toggleLoader', false, { root: true });
            }

            return property;
        }
    },

    mutations: {
        setDetail(state, property) {
            state.detail = property;
        },

        setSelection(state, property) {
            const selection = {
                slide: property.slice(0, 1),
                lightbox: property.slice(1, 26)
            };

            state.selection = selection;
        },

        setMap(state, property) {
            const params = new URLSearchParams({
                center: `${ property.address.address },${ property.address.city },${ property.address.state }`,
                zoom: 10,
                size: '280x280',
                maptype: 'roadmap',
                markers: `anchor:center|icon:https://goo.gl/yZb8cU|${ property.location.latitude },${ property.location.longitude }`,
                style: 'feature:all|element:labels.text.fill|saturation:0|color:0x333333|lightness:40'
            });

            params.append('style', 'feature:all|element:labels.text.stroke|visibility:on|color:0xffffff|lightness:16');
            params.append('style', 'feature:all|element:labels.icon|visibility:off');
            params.append('style', 'feature:administrative|element:geometry.fill|color:0xfefefe|lightness:20');
            params.append('style', 'feature:administrative|element:geometry.stroke|color:0xfefefe|lightness:17|weight:1.2');
            params.append('style', 'feature:landscape|element:geometry|color:0xf5f5f5|lightness:20');
            params.append('style', 'feature:poi|element:geometry|color:0xf5f5f5|lightness:21');
            params.append('style', 'feature:poi.park|element:geometry|color:0xdedede|lightness:21');
            params.append('style', 'feature:road.highway|element:geometry.fill|color:0xffffff|lightness:17');
            params.append('style', 'feature:road.highway|element:geometry.fill|color:0xffffff|lightness:17');
            params.append('style', 'feature:road.highway|element:geometry.stroke|color:0xffffff|lightness:29|weight:0.2');
            params.append('style', 'feature:road.arterial|element:geometry|color:0xffffff|lightness:18');
            params.append('style', 'feature:road.local|element:geometry|color:0xffffff|lightness:16');
            params.append('style', 'feature:transit|element:geometry|color:0xf2f2f2|lightness:19');
            params.append('style', 'feature:water|element:geometry|color:0xc9c9c9|lightness:17');
            params.append('key', process.env.MAP_KEY);

            state.map = `//maps.googleapis.com/maps/api/staticmap?${ params }`;
        }
    }
};
