<template>
    <v-container fluid>
        <v-slide-x-transition mode="out-in">
            <component
                v-if="KNOWN_DISPLAYS.includes(currentScene)"
                :is="currentScene"
                @mounted="sendHotkeyData"
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
import Wheel from "./hotkeys/Wheel.vue";
import StandOnTime from "./hotkeys/StandOnTime.vue";
import NameThatSound from "./hotkeys/NameThatSound.vue";
import GuessThatFish from "./hotkeys/GuessThatFish.vue";
import Countdown from "./hotkeys/Countdown.vue";
import GameName from "./hotkeys/GameName.vue";
import Blank from "./hotkeys/Blank.vue";
import Points from "./hotkeys/Points.vue";
import ChristianBellorKristenBell from "./hotkeys/ChristianKristen.vue";
import Landlords3Things from "./hotkeys/Landlords3Things.vue";
import SlapDicks from "./hotkeys/SlapDicks.vue";

export default {
    components: { Wheel, StandOnTime, NameThatSound, Countdown, GuessThatFish, GameName, Blank, Points, ChristianBellorKristenBell, Landlords3Things, SlapDicks},
    computed: {
        currentScene() {
            return this.$store.state.display.current.replace(/ |'/g, "")
        }
    },

    data() {
        return {
            KNOWN_DISPLAYS: [
                "Wheel", 
                "StandOnTime", 
                "NameThatSound", 
                "GuessThatFish",
                "Countdown",
                "GameName",
                "Blank",
                "Points",
                "ChristianBellorKristenBell",
                "Landlords3Things",
                "SlapDicks"
            ]
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

        this.$root.socket.on("displayEvent", data => {
            if (data != undefined) {
                this.$nuxt.$emit("displayEvent", data)
            }
        })
    },

    methods: {
        //FIXME: For some reason, this sends tons of emissions to the server (don't know why)
        async sendHotkeyData() {
            //Child loading takes a non-deterministic amount of time because it is a dynamic component
            //So to ensure it gets information when it's ready, the component has to emit
            try {
                const savedEventData = await this.$root.socket.emitP("getSavedDisplayEventData", this.currentScene);
                if (savedEventData != undefined) {
                    this.$nuxt.$emit("displayEventSavedData", savedEventData)
                }
            } catch(e) {
                //
            }
        }
    }
}
</script>