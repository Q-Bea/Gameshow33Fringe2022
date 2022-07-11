<template>
    <v-container fluid class="fill-height">
        <Transition mode="out-in">
            <component v-bind:is="currentScene"/>
        </Transition>
    </v-container>
</template>

<script>
import Base from "~~/components/projector/Base.vue"
import Points from "@/components/projector/scenes/points/Points.vue"
import Wheel from "@/components/projector/scenes/wheel/Wheel.vue"

const VALID_SCENES = ["Base", "Points", "Wheel"];

export default {
    data() {
        return {
            currentScene: "Base",
        }
    },
    mounted() {
        //Socket vuex bindings
        this.socket = this.$nuxtSocket({withCredentials: true})

        this.socket.emit("getPlayerData", (data) => {
            this.$store.commit("players/setData", data);
        })

        this.socket.emit("getWheelOptions", (data) => {
            this.$store.commit("wheel/setOptions", data);
        })

        this.socket.on("playersUpdate", (data) => {
            this.$store.commit("players/setData", data);
        });

        this.socket.on("wheelUpdate", (data) => {
            this.$store.commit("wheel/setOptions", data);
        })

        this.socket.emit("getCurrentScene", data => {
            if (VALID_SCENES.includes(data)) {
                this.currentScene = data;
            }
        })

        this.socket.on("changeScene", data => {
            if (VALID_SCENES.includes(data)) {
                this.currentScene = data;
            }
        })

        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {/* */});
        }
        else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen().catch(() => {/* */});
        }
        else if (elem.msRequestFullscreen) { /* IE11 */
            el.msRequestFullscreen().catch(() => {/* */});
        }
    },
    components: { Base, Points, Wheel }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>