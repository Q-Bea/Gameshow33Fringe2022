<template>
    <v-row>
        <ButtonEmitter
            v-for="name in sounds"
            :key="name"
            :label="`Play: ${name}`"
            colour="blue lighten-3"
            eventName="playSound"
            :dataValue="name"
        >
            <div class="text-center">
                <p>Play:</p>
                <p>{{name.replace(/(-|(.mp3$))/g, " ")}}</p>
            </div>
        </ButtonEmitter>

        <ButtonEmitter
            label="Stop Sounds"
            eventName="stopSound"
            colour="red lighten-1"
        />
        
        <ButtonEmitter
            label="Hide Icon"
            eventName="hideIcon"
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
            sounds: []
        }
    },

    fetchOnServer: true,

    async fetch() {
        try {
            this.sounds = (await this.$axios.$get("/api/getDisplayAssetNames/games/NameThatSound/sounds")).names
        } catch(e) {
            //Oh well FIXME??
        }
    },

    created() {
        this.$emit("mounted")
    }
}
</script>