<template>
    <v-container fluid>
        <v-slide-x-transition mode="out-in">
            <component
                v-if="KNOWN_DISPLAYS.includes(currentScene)"
                :is="currentScene"
            />

            <v-alert
                v-else
                color="blue darken-2"
                outlined
                class="text-center"
            >
            No Hotkeys for this scene
            </v-alert>
        </v-slide-x-transition>
    </v-container>
</template>

<script>
import Wheel from "./hotkeys/Wheel.vue"
import StandOnTime from "./hotkeys/StandOnTime.vue"

export default {
    components: { Wheel, StandOnTime },
    computed: {
        currentScene() {
            return this.$store.state.display.current
        }
    },

    data() {
        return {
            KNOWN_DISPLAYS: ["Wheel", "StandOnTime"]
        }
    },

    async created() {
        try {
            const options = await this.$root.socket.emitP("getWheelOptions");
    
            if (Array.isArray(options)) {
                this.$store.commit("wheel/setOptions", data);
            }
        } catch(e) {
            //
        }

        this.$root.socket.on("wheelUpdate", data => {
            if (Array.isArray(data)) {
                this.$store.commit("wheel/setOptions", data);
            }
        })
    }
}
</script>