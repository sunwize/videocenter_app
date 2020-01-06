<template>
    <b-container>
        <b-row>
            <b-col class="mx-auto" cols="12" lg="8">
                <b-card class="mt-3 mt-lg-5 px-3 text-left" style="font-size: 12pt">
                    <p class="text-center mb-4" style="font-size: 1.5em">{{ user.email }}</p>

                    <b-input-group class="mb-3">
                        <template v-slot:prepend>
                            <b-input-group-text><icon icon="video"></icon></b-input-group-text>
                        </template>
                        <b-form-input :placeholder="histories.length + ' vidéos regardées'" readonly></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-4">
                        <template v-slot:prepend>
                            <b-input-group-text style="width: 44px"><icon style="font-size: 14pt" icon="list"></icon></b-input-group-text>
                        </template>
                        <b-form-input :placeholder="playlists.length + ' playlists créées'" readonly></b-form-input>
                    </b-input-group>

                    <b-button @click="openModal" class="mx-auto d-block" variant="primary">Modifier mon mot de passe</b-button>

                    <b-button v-if="$store.getters.isMobileDevice" @click="$store.dispatch('logout')"
                              class="mx-auto d-block mt-3" variant="danger">
                        Déconnexion <icon icon="sign-out-alt" class="ml-1"></icon>
                    </b-button>
                </b-card>
            </b-col>
        </b-row>

        <b-modal id="change-password" title="Changer de mot de passe" hide-footer>
            <b-form @submit.prevent="updatePassword">
                <b-form-group
                        label="Mot de passe actuel"
                        label-for="password"
                >
                    <b-form-input v-model="changePassword.password" :state="passwordState"
                                  id="password" type="password" maxlength="250" autocomplete="off" trim required></b-form-input>
                </b-form-group>

                <b-form-group
                        label="Nouveau mot de passe"
                        label-for="new-password"
                        :invalid-feedback="invalidNewPassword"
                        :state="newPasswordState"
                >
                    <b-form-input v-model="changePassword.newPassword" :state="newPasswordState"
                                  id="new-password" type="password" maxlength="250" autocomplete="off" trim required></b-form-input>
                </b-form-group>

                <b-form-group
                        label="Confirmation du nouveau mot de passe"
                        label-for="confirm-new-password"
                        :invalid-feedback="invalidConfirmation"
                        :state="confirmationState"
                >
                    <b-form-input v-model="changePassword.confirm" :state="confirmationState"
                                  id="confirm-new-password" type="password" maxlength="250" autocomplete="off" trim required></b-form-input>
                </b-form-group>

                <b-button v-show="passwordState && newPasswordState && confirmationState" type="submit" class="float-right" variant="dark">Valider</b-button>
            </b-form>
        </b-modal>
    </b-container>
</template>

<script>
    import Network from "../helpers/Network";

    export default {
        name: "Account",
        activated() {
            this.loadHistories();
            this.loadPlaylists();
            this.changePassword = {
                password: null,
                    newPassword: null,
                    confirm: null
            };
        },
        mounted() {
            this.loadHistories();
            this.loadPlaylists();
            this.changePassword = {
                password: null,
                newPassword: null,
                confirm: null
            };
        },
        data() {
            return {
                changePassword: {
                    password: null,
                    newPassword: null,
                    confirm: null
                },
                histories: [],
                playlists: []
            }
        },
        computed: {
            user() {
                return this.$store.getters.currentUser;
            },
            passwordState() {
                let p = this.changePassword.password;
                return p != null && p.length > 4;
            },
            newPasswordState() {
                let p = this.changePassword.newPassword;
                return p != null && p.length > 4;
            },
            invalidNewPassword() {
                if (this.newPasswordState || this.changePassword.newPassword === null)
                    return '';
                else
                    return 'Le mot de passe doit contenir au moins 5 caractères';
            },
            confirmationState() {
                let p = this.changePassword.confirm;
                return p != null && this.newPasswordState && p === this.changePassword.newPassword;
            },
            invalidConfirmation() {
                if (this.confirmationState || this.changePassword.confirm === null || this.changePassword.confirm === '')
                    return '';
                else
                    return 'Oops, mots de passe différents !';
            }
        },
        methods: {
            loadHistories() {
                Network.get(`${process.env.VUE_APP_API_USERS_SERVICE}/histories/all/${this.user.id}`)
                .then(res => {
                    this.histories = res.data;
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            loadPlaylists() {
                Network.get(`${process.env.VUE_APP_API_VIDEOS_SERVICE}/playlists/all/${this.user.id}`)
                .then(res => {
                    this.playlists = res.data;
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            updatePassword(event) {
                if (!this.passwordState || !this.newPasswordState || !this.confirmationState) {
                    event.preventDefault();
                    return;
                }

                Network.post(`${process.env.VUE_APP_API_USERS_SERVICE}/users/change-password`, {
                    email: this.user.email,
                    password: this.changePassword.password,
                    newPassword: this.changePassword.newPassword
                }).then(() => {
                    this.$bvModal.hide('change-password');
                    this.$swal({
                        icon: 'success',
                        title: 'Mot de passe mis à jour',
                        text: 'Votre mot de passe a été mis à jour avec succès'
                    });
                }).catch(err => {
                    let message = err.response.data;
                    if (message === 'Bad password') {
                        this.$swal({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Mot de passe incorrect'
                        });
                    } else {
                        this.$swal({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Un problème est survenu'
                        });
                    }
                });
            },
            openModal() {
                this.changePassword = {
                    password: null,
                    newPassword: null,
                    confirm: null
                };
                this.$bvModal.show('change-password');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
