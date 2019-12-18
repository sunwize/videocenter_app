import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/global.scss'

import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSwal from 'vue-swal'

import VideoPreview from "@/components/VideoPreview";
import SignInForm from "@/components/SignInForm";

library.add(fas);

Vue.use(BootstrapVue);
Vue.use(VueSwal);

Vue.component('icon', FontAwesomeIcon);
Vue.component('video-preview', VideoPreview);
Vue.component('sign-in-form', SignInForm);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
