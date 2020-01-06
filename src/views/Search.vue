<template>
    <b-container class="pt-3 pb-5 pb-lg-0">
        <div v-if="loading" class="m-auto pt-5">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-for="video in videos" :key="video.id" class="mx-auto mb-2" :class="!isMobileDevice() ? 'w-75' : ''">
            <video-preview :sided="!isMobileDevice()" :video="video" :on-click-plus-button="openPlaylistsModal"></video-preview>
        </div>
    </b-container>
</template>

<script>
    import Network from "../helpers/Network";

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
                Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/videos/search/${this.$route.params.keywords}`)
                .then(res => {
                    this.videos = res.data;
                    this.loading = false;
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                    this.loading = false;
                });

            },
            isMobileDevice() {
                return this.$store.getters.isMobileDevice;
            },
            openPlaylistsModal(video) {
                this.$bvModal.show('playlists-modal');
                this.$store.commit('setVideoToAdd', video.id);
            }
        }
    }
</script>

<style scoped>

</style>
