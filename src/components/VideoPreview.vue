<template>
    <div>
        <div v-if="!sided" @click="$router.push('/video/' + id)" class="preview-container">
            <b-img class="preview" :src="preview"></b-img>
            <p class="title">{{ title }}</p>
            <p v-if="addToPlaylist" @click.stop="addToPlaylist" class="plus"><icon icon="plus"></icon></p>
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
            <span v-if="addToPlaylist" @click.stop="addToPlaylist" class="plus-button">
                <div class="m-auto" style="height: auto">
                    <icon icon="plus"></icon>
                </div>
            </span>
        </div>
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
            },
            addToPlaylist: {
                type: Function
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
        text-align: left;

        &:hover, &:focus, &:active {
            transform: translateY(-8px);

            .plus {
                visibility: visible;
            }
        }

        .preview {
            width: 100%;
            margin-bottom: 0.3em;
        }

        .title {
            display: inline-block;
            padding-top: 0.2em;
            color: white;
            font-size: 12pt;
            text-align: left;
            line-height: 20px;
            width: 90%;
        }

        .plus {
            display: inline-block;
            text-align: right;
            width: 10%;
            vertical-align: top;
            color: rgba(255, 255, 255, 0.75);
            visibility: hidden;

            &:hover {
                color: rgba(255, 255, 255, 0.30);
            }

            @media (max-width: 1000px) {
                visibility: visible;
            }
        }

        .details {
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

            .plus-button {
                visibility: visible;
            }
        }

        .left-side {
            width: 30%;
            margin-right: 1em;

            .preview {
                width: 100%;
            }
        }

        .right-side {
            width: 65%;

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

        .plus-button {
            width: 5%;
            display: flex;
            height: auto;
            vertical-align: center;
            background-color: rgba(0, 0, 0, 0.15);
            font-size: 10pt;
            visibility: hidden;

            &:hover {
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>
