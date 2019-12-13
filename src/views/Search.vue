<template>
    <b-container class="pt-3">
        <div v-for="video in videos" :key="video.id" class="mx-auto mb-2" :class="!isMobileDevice() ? 'w-75' : ''">
            <video-preview :sided="!isMobileDevice()" :id="video.id" :title="video.title" :channel="video.channelTitle" :views="video.views" :preview="video.preview"></video-preview>
        </div>
    </b-container>
</template>

<script>
    import * as axios from 'axios';

    export default {
        name: "Search",
        data() {
            return {
                videos: []
            }
        },
        mounted() {
            this.searchVideos();
        },
        activated() {
            this.searchVideos();
        },
        methods: {
            searchVideos() {
                axios.get(`http://localhost:3000/videos/search/${this.$route.params.keywords}`)
                .then(res => {
                    this.videos = res.data;
                    // eslint-disable-next-line no-console
                    console.log(res);
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            isMobileDevice() {
                return this.$store.getters.isMobileDevice;
            }
        }
    }
</script>

<style scoped>

</style>
