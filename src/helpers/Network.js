import * as axios from 'axios';
import store from "../store";

export default class Network {
    static setToken(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }

    static request(url, method, params, options) {
        return new Promise((resolve, reject) => {
            if (!params)
                params = {};

            if (store.getters.isAuthenticated)
                this.setToken(store.getters.currentUser.token);
            else
                delete axios.defaults.headers.common['Authorization'];

            if (method === 'POST') {
                axios.post(url, params, options).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            } else if (method === 'GET') {
                axios.get(url, params, options).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }

    static post(url, params, options) {
        return this.request(url, 'POST', params, options);
    }

    static get(url, params, options) {
        return this.request(url, 'GET', params, options);
    }
}