<template>
    <b-row class="w-100 m-0 pt-lg-4 px-lg-4 overflow-hidden">
        <b-col cols="12" lg="8" class="px-0 px-lg-4" :class="relatedVideos.length === 0 ? 'mx-auto' : ''">
            <video-player v-model="videoId"></video-player>
        </b-col>
        <b-col v-if="relatedVideos.length > 0" cols="12" lg="4" class="pl-lg-0">
            <div v-for="video in relatedVideos" :key="video.id" class="mb-2">
                <video-preview :video="video" :sided="!isMobileDevice()" :animated="false"></video-preview>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import Network from "../helpers/Network";

    export default {
        name: "VideoPage",
        data() {
            return {
                relatedVideos: []
            }
        },
        watch: {
            $route: {
                deep: true,
                handler() {
                    this.loadRelatedVideos();
                }
            }
        },
        computed: {
            videoId() {
                return this.$route.params.id;
            }
        },
        mounted() {
            this.loadRelatedVideos();
        },
        activated() {
            this.loadRelatedVideos();
        },
        methods: {
            loadRelatedVideos() {
                Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/videos/related-videos/${this.videoId}`)
                .then(res => {
                    this.relatedVideos = res.data;
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

<style lang="scss" scoped>

</style>
