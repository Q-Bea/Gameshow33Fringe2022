<template>
    <v-container fluid class="fill-height slapContainer">
        <v-slide-y-transition mode="out-in">
            <v-img
                v-if="currentImage !== undefined"
                :key="currentImage"
                :src="`/assets/games/SlapDicks/images/${currentImage}`"
                contain
                eager
                max-height="90vh"
            />
        </v-slide-y-transition>

        <v-slide-y-transition>
            <v-overlay v-if="currentImage !== undefined && showName" opacity="0.5">
                <v-card class="imageName" color="grey lighten-2" elevation="20" light>
                    <v-card-text
                        class="imageNameText">
                        {{getNameFromFileName}}
                    </v-card-text>
                </v-card>
            </v-overlay>
        </v-slide-y-transition>
    </v-container>
</template>

<style scoped>
.slapContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
}
.imageName {
    position: fixed;
    z-index: 300;
    left: 50%;
    transform: translateX(-50%) translateY(7rem);
    width: max-content;
}

.imageNameText {
    font-family: 'Bebas_Neue';
    font-size: 60px;
    line-height: 60px;
    opacity: 1 !important;
    white-space: nowrap;
    color: rgb(23, 23, 23) !important;
    font-weight: bold;
}
</style>

<script>
export default {
    computed: {
        getNameFromFileName() {
            if (this.currentImage == undefined) return;
            let text = this.currentImage;
            let frontHyphen = text.search(/-/);
            let backDot = text.search(/\.(.+)$/)

            text = text.substring(frontHyphen + 1, backDot);
            text = text.replace(/-/g, " ");

            //Capitalize first
            const split = text.split(" ");
            for (let i = 0; i < split.length; i++) {
                split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
            }

            text = split.join(" ");

            return text;
        }
    },

    data() {
        return {
            knownImages: [],
            currentImage: undefined,
            showName: false
        }
    },
    
    created() {
        this.$nuxt.$on("displayEvent", data => {
            if (data != undefined) {
                switch(data.eventName) {
                    case "showImage":
                        if (this.knownImages.includes(data.value)) {
                            this.currentImage = data.value;
                            this.showName = false;
                        }
                        break;

                    case "showName":
                        this.showName = !this.showName;
                        break;

                    case "blackout":
                        this.currentImage = undefined;
                        this.showName = false;
                        break;
                }
            }
        })
    },

    async fetch() {
        try {
            this.knownImages = (await this.$axios.$get("/api/getDisplayAssetNames/games/SlapDicks/images")).names
        } catch(e) {
            //Oh well FIXME??
        }
    }
}
</script>