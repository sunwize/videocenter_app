import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        isMobileDevice() {
            return window.innerWidth < 1000;
        }
    }
});
