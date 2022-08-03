<template>
    <v-container class="base">
        <v-scroll-y-transition>
            <div v-if="visible && gameName !== undefined" class="base base-gradient" :key="gameName">
                <v-card 
                    width="max-content" 
                    max-width="97vw" 
                    style="border-radius: 15px; align-self: center;" 
                    elevation="20"
                >
                    <v-card-text class="text-center gameName">{{gameName}}</v-card-text>
                </v-card>
            </div>
        </v-scroll-y-transition>

        <audio id="audio-player"
            v-if="soundFile != undefined"
            :src="`assets/scenes/GameName/sounds/${soundFile}`"
            autoplay
            @ended="soundFile = undefined"
        />
    </v-container>
</template>

<script>
export default {
    data:() => {
        return {
            gameName: undefined,
            visible: false,
            soundFile: undefined,
            knownSounds: []
        }
    },
    created() {
        this.$nuxt.$on("displayEvent", data => {
            if (data.eventName == undefined) return;


            switch(data.eventName) {
                case "setGameName":
                    if (typeof data.value === "string") {
                        this.gameName = data.value;
                        this.visible = true;
                    }
                    break

                case "blackout":
                    this.visible = false;
                    break;

                case "playSound":
                    if (typeof data.value === "string" && this.knownSounds.includes(data.value)) {
                        this.soundFile = data.value
                    }
                    break
            }
        })
    },
    async fetch() {
        try {
            this.knownSounds = (await this.$axios.$get("/api/getDisplayAssetNames/scenes/GameName/sounds")).names
        } catch(e) {
            console.error(e)
            //Oh well FIXME??
        }    
    }
}
</script>

<style scoped>
.base {
    text-align: center;
    justify-content: center;
    display: flex;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    color: white;
    transition: background 0.5s;
}

.base-gradient {
    background: rgb(80,68,102);
    /* background: linear-gradient(90deg, #272233 0%, #79779a 100%);  */
    background: linear-gradient(135deg, #e0b11c 0%, #6c6d8b 40%, #6c6d8b 60%, #e32a0b 100%); 
}

.gameName {
    font-size: 100px;
    color: black !important;
    padding: 40px;
    font-family: "Bebas_Neue";
    line-height: 100px;
}
</style>