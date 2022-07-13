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

const KNOWN_SCENES = ["Base", "Points", "Wheel", "Blank"];

export default {
    data() {
        return {
            currentDisplay: "Base",
        }
    },
    mounted() {
        //Socket vuex bindings
        this.$root.socket = this.$nuxtSocket({withCredentials: true})

        this.$root.socket.emit("getTeamsData", (data) => {
            this.$store.commit("teams/setData", data);
        })

        this.$root.socket.on("teamsUpdate", (data) => {
            this.$store.commit("teams/setData", data);
        });

        this.$root.socket.emit("getWheelOptions", (data) => {
            this.$store.commit("wheel/setOptions", data);
        })

        this.$root.socket.on("wheelUpdate", (data) => {
            this.$store.commit("wheel/setOptions", data);
        })

        this.$root.socket.emit("getActiveDisplays", data => {
            if (KNOWN_SCENES.includes(data.current)) {
                this.currentDisplay = data.current;
            }
        })

        this.$root.socket.on("activeDisplaysUpdate", data => {
            if (KNOWN_SCENES.includes(data.current)) {
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
    components: { Base, Points, Wheel, Blank }
}
</script>