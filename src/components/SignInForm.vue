<template>
    <form>
        <b-form-input v-model="email" class="mb-3" placeholder="Email" type="email" maxlength="250" trim required></b-form-input>
        <b-form-input v-model="password" class="mb-3" placeholder="Mot de passe" type="password" maxlength="250" trim required></b-form-input>
        <b-button @click="signUp" class="btn-sign-up" variant="outline-dark">Créer un compte</b-button>
        <b-button @click="signIn" type="submit" class="float-right" variant="dark">Se connecter</b-button>
    </form>
</template>

<script>
    export default {
        name: "SignInForm",
        props: {
            beforeSignUp: Function,
            beforeSignIn: Function
        },
        data() {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            signIn() {
                this.beforeSignIn();
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    // eslint-disable-next-line no-console
                    console.log(res);
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                });
            },
            signUp() {
                this.beforeSignUp();
                this.$router.push('/register');
            }
        }
    }
</script>

<style scoped>
    .form-control {
        background-color: rgba(0, 0, 0, 0.2);
        color: white;
        border: none;
    }

    .form-control::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    .btn-sign-up {
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.9);
    }
</style>
