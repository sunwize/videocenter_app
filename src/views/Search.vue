<template>
    <b-container class="pt-3">
        <div v-if="loading" class="m-auto pt-5">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-for="video in videos" :key="video.id" class="mx-auto mb-2" :class="!isMobileDevice() ? 'w-75' : ''">
            <video-preview :sided="!isMobileDevice()" :video="video"></video-preview>
        </div>
    </b-container>
</template>

<script>
    import * as axios from 'axios';

    export default {
        name: "Search",
        data() {
            return {
                videos: [],
                loading: false
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
                this.loading = true;
                axios.get(`${process.env.VUE_APP_API_ADDRESS}/videos/search/${this.$route.params.keywords}`)
                .then(res => {
                    this.videos = res.data;
                    // eslint-disable-next-line no-console
                    console.log(res);
                    this.loading = false;
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                    this.loading = false;
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
