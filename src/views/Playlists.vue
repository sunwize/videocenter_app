<template>
    <b-row v-if="playlists" class="pt-3 pt-lg-4 w-100 m-0">
        <b-col cols="12" lg="8" v-for="playlist in playlists" :key="playlist.id" class="mb-3 mx-auto p-0">
            <playlist-preview :playlist="playlist"></playlist-preview>
        </b-col>
    </b-row>
</template>

<script>
    import * as axios from "axios";

    export default {
        name: "Playlists",
        data() {
            return {
                playlists: null
            }
        },
        computed: {
            user() {
                return this.$store.getters.currentUser;
            }
        },
        mounted() {
            this.loadPlaylists();
        },
        activated() {
            this.loadPlaylists();
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>

</style>