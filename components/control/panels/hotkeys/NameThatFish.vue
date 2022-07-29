<template>
    <v-row>
        <ButtonEmitter
            v-for="name in images"
            :key="name"
            :label="`Play: ${name}`"
            :colour="name.includes('Reveal') ? 'blue darken-1' : 'blue lighten-3'"
            eventName="showImage"
            :dataValue="name"
        >
            <div class="text-center">
                <p>Show:</p>
                <p>{{name.replace(/(-|(.mp3$))/g, " ")}}</p>
            </div>
        </ButtonEmitter>
        
        <ButtonEmitter
            label="Hide Image"
            eventName="hideImage"
            colour="orange lighten-1"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue';
export default {
    components: { ButtonEmitter, ButtonEmitter },
    data() {
        return {
            images: []
        }
    },

    fetchOnServer: true,

    async fetch() {
        try {
            this.images = (await this.$axios.$get("/api/getGameAssetNames/NameThatFish/images")).names
        } catch(e) {
            //Oh well FIXME??
        }
    },

    created() {
        this.$emit("mounted")
    }
}
</script>