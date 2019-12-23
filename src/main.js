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
import VueYoutube from 'vue-youtube'

import VideoPreview from "./components/VideoPreview"
import SignInForm from "./components/LoginForm"
import PlaylistsModal from "./components/PlaylistsModal";
import PlaylistPreview from "./components/PlaylistPreview";
import VideoPlayer from "./components/VideoPlayer";

library.add(fas);

Vue.use(BootstrapVue);
Vue.use(VueSwal);
Vue.use(VueYoutube);

Vue.component('icon', FontAwesomeIcon);
Vue.component('video-preview', VideoPreview);
Vue.component('login-form', SignInForm);
Vue.component('playlists-modal', PlaylistsModal);
Vue.component('playlist-preview', PlaylistPreview);
Vue.component('video-player', VideoPlayer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
