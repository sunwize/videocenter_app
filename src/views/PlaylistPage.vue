<template>
    <b-container v-if="playlist" class="pt-0 pt-md-4 px-0 px-lg-4 overflow-hidden">
        <video-player :on-ended="nextVideo" v-model="currentVideo"></video-player>
    </b-container>
</template>

<script>
    import * as axios from 'axios'

    export default {
        name: "PlaylistPage",
        data() {
            return {
                playlist: null,
                index: 0
            }
        },
        computed: {
            currentVideo() {
                return this.playlist.videos[this.index];
            }
        },
        mounted() {
            this.loadPlaylist();
        },
        activated() {
            this.loadPlaylist();
        },
        methods: {
            loadPlaylist() {
                const playlist_id = this.$route.params.id;

                axios.get(`${process.env.VUE_APP_API_ADDRESS}/playlists/${playlist_id}`)
                .then(res => {
                    this.playlist = res.data;
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            nextVideo() {
                if (this.index < this.playlist.videos.length-1)
                    this.index++;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>