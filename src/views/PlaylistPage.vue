<template>
    <b-row v-if="playlist && currentVideo" class="w-100 m-0 pt-lg-4 px-lg-4 overflow-hidden">
        <b-col cols="12" lg="8" class="px-0 px-lg-4">
            <video-player :on-ended="nextVideo" v-model="currentVideo"></video-player>
        </b-col>
        <b-col cols="12" lg="4" class="pl-lg-0">
            <div class="playlist-videos">
                <div v-if="!isMobileDevice()" class="title py-1 mb-2">
                    {{ playlist.title }}
                </div>
                <div v-for="video in playlistVideos" :key="video.id" class="mb-3">
                    <video-preview :on-click="jumpVideo" :video="video" :sided="!isMobileDevice()" :animated="false"
                                   :class="currentVideo === video.id ? 'selected' : ''"></video-preview>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import Network from "../helpers/Network";

    export default {
        name: "PlaylistPage",
        data() {
            return {
                playlist: null,
                index: 0,
                playlistVideos: null
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

                Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/playlists/${playlist_id}`)
                .then(res => {
                    this.playlist = res.data;
                    if (this.playlist && this.playlist.videos)
                        this.playlist.videos = this.playlist.videos.reverse();

                    Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/playlists/videos/${playlist_id}`)
                    .then(res => {
                        this.playlistVideos = res.data;
                        if (this.playlistVideos && this.playlistVideos.length > 0)
                            this.playlistVideos = this.playlistVideos.reverse();
                    }).catch(err => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                    });
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            nextVideo() {
                if (this.index < this.playlist.videos.length-1) {
                    this.index++;
                    this.updateHistory();
                }
            },
            jumpVideo(video) {
                this.index = this.playlist.videos.indexOf(video.id);
                this.updateHistory();
            },
            isMobileDevice() {
                return this.$store.getters.isMobileDevice;
            },
            updateHistory() {
                if (!this.$store.getters.isAuthenticated)
                    return;

                Network.post(`${process.env.VUE_APP_API_USERS_SERVICE}/histories/update`, {
                    user_id: this.$store.getters.currentUser.id,
                    video_id: this.currentVideo
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playlist-videos {
        background-color: rgba(0, 0, 0, 0.2);

        .title {
            background-color: rgba(0, 0, 0, 0.2);
        }

        .selected {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
</style>
