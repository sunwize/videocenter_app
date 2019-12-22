<template>
    <div>
        <div class="sided-preview">
        <span class="left-side">
            <b-img class="w-100" :src="playlistPreview()"></b-img>
            <div class="overlay">
                <div class="videos-amount">{{ playlist.videos.length }}</div>
                <div><icon icon="video"></icon></div>
            </div>
        </span>
            <span class="right-side">
            <div class="title pl-3 py-2">{{ playlist.title }}</div>
            <div class="date pl-3">Créée le {{ moment(playlist.date).locale('fr').format('D MMMM YYYY') }}</div>
            <div @click="visible = !visible" class="toggle">
                <icon class="arrow" :class="visible ? '' : 'rotated'" icon="caret-down"></icon>
            </div>
        </span>
        </div>
        <div>
            <b-collapse v-model="visible">
                <div class="bg-dark px-4 pt-3">
                    <div v-for="video in playlist.videos.slice(0, maxResults)" :key="video.id" class="video-preview">
                        <video-preview :video="video" :sided="true"></video-preview>
                        <div class="delete-icon">
                            <icon icon="times"></icon>
                        </div>
                    </div>
                    <div @click="showMore" v-if="maxResults < playlist.videos.length" class="show-more">PLUS</div>
                </div>
            </b-collapse>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "PlaylistPreview",
        props: {
            playlist: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                visible: false,
                maxResults: 3
            }
        },
        methods: {
            playlistPreview() {
                if (this.playlist.videos.length === 0)
                    return null;
                else
                    return this.playlist.videos[0].preview;
            },
            moment() {
                return moment();
            },
            showMore() {
                this.maxResults += Math.min(this.playlist.videos.length - this.maxResults, 3);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sided-preview {
        display: flex;
        background-color: rgba(0, 0, 0, 0.3);

        .left-side {
            width: 40%;
            position: relative;

            .overlay {
                position: absolute;
                top: 0;
                right: 0;
                width: 40%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);

                .videos-amount {
                    padding-top: 40%;
                }
            }
        }

        .right-side {
            width: 60%;
            text-align: left;
            position: relative;

            .title {
                font-size: 14pt;
            }

            .date {
                font-size: 10pt;
                letter-spacing: 0.2px;
            }

            .toggle {
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                width: 100%;
                height: 12%;
                cursor: pointer;

                svg {
                    display: flex;
                    margin: auto;
                    font-size: 12pt;
                }

                .arrow {
                    transition: 0.3s;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.4);
                }
            }
        }

        .rotated {
            transform: rotate(180deg);
        }
    }

    .show-more {
        padding-bottom: 0.5em;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.8);

        &:hover {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    .video-preview {
        position: relative;
        margin-bottom: 0.5em;

        .delete-icon {
            position: absolute;
            bottom: 30%;
            right: 0;
            font-size: 15pt;
            color: #ff2f34;
            cursor: pointer;
            visibility: hidden;
        }

        &:hover {
            .delete-icon {
                visibility: visible;
            }
        }
    }

</style>