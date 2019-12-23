<template>
    <b-container class="pt-0 pt-md-4 px-0 px-lg-4 overflow-hidden">
        <video-player v-model="videoId"></video-player>
    </b-container>
</template>

<script>
    export default {
        name: "VideoPage",
        computed: {
            videoId() {
                return this.$route.params.id;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
