<template>
    <div>
        <b-row v-if="playlists" class="px-lg-4 m-0 w-100 pb-5 pb-lg-0">
            <div class="w-100 pl-lg-3 my-2 my-lg-3">
                <b-button @click="openPlaylistCreation" class="float-lg-left text-white border-0" variant="outline-dark"><icon icon="plus"></icon> Créer une playlist</b-button>
            </div>

            <b-col cols="12" lg="3" v-for="playlist in playlists" :key="playlist.id" class="mb-4 px-0 px-lg-3">
                <div class="playlist-preview">
                    <playlist-preview :playlist="playlist" :on-edit="openPlaylistModal"></playlist-preview>
                    <div @click="deletePlaylist(playlist)" class="delete-icon"><icon icon="trash"></icon></div>
                </div>
            </b-col>

            <b-modal @hide="creation.title = ''" id="playlist-creation" title="Nouvelle playlist" size="sm" hide-footer>
                <p class="text-white mb-1">Nom</p>
                <b-form @submit.prevent="createPlaylist">
                    <b-input v-model="creation.title" ref="creationName" size="sm" required></b-input>
                    <b-button v-if="creation.title.length > 0" class="mt-3 float-right border-0" type="submit" size="sm" variant="outline-primary">CRÉER</b-button>
                </b-form>
            </b-modal>

            <b-modal @hide="resetPlaylistModal" body-class="pt-2" id="playlist-edition" title="Informations de la playlist" size="lg" hide-footer>
                <div class="position-relative">
                    <b-form @submit.prevent="updatePlaylist">
                        <b-input v-model="modal.playlist.title" ref="playlist_title" class="playlist-title bg-transparent"
                                 :readonly="!editingTitle" required></b-input>

                        <b-button v-if="!editingTitle" type="submit" variant="outline-dark" class="edit-title"><icon icon="pen"></icon></b-button>
                        <b-button v-if="editingTitle" type="submit" variant="outline-dark" class="edit-title"><icon icon="save"></icon></b-button>
                    </b-form>
                </div>

                <div class="playlist-date">Créée le {{ moment(modal.playlist.date).locale('fr').format('D MMMM YYYY') }}</div>

                <div v-if="hasVideos" class="mt-3 position-relative">
                    <b-input v-model="modal.search" placeholder="Rechercher dans la playlist" autocomplete="off" maxlength="250"></b-input>
                    <div class="search-icon"><icon icon="search"></icon></div>
                </div>

                <b-row v-if="modal.playlist.videos" class="mt-4">
                    <b-col v-for="video in modalVideos" :key="video.id" class="mb-3" cols="12" lg="4">
                        <div class="video-preview">
                            <video-preview :video="video" :animated="false"></video-preview>
                            <div @click="removeVideoFromPlaylist(video)" class="delete-icon"><icon icon="trash"></icon></div>
                        </div>
                    </b-col>
                </b-row>
            </b-modal>
        </b-row>
    </div>
</template>

