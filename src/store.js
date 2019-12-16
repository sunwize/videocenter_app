import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'

Vue.use(Vuex);

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
        login({commit}, login) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_API_ADDRESS}/login`, {
                    email: login.email,
                    password: login.password
                }).then(res => {
                    const user = res.data;
                    commit('setUser', user);
                    resolve(res);
                }).catch(err => {
                    commit('setUser', null);
                    reject(err);
                });
            });
        },
        logout({commit}) {
            return new Promise(resolve => {
                commit('setUser', null);
                resolve();
            });
        }
    }
});
