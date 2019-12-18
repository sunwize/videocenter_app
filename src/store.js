import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        isMobileDevice() {
            return window.innerWidth < 1000;
        },
        isAuthenticated(state) {
            return !!state.user;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        logout({commit}) {
            return new Promise(resolve => {
                commit('setUser', null);
                resolve();
            });
        },
        login({commit}, login) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_API_ADDRESS}/users/login`, {
                    email: login.email,
                    password: login.password
                }).then(res => {
                    const user = res.data;
                    commit('setUser', {
                        id: user.id,
                        email: user.email
                    });
                    resolve(res);
                }).catch(err => {
                    commit('setUser', null);
                    reject(err);
                });
            });
        }
    },
    plugins: [vuexLocal.plugin]
});
