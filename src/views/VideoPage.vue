<template>
    <b-container class="pt-3 pt-md-4">
        <div class="video-container">
            <iframe class="video" :src="'https://www.youtube.com/embed/' + video.id + '/?autoplay=1'"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
        </div>
        <h2 class="title">{{ video.title }}</h2>
        <p class="channel">{{ video.channelTitle }} - {{ moment(video.date).locale('fr').format('D MMMM YYYY') }}</p>
        <p class="views">{{ formatViews(video.views) }} vues</p>
    </b-container>
</template>

<script>
    import * as axios from 'axios'
    import moment from 'moment'

    export default {
        name: "VideoPage",
        data() {
            return {
                video: {}
            }
        },
        mounted() {
            this.loadVideo();
        },
        activated() {
            this.loadVideo();
        },
        methods: {
            loadVideo() {
                axios.get(`http://localhost:3000/video/${this.$route.params.id}`)
                .then(res => {
                    this.video = res.data;
                    // eslint-disable-next-line no-console
                    console.log(this.video);
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            moment() {
                return moment();
            },
            formatViews(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video-container {
        overflow: hidden;
        padding-top: 56.25%;
        position: relative;
    }

    .video {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .title {
        text-align: left;
        padding-top: 0.2em;
        font-size: 20pt;
    }

    .channel, .views {
        text-align: left;
        margin-bottom: 0;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12pt;
    }
</style>