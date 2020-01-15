<template>
    <div v-if="video">
        <div class="video-container">
            <youtube @ready="playVideo" @ended="onEnded" v-if="video.host === 'youtube'" class="position-absolute"
                     style="width: 100%; height: 100%; top: 0; right: 0" ref="youtube" :player-vars="{autoplay: 1}"
                     :video-id="video.id"></youtube>
            <video v-else @canplay="playVideo" ref="azure" class="position-absolute w-100" style="top: 0; left: 0" controls>
                <source :src="`https://videocenterapp.blob.core.windows.net/videos/${video.id}_azure.mp4`" type="video/mp4">
                Votre navigateur ne gère pas l'élément <code>video</code>.
            </video>
        </div>
        <div v-if="showDetails">
            <div class="pl-2 pl-md-0 position-relative">
                <h2 class="title">{{ video.title }}</h2>
                <p class="views">{{ formatViews(video.views) }} vues • {{ video.date | moment('D MMMM YYYY') }}</p>
                <div @click="openPlaylistsModal" class="add-icon"><icon icon="plus"></icon></div>
            </div>
            <hr class="mb-0">
            <div class="pl-2 pl-md-0 channel">
                <b-row>
                    <b-col v-if="video.author" cols="3" md="2" lg="1">
                        <b-img class="rounded-circle w-100" :src="video.author.preview"></b-img>
                    </b-col>
                    <b-col class="text-left my-auto" :class="video.author ? 'pl-0' : 'pl-3'" cols="5" md="6" lg="11">
                        <div class="channel-title">{{ video.channelTitle }}</div>
                        <div v-if="video.author" class="channel-subscribers">{{ formatSubscribers(video.author.subscribers) }} abonnés</div>
                    </b-col>
                    <b-col class="ml-auto mt-md-4" style="margin-top: 3%" cols="3" md="3" v-if="isMobileDevice()" @click="showDescription">
                        <icon style="font-size: 1.3em" :class="descriptionVisible ? 'extended' : ''" icon="caret-up"></icon>
                    </b-col>
                </b-row>
            </div>
            <hr class="mt-0">
            <div class="pl-2 pl-md-0" :class="descriptionVisible ? 'pb-3' : ''">
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
    import Network from '../helpers/Network';

    export default {
        name: "VideoPlayer",
        props: {
            value: {
                type: String,
                required: true
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
            azurePlayer() {
                return this.$refs.azure;
            },
            videoId() {
                return this.value;
            }
        },
        mounted() {
            this.loadVideo();
            this.updateHistory();
        },
        activated() {
            this.loadVideo();
            this.updateHistory();
        },
        methods: {
            updateHistory() {
                if (!this.$store.getters.isAuthenticated)
                    return;

                Network.post(`${process.env.VUE_APP_API_USERS_SERVICE}/histories/update`, {
                    user_id: this.$store.getters.currentUser.id,
                    video_id: this.videoId.replace('_azure', '')
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            loadVideo() {
                Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/videos/get/${this.videoId}`)
                    .then(res => {
                        this.video = res.data;
                    }).catch(err => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                    });
            },
            playVideo() {
                if (this.video.host === 'youtube') {
                    this.youtubePlayer.playVideo();
                } else if (this.video.host === 'azure') {
                    this.azurePlayer.play();
                }
            },
            pauseVideo() {
                if (this.video.host === 'youtube') {
                    this.youtubePlayer.pauseVideo();
                } else if (this.video.host === 'azure') {
                    this.azurePlayer.pause();
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
