<template>
  <b-container>
    <b-row class="py-md-5 py-3">
      <b-col v-for="video in videos" :key="video.id" cols="12" md="3">
        <video-player class="mb-3" :id="video.id" :title="video.snippet.title" :channel="video.snippet.channelTitle" :views="video.statistics.viewCount"></video-player>
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
        axios.get(`https://www.googleapis.com/youtube/v3/videos/?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=FR&key=${process.env.VUE_APP_YT_API_KEY}`).then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          this.videos = res.data.items;
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
