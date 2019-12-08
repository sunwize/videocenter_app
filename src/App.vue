<template>
  <div id="app" class="dark-theme">
    <Menu v-if="!isMobileDevice()"></Menu>
    <MobileMenu v-else></MobileMenu>
    <keep-alive>
      <!-- Padding bottom for fixed bottom menu for small devices -->
      <router-view class="pb-4 pb-md-0"></router-view>
    </keep-alive>
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
