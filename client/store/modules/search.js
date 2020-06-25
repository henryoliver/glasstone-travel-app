export default {
    namespaced: true,

    state: {
        parameters: {
            startDate: null,
            endDate: null,
            occupants: 0,
            bedrooms: 0,
            bathrooms: 0
        }
    },

    getters: {
        parameters(state) {
            return state.parameters;
        }
    },

    mutations: {
        set(state, payload) {
            state.parameters[payload.property] = payload.value;
        },

        reset(state) {
            state.parameters.startDate = null;
            state.parameters.endDate = null;
            state.parameters.occupants = 0;
            state.parameters.bedrooms = 0;
            state.parameters.bathrooms = 0;
        },

        increment(state, payload) {
            state.parameters[payload.property] += payload.amount;
        },

        decrement(state, payload) {
            state.parameters[payload.property] -= payload.amount;
        }
    }
};
