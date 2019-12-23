<template>
    <div v-if="video">
        <div class="video-container">
            <youtube @ready="playVideo" @ended="onEnded" v-if="host === 'youtube'" class="position-absolute"
                     style="width: 100%; height: 100%; top: 0; right: 0" ref="youtube" :player-vars="{autoplay: 1}"
                     :video-id="video.id"></youtube>
        </div>
        <div v-if="showDetails">
            <div class="pl-2 pl-md-0 position-relative">
                <h2 class="title">{{ video.title }}</h2>
                <p class="views">{{ formatViews(video.views) }} vues • {{ moment(video.date).locale('fr').format('D MMMM YYYY') }}</p>
                <div @click="openPlaylistsModal" class="add-icon"><icon icon="plus"></icon></div>
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
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {spaceFormat, kFormat} from '../helpers/Utils';
    import * as axios from "axios";

    export default {
        name: "VideoPlayer",
        props: {
            value: {
                type: String,
                required: true
            },
            host: {
                type: String,
                default: 'youtube'
            },
            showDetails: {
                type: Boolean,
                default: true
            },
            onEnded: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                video: null,
                descriptionVisible: !this.$store.getters.isMobileDevice
            }
        },
        watch: {
            value() {
                this.loadVideo();
            }
        },
        computed: {
            youtubePlayer() {
                return this.$refs.youtube.player;
            },
            videoId() {
                return this.value;
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
                axios.get(`${process.env.VUE_APP_API_ADDRESS}/videos/${this.videoId}`)
                    .then(res => {
                        this.video = res.data;
                    }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
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
            showDescription() {
                this.descriptionVisible = !this.descriptionVisible;
            },
            openPlaylistsModal() {
                this.$bvModal.show('playlists-modal');
                this.$store.commit('setVideoToAdd', this.video.id);
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
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .title {
        text-align: left;
        padding-top: 0.3em;
        font-size: 15pt;
    }

    .views {
        text-align: left;
        margin-bottom: 0;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12pt;
    }

    .add-icon {
        position: absolute;
        right: 10px;
        bottom: 0;
        cursor: pointer;

        &:hover {
            color: rgba(255, 255, 255, 0.5);
        }
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