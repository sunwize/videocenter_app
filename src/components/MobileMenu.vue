<template>
    <div>
        <b-navbar v-if="!searchMode" class="top-navbar" toggleable="lg" type="dark">
            <b-img height="30" :src="require('../assets/img/logo.png')" class="pr-2"></b-img>
            <b-navbar-brand href="#">Video Center</b-navbar-brand>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input v-if="false" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="md" variant="link" @click="openSearchMode">
                        <icon icon="search"></icon>
                    </b-button>
                    <b-button to="/account" size="md" variant="link">
                        <icon icon="user"></icon>
                    </b-button>
                </b-nav-form>
            </b-navbar-nav>
        </b-navbar>

        <b-navbar v-if="searchMode" class="search-navbar" toggleable="lg" type="dark">
            <b-navbar-nav class="icon">
                <b-button size="md" variant="link" @click="exitSearchMode">
                    <icon icon="arrow-left"></icon>
                </b-button>
            </b-navbar-nav>
            <b-navbar-nav class="search-bar">
                <b-form @submit="research">
                    <b-form-input v-model="search" ref="search" autocomplete="off" placeholder="Rechercher sur Video Center"></b-form-input>
                </b-form>
            </b-navbar-nav>
            <div v-if="search.length > 0" @click="search = ''" class="icon-delete"><icon icon="times"></icon></div>
        </b-navbar>
        <b-list-group v-if="searchMode" class="history">
            <b-list-group-item @click="search = link" v-for="link in filteredHistory" :key="link">
                <icon class="icon-history" icon="history"></icon>
                <span class="text">{{ link }}</span>
                <span class="icon-box"><icon class="icon-set" icon="arrow-left"></icon></span>
            </b-list-group-item>
        </b-list-group>

        <div class="bottom-navbar">
            <router-link class="link" to="/#">
                <icon icon="home"></icon>
                <div class="text">Accueil</div>
            </router-link>
            <router-link class="link" to="/playlists">
                <icon icon="list"></icon>
                <div class="text">Playlists</div>
            </router-link>
            <router-link class="link" to="/contacts">
                <icon icon="users"></icon>
                <div class="text">Contacts</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobileMenu",
        data() {
            return {
                search: "",
                searchMode: false,
                history: [
                    "Le roi des rats",
                    "Bim bam boum ta mère",
                    "Démarrer un élevage de chèvres en Alsace"
                ]
            }
        },
        computed: {
            filteredHistory() {
                return this.history.filter(l => l.toLowerCase().indexOf(this.search.toLowerCase()) != -1);
            }
        },
        methods: {
            openSearchMode() {
                this.searchMode = true;
                setTimeout(() => {
                    this.$refs.search.focus();
                }, 50);
            },
            exitSearchMode() {
                this.searchMode = false;
                this.search = "";
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
    .top-navbar {
        height: 47px;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 0em 0.5em;

        .navbar-brand {
            font-size: 12pt;
        }

        svg {
            color: rgba(255, 255, 255, 0.7);
        }
    }

    .search-navbar {
        height: 47px;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 0;

        .icon {
            width: 10%;
        }

        .btn {
            color: white;
            font-size: 15pt;
        }

        .search-bar {
            color: white;
            width: 100%;
            max-width: 90%;
        }

        .form-control {
            color: white;
            font-size: 12pt;
            padding-right: 32px;
            border-radius: 0;
            background-color: transparent;
            border: none;
        }

        .icon-delete {
            position: absolute;
            right: 8px;
            padding: 0px 5px;
        }
    }

    .history {
        position: absolute;
        width: 100%;
        z-index: 1000;

        .list-group-item {
            display: flex;
            align-items: center;
            border-radius: 0;
            background-color: #1f2b38;
            border: none;
            font-size: 12pt;
            padding: 0.4em;
            text-align: left;

            .text {
                width: 95%;
            }

            .icon-history {
                width: 5%;
                color: rgba(255, 255, 255, 0.7);
                margin-left: 0.4em;
                margin-right: 1.5em;
            }

            .icon-box {
                padding: 0px 5px;

                .icon-set {
                    color: rgba(255, 255, 255, 0.7);
                    transform: rotate(45deg);
                }
            }

            span {
                padding-right: 10px;
            }
        }
    }

    .bottom-navbar {
        background-color: #1e2b37;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        z-index: 1000;

        .link {
            padding: 1.5% 8% 1% 8%;
            color: rgba(255, 255, 255, 0.45);
            text-decoration: none;
        }

        .router-link-active {
            color: white;
        }

        svg {
            font-size: 18pt;
        }

        .text {
            font-size: 8pt;
            line-height: 12px;
        }
    }
</style>
