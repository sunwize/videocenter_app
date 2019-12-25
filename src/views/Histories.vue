<template>
    <b-container v-if="videos" class="pt-4">
        <h5 class="text-left mb-3"><icon class="mr-2" icon="history"></icon>Historique</h5>
        <div v-for="video in videosByDate" :key="video.id" class="mb-3">
            <div class="text-left">{{ video.timestamp | moment('from', 'now') }}</div>
            <video-preview :video="video" :sided="true"></video-preview>
        </div>
    </b-container>
</template>

<script>
    import * as axios from 'axios'

    export default {
        name: "Histories",
        data() {
            return {
                videos: null,
                histories: null
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
                axios.get(`${process.env.VUE_APP_API_ADDRESS}/histories/all/${this.$store.getters.currentUser.id}`)
                .then(res => {
                    this.histories = res.data;

                    if (this.histories.length === 0)
                        return;

                    let ids = '';
                    this.histories.forEach(h => ids += h.video_id + ',');

                    axios.get(`${process.env.VUE_APP_API_ADDRESS}/videos/details/${ids}`)
                    .then(res => {
                        this.videos = res.data;

                        for (let i = 0; i < this.videos.length; i++)
                            this.videos[i].timestamp = this.histories[i].date;
                    }).catch(err => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                    });
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
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