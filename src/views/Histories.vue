<template>
    <b-container class="mt-3 mt-lg-4 pb-5 pb-lg-0">
        <h5 class="text-left mb-3"><icon class="mr-2" icon="history"></icon>Historique</h5>
        <div v-if="loading" class="m-auto pt-5">
            <b-spinner label="Loading..."></b-spinner>
        </div>
        <div v-if="videos">
            <div v-for="video in videosByDate" :key="video.id" class="mb-3 position-relative">
                <div class="text-left position-absolute px-2" style="background-color: rgba(0,0,0,0.8); left: 0" :style="isMobileDevice() ? 'top: 0' : 'bottom: 0'">
                    <icon icon="clock" class="mr-2"></icon>{{ video.timestamp | moment('from', 'now') }}
                </div>
                <video-preview :video="video" :sided="!isMobileDevice()" :animated="false"></video-preview>
            </div>
        </div>
        <div v-if="!videos && !loading" class="pt-3">
            Vous n'avez visionné aucune vidéo
        </div>
    </b-container>
</template>

<script>
    import Network from "../helpers/Network";

    export default {
        name: "Histories",
        data() {
            return {
                videos: null,
                histories: null,
                loading: false
            }
        },
        computed: {
            videosByDate() {
                return this.videos.slice().sort((v1, v2) => {
                    return (new Date(v2.timestamp)) - (new Date(v1.timestamp));
                });
            }
        },
        mounted() {
            this.loadHistory();
        },
        activated() {
            this.loadHistory();
        },
        methods: {
            loadHistory() {
                this.loading = true;
                Network.get(`${process.env.VUE_APP_API_USERS_SERVICE}/histories/all/${this.$store.getters.currentUser.id}`)
                .then(res => {
                    this.histories = res.data;

                    if (this.histories.length === 0)
                        return;

                    let ids = '';
                    for (let history of this.histories) {
                        if (history.video_id)
                            ids += history.video_id.replace('_azure', '') + ',';
                    }
                    // eslint-disable-next-line no-console
                    console.log(ids);

                    Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/videos/details/${ids}`)
                    .then(res => {
                        this.videos = res.data;

                        for (let i = 0; i < this.videos.length; i++)
                            this.videos[i].timestamp = this.histories[i].date;

                        this.loading = false;
                    }).catch(err => {
                        this.loading = false;
                        // eslint-disable-next-line no-console
                        console.log(err);
                    });
                }).catch(err => {
                    this.loading = false;
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
    .list-group {
        text-align: left;

        .list-group-item {
            background-color: transparent;
            border: none;
        }
    }
</style>
