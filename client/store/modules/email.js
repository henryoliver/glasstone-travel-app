export default {
    namespaced: true,

    state: {
        contact: {
            name: '',
            phone: '',
            email: '',
            message: ''
        },
        status: null
    },

    getters: {
        contact(state) {
            return state.contact;
        },

        status(state) {
            return state.status;
        }
    },

    actions: {
        async send({ commit }, data) {
            commit('toggleLoader', true, { root: true });

            const headers = new Headers({
                'Content-Type': 'application/json'
            });

            try {
                const response = await fetch('/email', {
                    method: 'POST',
                    headers,
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'same-origin',
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                commit('setStatus', 'success');
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
        setContact(state, { property, value }) {
            Object.assign(state.contact, { [property]: value });
        },

        setStatus(state, status) {
            state.status = status;
        }
    }
};
