<template>
    <b-modal @hide="resetModal" body-class="rounded-0" size="sm" id="playlists-modal" title="Enregistrer dans...">
        <template v-slot:default>
            <div v-for="playlist in playlists" :key="playlist.id">
                <b-checkbox :checked="videoInPlaylist(videoId, playlist)" @change="updatePlaylist($event, playlist)" size="lg">
                    <p class="playlist-title">{{ playlist.title }}</p>
                </b-checkbox>
            </div>
            <div v-if="playlists.length === 0" class="text-secondary text-center">
                Aucune playlist trouvée
            </div>
        </template>

        <template v-slot:modal-footer>
            <div v-if="!creationMode" @click="creationMode = true" class="playlist-modal-footer">
                <icon class="mr-1" icon="plus"></icon> Créer une playlist
            </div>
            <div v-else class="playlist-modal-footer">
                <b-form @submit.prevent="createPlaylist">
                    <b-form-group label="Nom" class="text-left">
                        <b-form-input size="sm" v-model="newPlaylist.title" type="text" maxlength="250" autocomplete="off" trim required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" size="sm" variant="outline-primary" class="float-right border-0">CRÉER</b-button>
                </b-form>
            </div>
        </template>
    </b-modal>
</template>

<script>
    import * as axios from 'axios';

    export default {
        name: "PlaylistsModal",
        data() {
            return {
                playlists: [],
                newPlaylist: {
                    title: null
                },
                creationMode: false
            }
        },
        mounted() {
            this.loadPlaylists();
        },
        activated() {
            this.loadPlaylists();
        },
        computed: {
            videoId() {
                return this.$store.getters.currentVideoToAdd;
            },
            user() {
                return this.$store.getters.currentUser;
            }
        },
        methods: {
            createPlaylist() {
                axios.post(`${process.env.VUE_APP_API_ADDRESS}/playlists/create`, {
                    user_id: this.user.id,
                    title: this.newPlaylist.title
                }).then(() => {
                    this.resetModal();
                    this.$swal({
                        icon: 'success',
                        title: 'Playlist créée',
                        text: 'Vous pouvez maintenant y ajouter des vidéos !'
                    });
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
            updatePlaylist(checked, playlist) {
                if (checked)
                    playlist.videos.push(this.videoId);
                else
                    playlist.videos.splice(playlist.videos.indexOf(this.videoId, 1));

                axios.post(`${process.env.VUE_APP_API_ADDRESS}/playlists/update`, {
                    id: playlist.id,
                    title: playlist.title,
                    videos: playlist.videos
                }).then(() => {
                    this.loadPlaylists();
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
            loadPlaylists() {
                axios.get(`${process.env.VUE_APP_API_ADDRESS}/playlists/all/${this.user.id}`)
                .then(res => {
                    this.playlists = res.data;
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
            resetModal() {
                this.newPlaylist.title = '';
                this.creationMode = false;
            },
            videoInPlaylist(video, playlist) {
                return playlist.videos.indexOf(video) != -1;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .playlist-title {
        margin-bottom: 0;
        font-size: 12pt;
        margin-top: 3px;
    }

    .playlist-modal-footer {
        width: 100%;
        margin: auto;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        padding: 0.5em 1em;
        cursor: pointer;
    }
</style>