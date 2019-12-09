<template>
  <b-container>
    <b-row class="py-md-5 py-3">
      <b-col v-for="video in videos" :key="video.id" cols="12" md="3">
        <video-player class="mb-3" :id="video.id" :title="video.title" :channel="video.channelTitle" :views="video.views"></video-player>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import * as axios from 'axios'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        videos: []
      }
    },
    mounted() {
      this.loadVideos();
    },
    methods: {
      loadVideos() {
        axios.get(`http://localhost:3000/trends`).then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          this.videos = res.data;
        }).catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
