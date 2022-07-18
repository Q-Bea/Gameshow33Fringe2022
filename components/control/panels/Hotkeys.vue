<template>
    <v-container fluid>
        <v-container style="width: max-content;">
            <v-card>
                <Status/>
            </v-card>
        </v-container>

        <br/>

        <v-slide-x-transition mode="out-in">
            <component 
                v-if="KNOWN_SCENES.includes(currentScene)"
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
import Status from "./Status.vue"

export default {
    components: { Wheel, StandOnTime, Status },
    computed: {
        currentScene() {
            return this.$store.state.display.current
        }
    },

    data() {
        return {
            KNOWN_SCENES: ["Wheel", "StandOnTime"]
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