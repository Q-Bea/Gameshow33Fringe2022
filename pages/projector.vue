<template>
    <v-container fluid class="fill-height">
        <v-slide-y-transition mode="out-in">
            <component v-bind:is="currentDisplay"/>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
import Base from "@/components/projector/Base.vue"
import Points from "@/components/projector/scenes/points/Points.vue"
import Wheel from "@/components/projector/scenes/wheel/Wheel.vue"
import Blank from "@/components/projector/Blank.vue"
import StandOnTime from "~/components/projector/games/StandOnTime.vue"

const KNOWN_SCENES = [
    "Base", 
    "Points", 
    "Wheel", 
    "Blank",
    "StandOnTime"
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
            if (displays !== undefined && KNOWN_SCENES.includes(data.current)) {
                this.currentDisplay = data.current;
            }
        } catch (e) {
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
            if (data !== undefined && KNOWN_SCENES.includes(data.current)) {
                this.currentDisplay = data.current;
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
    components: { Base, Points, Wheel, Blank, StandOnTime }
}
</script>