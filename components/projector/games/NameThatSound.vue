<template>
    <div class="blank">
        <audio id="audio-player"
            v-if="playing && soundFile != undefined"
            :src="`assets/games/NameThatSound/sound/${soundFile}`"
            autoplay
            @ended="playing = false; soundFile = undefined"
        >

        </audio>

        <v-fade-transition v-if="!hide">
        <v-icon 
            :key="'yesPlaying'"
            v-if="playing"
            dark
            size="300px"
            style="position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);"
        >mdi-volume-high</v-icon>
        <v-icon 
            :key="'noPlaying'"
            v-else
            dark
            size="300px"
            style="position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);"
        >mdi-volume-mute</v-icon>
        </v-fade-transition>
    </div>
</template>

<style scoped>
.blank {
    background-color: black;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left:0;
    top: 0;
}
</style>

<script>
export default {
    created() {
        this.$nuxt.$on("displayEvent", data => {
            if (
                data.eventName === "playSound" &&
                data.value != undefined &&
                this.knownSounds.includes(data.value)
            ) {
                this.soundFile = data.value;
                this.playing = true;
                this.hide = false;
            } else if (
                data.eventName === "stopSound"
            ) {
                this.playing = false;
                this.soundFile = undefined;
            } else if (
                data.eventName === "hideIcon"
            ) {
                this.hide = true;
            }

        })
        this.$emit("mounted")
    },
    data() {
        return {
            playing: false,
            hide: true,
            soundFile: undefined,
            knownSounds: []
        }
    },

    async fetch() {
        try {
            this.knownSounds = (await this.$axios.$get("/api/getGameAssetNames/NameThatSound/sounds")).names
        } catch(e) {
            //Oh well FIXME??
        }
    }
}
</script>