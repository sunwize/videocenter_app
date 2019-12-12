<template>
    <b-container class="pt-0 pt-md-4 px-0 px-lg-4 overflow-hidden">
        <div class="video-container">
            <iframe class="video" :src="'https://www.youtube.com/embed/' + video.id + '/?autoplay=1'"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
        </div>
        <div class="pl-2 pl-md-0">
            <h2 class="title">{{ video.title }}</h2>
            <p class="views">{{ formatViews(video.views) }} vues • {{ moment(video.date).locale('fr').format('D MMMM YYYY') }}</p>
        </div>
        <hr class="mb-0">
        <div class="pl-2 pl-md-0 channel">
            <b-row>
                <b-col cols="3" md="2" lg="1">
                    <b-img class="rounded-circle w-100" :src="video.author.preview"></b-img>
                </b-col>
                <b-col class="text-left my-auto pl-0" cols="5" md="6" lg="11">
                    <div class="channel-title">{{ video.channelTitle }}</div>
                    <div class="channel-subscribers">{{ formatSubscribers(video.author.subscribers) }}</div>
                </b-col>
                <b-col class="ml-auto mt-md-4" style="margin-top: 3%" cols="3" md="3" v-if="isMobileDevice()" @click="showDescription">
                    <icon style="font-size: 1.3em" :class="descriptionVisible ? 'extended' : ''" icon="caret-up"></icon>
                </b-col>
            </b-row>
        </div>
        <hr class="mt-0">
        <div class="pl-2 pl-md-0" style="padding-bottom: 80px">
            <b-collapse id="description" v-model="descriptionVisible" class="description">
                {{ video.description }}
            </b-collapse>
        </div>
    </b-container>
</template>

<script>
    import * as axios from 'axios'
    import moment from 'moment'
    import {spaceFormat, kFormat} from "@/helpers/Utils";

    export default {
        name: "VideoPage",
        data() {
            return {
                video: {},
                descriptionVisible: !this.$store.getters.isMobileDevice
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
                this.video = {};
                axios.get(`http://localhost:3000/videos/${this.$route.params.id}`)
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
                return spaceFormat(x);
            },
            formatSubscribers(number) {
                return kFormat(number);
            },
            isMobileDevice() {
                return this.$store.getters.isMobileDevice;
            },
            showDescription() {
                this.descriptionVisible = !this.descriptionVisible;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video-container {
        background-color: rgba(0, 0, 0, 0.2);
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

    .views {
        text-align: left;
        margin-bottom: 0;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12pt;
    }

    .channel {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        transition: 1s;

        @media screen and (max-width: 1000px) {
            &:active {
                background-color: rgba(0, 0, 0, 0.7);
            }
        }
    }

    .channel-title {
        color: white;
        font-size: 1em;
    }

    .channel-subscribers {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9em;
    }

    .description {
        text-align: left;
        white-space: pre-line;
        margin-top: 1em;
        color: rgba(255, 255, 255, 0.7);
    }

    .extended {
        transition: 0.3s;
        transform: rotate(180deg);
    }
</style>
