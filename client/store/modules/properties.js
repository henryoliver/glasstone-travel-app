import 'url-search-params-polyfill';

export default {
    namespaced: true,

    state: {
        all: []
    },

    getters: {
        all(state) {
            return state.all;
        },

        filterBy(state) {
            return filter => state.all.filter((item) => {
                return (filter.prop.length) ? (item[filter.prop] === filter.value) : state.all;
            });
        },

        sortBy(state) {
            return property => state.all.sort((a, b) => a[property] - b[property]);
        }
    },

    actions: {
        async all({ commit, rootGetters }) {
            commit('toggleLoader', true, { root: true });

            const search = rootGetters['search/parameters'];

            const params = Object.assign({}, search, {
                startDate: new Date(search.startDate).toISOString().split('T')[0],
                endDate: new Date(search.endDate).toISOString().split('T')[0]
            });

            const query = new URLSearchParams(params);

            let properties;

            try {
                const response = await fetch(`/properties-search?${ query }`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'same-origin'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                properties = await response.json();
                commit('setAll', properties);
            } catch (error) {
                commit('setAll', []);
                console.error(error);
            } finally {
                console.info('Finally');
                commit('toggleLoader', false, { root: true });
            }

            return properties;
        }
    },

    mutations: {
        setAll(state, properties) {
            state.all = properties;
        }
    }
};
