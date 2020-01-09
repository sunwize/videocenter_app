<template>
    <div class="playlist">
        <div class="preview">
            <b-img :src="playlistPreview()" class="w-100"></b-img>
            <div class="overlay">
                <div style="padding-top: 40%">
                    <div>{{ playlist.videos.length }}</div>
                    <div><icon icon="video"></icon></div>
                </div>
            </div>
            <div v-if="hasVideos" @click="$router.push('/playlists/watch/' + playlist.id)" class="watch-all">
                <div style="padding-top: 25%">
                    <icon class="mr-2" icon="play"></icon>Tout regarder
                </div>
            </div>
        </div>
        <div class="details mt-1">
            <div class="title">{{ playlist.title }}</div>
            <div class="date">Créée le {{ moment(playlist.date).locale('fr').format('D MMMM YYYY') }}</div>
            <div v-if="onEdit !== null" @click.stop="onEdit(playlist)" class="edit-button">
                <icon icon="ellipsis-h"></icon>
            </div>
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
            },
            onEdit: Function
        },
        computed: {
            hasVideos() {
                return this.playlist.videos && this.playlist.videos.length > 0;
            }
        },
        methods: {
            playlistPreview() {
                let length = this.playlist.videos.length;
                if (length === 0)
                    return 'https://cdn57.androidauthority.net/wp-content/uploads/2015/09/youtube-featured.png';
                else
                    return this.playlist.videos[length-1].preview;
            },
            moment() {
                return moment();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playlist {
        .preview {
            position: relative;
            cursor: pointer;

            .overlay {
                position: absolute;
                top: 0;
                right: 0;
                width: 40%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
            }

            .watch-all {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                visibility: hidden;
            }

            &:hover {
                .watch-all {
                    visibility: visible;
                }
            }
        }

        .details {
            text-align: left;
            padding-left: 0.5em;
            position: relative;

            .title {
                font-size: 15pt;
            }

            .date {
                font-size: 10pt;
                color: rgba(255, 255, 255, 0.7);
            }

            .edit-button {
                position: absolute;
                bottom: -5px;
                right: 0;
                font-size: 15pt;
                visibility: hidden;
                color: rgba(255, 255, 255, 0.5);
                cursor: pointer;

                @media (max-width: 1000px) {
                    visibility: visible;
                    right: 12px;
                    bottom: auto;
                    top: 0;
                }
            }
        }

        &:hover {
            .edit-button {
                visibility: visible;
            }
        }
    }
</style>
