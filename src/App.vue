<template>
  <div id="app" class="dark-theme">
    <Menu v-if="!isMobileDevice()"></Menu>
    <MobileMenu v-else></MobileMenu>
    <router-view></router-view>
  </div>
</template>

<script>
  import Menu from '@/components/Menu'
  import MobileMenu from "@/components/MobileMenu";
  import {isMobileDevice} from "@/helpers/utils";

  export default {
    name: 'app',
    components: {
      Menu,
      MobileMenu
    },
    methods: {
      isMobileDevice() {
        return isMobileDevice();
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: white;
    overflow: hidden;
    height: 100%;
  }

  html, body {
    height: 100%;
  }

  .dark-theme {
    background-color: #2c3e50;
    color: white;
  }
</style>
