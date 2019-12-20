<template>
    <form @submit="login">
        <b-form-input v-model="email" class="mb-3" placeholder="Email" type="email" maxlength="250" trim required></b-form-input>
        <b-form-input v-model="password" class="mb-3" placeholder="Mot de passe" type="password" maxlength="250" trim required></b-form-input>
        <b-button @click="register" class="btn-sign-up" variant="outline-dark">Créer un compte</b-button>
        <b-button type="submit" class="float-right" variant="dark">Se connecter</b-button>
    </form>
</template>

<script>
    export default {
        name: "SignInForm",
        data() {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            login(event) {
                event.preventDefault();
                this.$store.dispatch('login', { email: this.email, password: this.password })
                    .then(() => {
                        this.$bvModal.hide('login-modal');
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Identifiants incorrects'
                        });
                    });
            },
            register() {
                this.$router.push('/register');
                this.$bvModal.hide('login-modal');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn-sign-up {
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.9);
    }
</style>
