<template>
    <b-container>
        <b-row>
            <b-col class="mx-auto" cols="12" lg="8">
                <b-card class="mt-3 mt-lg-5 text-left" style="font-size: 11pt">
                    <b-form @submit.prevent="register">
                        <b-row>
                            <b-col class="mb-3" cols="12">
                                <b-form-group label="Adresse e-mail"
                                              :invalid-feedback="invalidEmail" :state="emailState">
                                    <b-form-input v-model="email" :state="emailState" type="email" maxlength="250" autocomplete="off" trim required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col class="mb-3" cols="12" lg="6">
                                <b-form-group label="Mot de passe"
                                              :invalid-feedback="invalidPassword" :state="passwordState">
                                    <b-form-input v-model="password" :state="passwordState" type="password" maxlength="250" autocomplete="off" trim required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col class="mb-3" cols="12" lg="6">
                                <b-form-group label="Confirmation"
                                              :invalid-feedback="invalidConfirmation" :state="confirmationState">
                                    <b-form-input v-model="confirm" :state="confirmationState" type="password" maxlength="250" autocomplete="off" trim required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button class="submit-btn" type="submit" variant="dark"
                                  v-show="emailState && passwordState && confirmationState">Valider</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import * as axios from 'axios';

    export default {
        name: "Register",
        data() {
            return {
                email: null,
                password: null,
                confirm: null
            }
        },
        computed: {
            emailState() {
                let regex = /\S+@\S+\.\S+/;
                return this.email != null && regex.test(this.email);
            },
            invalidEmail() {
                if (this.email === null || this.email === '')
                    return '';
                else if (!this.emailState)
                    return 'Email incorrect';
                else
                    return '';
            },
            passwordState() {
                return this.password != null && this.password.length > 4;
            },
            invalidPassword() {
                if (this.password === null || this.password === '')
                    return '';
                else if (this.password != null && this.password.length < 4)
                    return 'Le mot de passe doit contenir au moins 5 caractères';
                else
                    return '';
            },
            confirmationState() {
                return this.confirm != null && this.confirm != '' && this.confirm === this.password;
            },
            invalidConfirmation() {
                if (this.confirm === null || this.confirm === '')
                    return '';
                else if (this.confirm != this.password)
                    return 'Oops, mots de passe différents !';
                else
                    return '';
            }
        },
        methods: {
            register(event) {
                if (!this.emailState || !this.passwordState || !this.confirmationState) {
                    event.preventDefault();
                    return;
                }

                axios.post(`${process.env.VUE_APP_API_ADDRESS}/users/register`, {
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.$swal({
                        icon: 'success',
                        title: 'Enregistrement complété',
                        text: 'Votre compte a été créé avec succès'
                    }).then(() => {
                        this.$router.push('/');
                    });
                }).catch(err => {
                    let message = err.response.data;
                    if (message === 'Email already exists') {
                        this.$swal({
                            icon: 'error',
                            title: 'Erreur lors de l\'enregistrement',
                            text: 'Cet e-mail est déjà utilisé'
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-control {
        background: rgba(0, 0, 0, 0.2);
        color: white;
        border: none;

        &:focus {
            background-color: rgba(0, 0, 0, 0.2);
            color: white;
        }
    }

    .form-control::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    .submit-btn {
        float: right;
        background-color: rgba(0, 0, 0, 0.2);
        border: none;
        padding-left: 15px;
        padding-right: 15px;
        margin-top: 1em;
    }
</style>
