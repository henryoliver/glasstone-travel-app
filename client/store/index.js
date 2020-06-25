import Vue from 'vue';
import Vuex from 'vuex';

// Plugins
import createPersistedState from 'vuex-persistedstate';

// Config
import config from '../config';

// Modules
import email from './modules/email';
import search from './modules/search';
import property from './modules/property';
import properties from './modules/properties';
import reservation from './modules/reservation';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: config.debug,

    state: {
        loading: false
    },

    getters: {
        loading(state) {
            return state.loading;
        }
    },

    mutations: {
        toggleLoader(state, loading) {
            state.loading = loading;
        }
    },

    modules: {
        email,
        search,
        property,
        properties,
        reservation
    },

    plugins: [createPersistedState({ storage: window.sessionStorage })]
});
