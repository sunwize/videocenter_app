<template>
    <div>
        <b-navbar toggleable="lg" type="dark" style="background-color: rgba(0,0,0,0.20)">
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="mr-auto">
                    <b-img height="30" :src="require('../assets/img/logo.png')" class="pr-3 d-block m-auto"></b-img>
                    <b-navbar-brand href="#">Video Center</b-navbar-brand>
                    <b-nav-item href="#">Link</b-nav-item>
                </b-navbar-nav>

                <!-- Center aligned nav items -->
                <b-navbar-nav class="mx-auto" style="width: 35%">
                    <b-nav-form class="search">
                        <b-form-input class="search-bar" size="sm" placeholder="Rechercher"></b-form-input>
                        <b-button size="sm" class="search-button my-2 my-sm-0" type="submit">
                            <icon icon="search"></icon>
                        </b-button>
                    </b-nav-form>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Menu"
    }
</script>

<style scoped lang="scss">
    .form-inline {
        width: 100%;
    }

    .search {
        .search-bar {
            width: 90%;
            color: white;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            background-color: rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .search-button {
            width: 10%;
            color: rgba(255, 255, 255, 0.51);
            background-color: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0);
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }
    }
</style>
