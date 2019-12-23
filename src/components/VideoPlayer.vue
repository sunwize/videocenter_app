<template>
    <youtube v-if="host === 'youtube'" @ready="playVideo"
             style="width: 100%; height: 100%;" ref="youtube" :player-vars="{autoplay: 1}"
             :video-id="videoId"></youtube>
</template>

<script>
    export default {
        name: "VideoPlayer",
        props: {
            videoId: {
                type: String,
                required: true
            },
            host: {
                type: String,
                required: true
            }
        },
        data() {
            return {

            }
        },
        computed: {
            youtubePlayer() {
                return this.$refs.youtube.player;
            }
        },
        methods: {
            playVideo() {
                if (this.host === 'youtube') {
                    this.youtubePlayer.playVideo();
                }
            },
            pauseVideo() {
                if (this.host === 'youtube') {
                    this.youtubePlayer.pauseVideo();
                }
            },
            isMobileDevice() {
                return this.$store.getters.isMobileDevice;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>