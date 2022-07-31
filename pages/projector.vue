<template>
    <v-container 
        fluid 
        style="background-color: black;" 
        class="fill-height">
        <v-slide-y-transition mode="out-in">
            <component 
                v-bind:is="currentDisplay"
                @mounted="sendHotkeyData"
                :style="`transform: rotateY(${keystone}deg); transform-style: preserve-3d`"
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
import Countdown from "~/components/projector/Countdown.vue"
import GameName from "~/components/projector/scenes/GameName.vue"
import GuessThatFish from "~/components/projector/games/GuessThatFish.vue"
import ChristianBellorKristenBell from '~/components/projector/games/ChristianKristen.vue'
import Landlords3Things from "~/components/projector/games/Landlords3Things.vue"

const KNOWN_SCENES = [
    "Base", 
    "Points", 
    "Blank",
    "StandOnTime",
    "NameThatSound",
    "Countdown",
    "GameName",
    "GuessThatFish",
    "ChristianBellorKristenBell",
    "Landlord's3Things"
];

import vueInsomnia from "vue-insomnia";
export default {
    data() {
        return {
            currentDisplay: "Blank",
            keystone: 0
        }
    },
    head: {
        link: [
            {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Bebas+Neue"}
        ]
    },  
    async created() {
        //Socket vuex bindings
        this.$root.socket = this.$nuxtSocket({withCredentials: true})
        this.$root.socket.emit("joinQueryRoom", "projector")

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
            let displays = await this.$root.socket.emitP("getActiveDisplays");
            if (displays != undefined && typeof displays.current === "string") {
                const current = displays.current.replace(/ /g, "");
                if (KNOWN_SCENES.includes(current)) {
                    this.currentDisplay = current;
                }
            }
        } catch (e) {
            //
        }

        try {
            let keystone = await this.$root.socket.emitP("getKeystone");
            if (typeof keystone === "number") {
                this.keystone = keystone;
            }
        } catch (e) {
            //
        }

        this.$root.socket.on("keystoneUpdate", val => {
            if (typeof val === "number") {
                this.keystone = val;
            }
        })

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
            if (data != undefined && typeof data.current === "string") {
                const current = data.current.replace(/ /g, "");
                if (KNOWN_SCENES.includes(current)) {
                    this.currentDisplay = current;
                }
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
                 //don't need to remove spaces as it's never saved w/ spaces
                if (savedEventData != undefined) {
                    this.$nuxt.$emit("displayEventSavedData", savedEventData)
                }
            } catch(e) {
                //
            }
        }
    },

    components: { Base, Points, Blank, StandOnTime, NameThatSound, Countdown, GameName, GuessThatFish, ChristianBellorKristenBell, "Landlord's3Things": Landlords3Things}
}
</script>