<template>
    <div style="cursor: pointer">
        <div class="preview-container" @click="$router.push('/video/' + id)">
            <b-img class="preview" :src="`https://i.ytimg.com/vi/${id}/mqdefault.jpg`"></b-img>
        </div>
        <div>
            <p class="title">{{ title }}</p>
            <p class="channel">{{ channel }}</p>
            <p class="views">{{ kFormat(views) }} vues</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoPlayer",
        props: {
            id: String,
            title: String,
            channel: String,
            views: String
        },
        methods: {
            kFormat(number) {
                let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
                let tier = Math.log10(number) / 3 | 0;
                if(tier == 0) return number;
                let suffix = SI_SYMBOL[tier];
                let scale = Math.pow(10, tier * 3);
                let scaled = number / scale;
                return scaled.toFixed(1) + suffix;
            }
        }
    }
</script>

<style lang="scss" scoped>
    p {
        margin-bottom: 0;
    }

    .preview-container {
        resize: both;
        overflow: hidden;
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

    .channel, .views {
        text-align: left;
        font-size: 11pt;
        color: rgba(255, 255, 255, 0.6);
    }
</style>