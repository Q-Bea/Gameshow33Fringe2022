<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <component 
                v-bind:is="currentDisplay"
                @mounted="sendHotkeyData"
            />
        </v-slide-y-transition>
    </v-container>
</template>

<script>
import Base from "@/components/projector/Base.vue"
import Points from "@/components/projector/scenes/points/Points.vue"
import Blank from "@/components/projector/Blank.vue"
import StandOnTime from "~/components/projector/games/StandOnTime.vue"
import NameThatSound from "~/components/projector/games/NameThatSound.vue"

const KNOWN_SCENES = [
    "Base", 
    "Points", 
    "Blank",
    "StandOnTime",
    "NameThatSound"
];

export default {
    data() {
        return {
            currentDisplay: "Base",
        }
    },
    async created() {
        //Socket vuex bindings
        this.$root.socket = this.$nuxtSocket({withCredentials: true})

        try {
            const teamData = await this.$root.socket.emitP("getTeamsData");
            if (Array.isArray(teamData)) {
                this.$store.commit("teams/setData", teamData);
            }
        } catch (e) {
            //
        }

        try {
            const options = await this.$root.socket.emitP("getWheelOptions");
            if (Array.isArray(options)) {
                this.$store.commit("wheel/setOptions", options);
            }
        } catch (e) {
            //
        }

        try {
            const displays = await this.$root.socket.emitP("getActiveDisplays");
            if (displays != undefined && KNOWN_SCENES.includes(displays.current)) {
                this.currentDisplay = displays.current;
            }
        } catch (e) {
            //
        }

        //Synchronize on initial hydration, as well as on scene change (above)
        try {
            const savedEventData = await this.$root.socket.emitP("getSavedDisplayEventData", this.currentDisplay);
            if (savedEventData != undefined) {
                this.$nuxt.$emit("displayEventSavedData", savedEventData)
            }
        } catch(e) {
            //
        }

                this.$root.socket.on("teamsUpdate", (data) => {
            if (Array.isArray(data)) {
                this.$store.commit("teams/setData", data);
            }
        });

        this.$root.socket.on("wheelUpdate", (data) => {
            if (Array.isArray(data))
            this.$store.commit("wheel/setOptions", data);
        })

        this.$root.socket.on("activeDisplaysUpdate", data => {
            if (data != undefined && KNOWN_SCENES.includes(data.current)) {
                this.currentDisplay = data.current;
            }
        })

        this.$root.socket.on("displayEvent", data => {
            if (data != undefined) {
                this.$nuxt.$emit("displayEvent", data);
            }
        })
    },

    mounted() {
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {/* */});
        }
        else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen().catch(() => {/* */});
        }
    },

    methods: {
        async sendHotkeyData() {
            //Child loading takes a non-deterministic amount of time because it is a dynamic component
            //So to ensure it gets information when it's ready, the component has to emit
            try {
                const savedEventData = await this.$root.socket.emitP("getSavedDisplayEventData", this.currentDisplay);
                if (savedEventData != undefined) {
                    this.$nuxt.$emit("displayEventSavedData", savedEventData)
                }
            } catch(e) {
            }
        }
    },

    components: { Base, Points, Blank, StandOnTime, NameThatSound }
}
</script>