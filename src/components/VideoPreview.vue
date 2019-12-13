<template>
    <div v-if="!sided" @click="$router.push('/video/' + id)" class="preview-container">
        <b-img class="preview" :src="preview"></b-img>
        <p class="title">{{ title }}</p>
        <p class="details">{{ channel }} • {{ kFormat(views) }} vues</p>
    </div>
    <div v-else @click="$router.push('/video/' + id)" class="sided-preview">
        <span class="left-side">
            <b-img class="preview" :src="preview"></b-img>
        </span>
        <span class="right-side">
            <p class="title">{{ decodeXML(title) }}</p>
            <p class="details">{{ channel }} • {{ kFormat(views) }} vues</p>
        </span>
    </div>
</template>

<script>
    import {kFormat, decodeXML} from "@/helpers/Utils";

    export default {
        name: "VideoPlayer",
        props: {
            id: String,
            title: String,
            channel: String,
            views: String,
            preview: String,
            sided: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            kFormat(number) {
                return kFormat(number);
            },
            decodeXML(text) {
                return decodeXML(text);
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
        margin-bottom: 0;
    }

    .preview-container {
        cursor: pointer;
        transition-duration: 0.3s;
        transition-property: transform;
        transition-timing-function: ease-out;

        &:hover, &:focus, &:active {
            transform: translateY(-8px);
        }

        .preview {
            width: 100%;
        }

        .title {
            padding-top: 0.2em;
            color: white;
            font-size: 12pt;
            text-align: left;
            line-height: 20px;
        }

        .details {
            text-align: left;
            font-size: 11pt;
            color: rgba(255, 255, 255, 0.6);
        }
    }

    .sided-preview {
        display: flex;
        cursor: pointer;
        transition-duration: 0.3s;
        transition-property: transform;
        transition-timing-function: ease-out;

        &:hover, &:focus, &:active {
            transform: translateX(-10px);
        }

        .left-side {
            width: 30%;
            margin-right: 1em;

            .preview {
                width: 100%;
            }
        }

        .right-side {
            width: 70%;

            .title {
                text-align: left;
                font-size: 14pt;
            }

            .details {
                text-align: left;
                color: rgba(255, 255, 255, 0.7);
                font-size: 11pt;
            }
        }
    }
</style>
