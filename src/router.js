import Vue from 'vue'
import Router from 'vue-router'

import home from './views/Home'
import videoPage from './views/VideoPage'
import search from './views/Search'

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
        },
        {
            path: `/search/:keywords?`,
            name: 'search',
            component: search
        }
    ]
});
