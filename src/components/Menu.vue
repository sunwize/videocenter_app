<template>
    <div>
        <b-navbar toggleable="lg" type="dark" style="background-color: rgba(0,0,0,0.20)">
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mr-auto">
                    <b-img @click="reach('/')" height="30" :src="require('../assets/img/logo.png')" class="menu-logo"></b-img>
                    <b-navbar-brand to="/">Chika TV</b-navbar-brand>
                </b-navbar-nav>

                <!-- Center aligned nav items -->
                <b-navbar-nav class="mx-auto" style="width: 50%">
                    <b-nav-form @submit="research" class="search">
                        <b-form-input v-model="search" class="search-bar" size="sm" placeholder="Rechercher" maxlength="250" trim></b-form-input>
                        <b-button size="sm" class="search-button my-2 my-sm-0" type="submit">
                            <icon icon="search"></icon>
                        </b-button>
                    </b-nav-form>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="isAuthenticated" right>
                        <template v-slot:button-content>
                            <icon style="font-size: 15pt" icon="user"></icon>
                        </template>
                        <b-dropdown-item to="/account">
                            <span class="dropdown-icon"><icon icon="user-cog"></icon></span>
                            <span class="pl-4">Profil</span>
                        </b-dropdown-item>
                        <b-dropdown-item to="/playlists">
                            <span class="dropdown-icon"><icon icon="list"></icon></span>
                            <span class="pl-4">Playlists</span>
                        </b-dropdown-item>
                        <b-dropdown-item to="/histories">
                            <span class="dropdown-icon"><icon icon="history"></icon></span>
                            <span class="pl-4">Historique</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="$store.dispatch('logout')">
                            <span class="dropdown-icon" style="font-size: 14pt;"><icon style="position: absolute; top: 2px" icon="sign-out-alt"></icon></span>
                            <span class="pl-4">Déconnexion</span>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                    <div v-b-modal.login-modal class="signin" v-else>
                        <icon icon="user" class="mr-2"></icon>
                        <span class="link" to="/signin">Se connecter</span>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-modal ref="signin" id="login-modal" title="Se connecter" hide-footer>
            <login-form></login-form>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                search: ''
            }
        },
        computed: {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            }
        },
        methods: {
            reach(path) {
                this.$router.push(path).catch(() => {});
            },
            research(event) {
                if(this.search != '')
                    this.$router.push('/search/' + this.search);
                else
                    event.preventDefault();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-logo {
        display: block;
        margin: auto;
        padding-right: 1rem;

        &:hover {
            cursor: pointer;
        }
    }

    .form-inline {
        width: 100%;
    }

    .dropdown-icon {
        position: absolute;
        left: 12px;
    }

    .search {
        .search-bar {
            width: 92%;
            color: white;
            background-color: rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 0;
            font-size: 12pt;
        }

        .search-button {
            width: 8%;
            color: rgba(255, 255, 255, 0.51);
            background-color: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0);
            border-radius: 0;
            font-size: 12pt;
        }
    }

    .signin {
        border: 1px solid rgba(255, 255, 255, 0.9);
        padding: 0.5em;
        border-radius: 5px;
        font-size: 11pt;
        cursor: pointer;

        span, svg {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
        }

        &:active {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
</style>