<script>
    import * as axios from "axios";
    import moment from "moment";

    export default {
        name: "Playlists",
        data() {
            return {
                playlists: null,
                creation: {
                    title: ''
                },
                modal: {
                    playlist: {},
                    editionMode: {
                        title: false
                    },
                    search: ''
                }
            }
        },
        computed: {
            user() {
                return this.$store.getters.currentUser;
            },
            editingTitle() {
                return this.modal.editionMode.title;
            },
            modalVideos() {
                return this.modal.playlist.videos.filter(v => v.title.toLowerCase().indexOf(this.modal.search.toLowerCase()) !== -1);
            },
            hasVideos() {
                return this.modal.playlist.videos && this.modal.playlist.videos.length > 0;
            }
        },
        mounted() {
            this.loadPlaylists();
        },
        activated() {
            this.loadPlaylists();
        },
        methods: {
            createPlaylist() {
                axios.post(`${process.env.VUE_APP_API_ADDRESS}/playlists/create`, {
                    user_id: this.user.id,
                    title: this.creation.title
                }).then(() => {
                    this.$swal({
                        icon: 'success',
                        title: 'Playlist créée',
                        text: 'Vous pouvez maintenant y ajouter des vidéos !'
                    });
                    this.$bvModal.hide('playlist-creation');
                    this.loadPlaylists();
                }).catch(err => {
                    if (err.response.data === 'Title already exists') {
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ce titre est déjà utilisé'
                        });
                    } else {
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Une erreur est survenue'
                        });
                    }
                });
            },
            loadPlaylists() {
                axios.get(`${process.env.VUE_APP_API_ADDRESS}/playlists/all/${this.user.id}`)
                    .then(res => {
                        this.playlists = res.data;

                        if (this.playlists.length === 0)
                            return;
                        else {
                            for (let playlist of this.playlists) {
                                playlist.preview = null;

                                if (playlist.videos.length > 0) {
                                    axios.get(`${process.env.VUE_APP_API_ADDRESS}/videos/details/${playlist.videos.toString()}`)
                                    .then(res => {
                                        playlist.videos = res.data;
                                    }).catch(err => {
                                        // eslint-disable-next-line no-console
                                        console.log(err);
                                    });
                                }
                            }
                        }

                    }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Une erreur est survenue'
                    });
                });
            },
            moment() {
                return moment();
            },
            openPlaylistCreation() {
                this.$bvModal.show('playlist-creation');
                setTimeout(() => {
                    this.$refs.creationName.focus();
                }, 100);
            },
            openPlaylistModal(playlist) {
                this.modal.playlist = Object.assign({}, playlist);
                this.$bvModal.show('playlist-edition');
            },
            resetPlaylistModal() {
                this.modal = {
                    playlist: {},
                    editionMode: {
                        title: false
                    },
                    search: ''
                };
            },
            updatePlaylist() {
                if (this.editingTitle) {
                    let videos = [];
                    for (let video of this.modal.playlist.videos)
                        videos.push(video.id);
                    axios.post(`${process.env.VUE_APP_API_ADDRESS}/playlists/update`, {
                        id: this.modal.playlist.id,
                        title: this.modal.playlist.title,
                        videos: videos
                    }).then(() => {
                        this.modal.editionMode.title = false;
                        this.playlists.filter(p => p.id === this.modal.playlist.id)[0].title = this.modal.playlist.title;
                    }).catch(err => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        if (err.response.data.code === 11000) { // Duplicate key
                            this.$swal({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Une playlist porte déjà ce nom !'
                            });
                        }
                    });
                } else {
                    this.modal.editionMode.title = true;
                    setTimeout(() => {
                        this.$refs.playlist_title.focus();
                    }, 100);
                }
            },
            deletePlaylist(playlist) {
                const id = playlist.id;

                this.$swal({
                    icon: 'warning',
                    title: 'Supprimer la playlist ?',
                    text: 'Cette action est irréversible',
                    buttons: ["Annuler", "Supprimer"],
                    dangerMode: true
                }).then(result => {
                    if (result) {
                        axios.post(`${process.env.VUE_APP_API_ADDRESS}/playlists/delete`, {
                            id: id
                        }).then(() => {
                            this.$bvModal.hide('playlist-edition');
                            this.loadPlaylists();
                        }).catch(err => {
                            // eslint-disable-next-line no-console
                            console.log(err);
                        });
                    }
                });
            },
            removeVideoFromPlaylist(video) {
                this.$swal({
                    icon: 'warning',
                    title: 'Retirer la vidéo ?',
                    text: 'Cette vidéo ne fera plus partie de la playlist',
                    buttons: ["Annuler", "Retirer"],
                    dangerMode: true
                }).then(result => {
                    if (result) {
                        let videos = this.modal.playlist.videos;
                        videos.splice(videos.indexOf(video), 1);

                        axios.post(`${process.env.VUE_APP_API_ADDRESS}/playlists/update`, {
                            id: this.modal.playlist.id,
                            title: null,
                            videos: videos.map(v => v.id)
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playlist-title {
        font-size: 14pt;
        width: 90%;
    }

    .playlist-date {
        padding-left: 0.9em;
        font-size: 10pt;
        color: rgba(255, 255, 255, 0.5);
    }

    .edit-title {
        background-color: transparent;
        border: none;
        position: absolute;
        right: 0;
        top: 3px;
        padding: 0.25em;
        color: white;
        cursor: pointer;
        font-size: 14pt;

        &:hover, &:focus, &:active {
            background-color: transparent;
            border: none;
        }
    }

    .search-icon {
        color: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: 7px;
        right: 10px;
    }

    .video-preview, .playlist-preview {
        position: relative;

        &:hover {
            .delete-icon {
                visibility: visible;
            }
        }
    }

    .playlist-preview {
        @media (max-width: 1000px) {
            .delete-icon {
                right: 10px;
            }
        }
    }

    .delete-icon {
        position: absolute;
        top: -8px;
        right: -8px;
        color: rgba(255, 43, 28, 0.8);
        background-color: rgba(0, 0, 0, 0.9);
        border-radius: 5px;
        cursor: pointer;

        svg {
            margin-left: 5px;
            margin-right: 5px;
        }

        @media (min-width: 1000px) {
            visibility: hidden;
        }
    }
</style>