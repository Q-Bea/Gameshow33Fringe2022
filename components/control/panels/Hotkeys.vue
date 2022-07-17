<template>
    <v-container fluid>
        <v-slide-x-transition>
            <component 
                :is="KNOWN_SCENES.includes(currentScene) ? currentScene : 'Base'"
            />
        </v-slide-x-transition>
    </v-container>
</template>

<script>
import Wheel from "./hotkeys/Wheel.vue"
import ButtonEmitter from "./hotkeys/generic/ButtonEmitter.vue"

export default {
    components: { Wheel, ButtonEmitter },
    computed: {
        currentScene() {
            return this.$store.state.display.current
        }
    },

    data() {
        return {
            KNOWN_SCENES: ["Wheel"]
        }
    },

    created() {
        this.$root.socket.emit("getWheelOptions", data => {
            this.$store.commit("wheel/setOptions", data);
        })

        this.$root.socket.on("wheelUpdate", data => {
            this.$store.commit("wheel/setOptions", data);
        })
    }
}
</script>