<template>
    <div class="blank">
        
        <v-fade-transition v-if="!hide">
            <v-img
                v-if="imageFile != undefined"
                :src="`/assets/games/NameThatFish/images/${imageFile}`"
                contain
                max-height="100vh"
            />
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
                data.eventName === "showImage" &&
                typeof data.value === "string" &&
                this.knownImages.includes(data.value)
            ) {
                this.imageFile = data.value;
                this.playing = true;
                this.hide = false;
            } else if (
                data.eventName === "hideImage"
            ) {
                this.hide = true;
            }

        })
        this.$emit("mounted")
    },
    data() {
        return {
            hide: true,
            imageFile: undefined,
            knownImages: []
        }
    },

    async fetch() {
        try {
            this.knownImages = (await this.$axios.$get("/api/getGameAssetNames/NameThatFish/images")).names
        } catch(e) {
            //Oh well FIXME??
        }
    }
}
</script>