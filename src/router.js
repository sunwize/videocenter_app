import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import home from './views/Home'
import videoPage from './views/VideoPage'
import search from './views/Search'
import register from './views/Register'
import account from './views/Account'
import playlists from './views/Playlists'
import playlistPage from './views/PlaylistPage'
import histories from './views/Histories'

Vue.use(Router);

function ifAuthenticated(to, from, next) {
    if (store.getters.isAuthenticated)
        next();
    else
        next('/');
}

function ifNotAuthenticated(to, from, next) {
    if (!store.getters.isAuthenticated)
        next();
    else
        next('/');
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/video/:id?',
            name: 'video',
            component: videoPage
        },
        {
            path: '/search/:keywords?',
            name: 'search',
            component: search
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/account',
            name: 'account',
            component: account,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/playlists',
            name: 'playlists',
            component: playlists,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/playlists/watch/:id?',
            name: 'playlist-page',
            component: playlistPage,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/histories',
            name: 'histories',
            component: histories,
            beforeEnter: ifAuthenticated
        }
    ]
});
