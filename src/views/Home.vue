<template>
  <b-container>
    <div v-if="loading" class="m-auto pt-5">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <b-row class="py-md-5 py-3">
      <b-col v-for="video in videos.slice(0, max)" :key="video.id" cols="12" md="3">
        <video-preview class="mb-3" :id="video.id" :title="video.title" :channel="video.channelTitle" :views="video.views" :preview="video.preview"></video-preview>
      </b-col>
      <div v-if="max < 48 && videos.length > 0" @click="loadMore" class="plus mx-auto mb-4 mb-lg-0 mt-0 mt-lg-3 pb-4">
        PLUS
      </div>
    </b-row>
  </b-container>
</template>

<script>
  import * as axios from 'axios'

  export default {
    name: 'Home',
    data() {
      return {
        videos: [],
        max: 16,
        loading: false
      }
    },
    mounted() {
      this.loadVideos();
    },
    methods: {
      loadVideos() {
        this.loading = true;
        axios.get(`${process.env.VUE_APP_API_ADDRESS}/videos/trends/48`).then(res => {
          this.videos = res.data;
          this.loading = false;
        }).catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.loading = false;
        });
      },
      loadMore() {
        this.max += 8;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .plus {
    font-size: 11pt;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.4);

    &:hover {
      color: white;
      cursor: pointer;
    }
  }
</style>
