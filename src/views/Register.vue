<template>
    <b-container>
        <b-row>
            <b-col class="mx-auto" cols="12" lg="8">
                <b-card class="mt-3 mt-lg-5 text-left" style="font-size: 11pt">
                    <form>
                        <b-row>
                            <b-col class="mb-3" cols="12">
                                <label>Adresse e-mail</label>
                                <b-form-input></b-form-input>
                            </b-col>
                            <b-col class="mb-3" cols="12" lg="6">
                                <label>Mot de passe</label>
                                <b-form-input></b-form-input>
                            </b-col>
                            <b-col class="mb-3" cols="12" lg="6">
                                <label>Confirmation</label>
                                <b-form-input></b-form-input>
                            </b-col>
                        </b-row>
                        <b-button class="submit-btn" type="submit" variant="dark">Valider</b-button>
                    </form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style lang="scss" scoped>
    .form-control {
        background: rgba(0, 0, 0, 0.2);
        color: white;
        border: none;

        &:focus {
            background-color: rgba(0, 0, 0, 0.2);
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
