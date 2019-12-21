<template>
  <div id="app" class="dark-theme">
    <Menu v-if="!isMobileDevice()"></Menu>
    <MobileMenu v-else></MobileMenu>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <playlists-modal v-if="isAuthenticated()"></playlists-modal>
  </div>
</template>

<script>
  import Menu from '@/components/Menu'
  import MobileMenu from "@/components/MobileMenu";

  export default {
    name: 'app',
    components: {
      Menu,
      MobileMenu
    },
    mounted() {
      document.title = "Video Center"
    },
    methods: {
      isMobileDevice() {
        return this.$store.getters.isMobileDevice;
      },
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: white;
    overflow: auto;
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
