export default {
    namespaced: true,

    state: {
        step: 1,
        agreement: false,
        information: {},
        status: undefined
    },

    getters: {
        step(state) {
            return state.step;
        },

        agreement(state) {
            return state.agreement;
        },

        information(state) {
            return state.information;
        },

        status(state) {
            return state.status;
        }
    },

    actions: {
        async book({ commit }, data) {
            commit('toggleLoader', true, { root: true });

            const headers = new Headers({
                'Content-Type': 'application/json'
            });

            const newData = Object.assign({}, data, {
                startDate: new Date(data.startDate).toISOString().split('T')[0],
                endDate: new Date(data.endDate).toISOString().split('T')[0]
            });

            try {
                const response = await fetch('/reservation', {
                    method: 'POST',
                    headers,
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'same-origin',
                    body: JSON.stringify(newData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                commit('setStatus', 'confirmed');
            } catch (error) {
                console.error(error);
                commit('setStatus', 'fail');
            } finally {
                console.info('Finally');
                commit('toggleLoader', false, { root: true });
            }
        }
    },

    mutations: {
        setDefaultState(state) {
            state.step = 1;
            state.agreement = false;
            state.information = {
                unitId: 0,      // (Integer):  id of specific unit
                startDate: '',  // (String):  start date of reservation
                endDate: '',    // (String):  end date of reservation
                occupants: 0,   // (Integer):  number of adults of reservation
                givenName: '',  // (String):  first name
                familyName: '', // (String):  last name
                email: '',      // (String):  email
                phone: '',      // (String):  Optional unless required by PM in SL admin
                address: '',    // (String):  address
                city: '',       // (String):  city
                state: '',      // (String):  state
                country: '',    // (String):  country name (See getCountriesList)
                zip: '',        // (String):  zip code
                ccTypeId: 0,    // (Integer):  1-Visa, 2-MasterCard, 3-AmericanExpress, 4-Discover
                ccNumber: 0,    // (Integer):  card number
                ccExpMonth: 0,  // (Integer):  exp. month
                ccExpYear: 0,   // (Integer):  exp. year
                ccCsc: 0,       // (Integer):  security code
                ccAmount: ''    // (String):  amount with decimals
            };
            state.status = undefined;
        },

        setStep(state, step) {
            state.step = step;
        },

        setAgreement(state, agree) {
            state.agreement = agree;
        },

        setInformation(state, { property, value }) {
            Object.assign(state.information, { [property]: value });
        },

        setStatus(state, status) {
            state.status = status;
        }
    }
};
