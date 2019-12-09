import Vue from 'vue'
import Router from 'vue-router'

import home from './views/Home'
import videoPage from './views/VideoPage'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: `/video/:id?`,
            name: 'video',
            component: videoPage
        }
    ]
});
