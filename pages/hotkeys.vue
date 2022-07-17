<template>
    <v-container fluid>
        <v-slide-y-transition>
            <v-alert
                icon="mdi-connection"
                color="red lighten-1"
                v-if="connected === false"
                width="100%"
                style="position: fixed; z-index: 1001; left: 0; bottom:50%"
            >Websocket Disconnected! If this message persists, please refresh your browser</v-alert>
        </v-slide-y-transition>

        <h1 class="text-center">Hotkeys</h1>

        <Hotkeys/>

        <ScoreContainer/>
    </v-container>
</template>
<script>
import Hotkeys from "../components/control/panels/Hotkeys.vue";
import ScoreContainer from "~/components/control/ScoreContainer.vue";
export default {
    middleware: "auth",
    computed: {
        currentScene() {
            return this.$store.state.display.current;
        }
    },
    data() {
        return {
            connected: undefined
        };
    },
    created() {
        this.$root.socket = this.$nuxtSocket({
            withCredentials: true
        });
        
        this.$root.socket.emit("getActiveDisplays", display => {
            this.$store.commit("display/set", display);
        });

        this.$root.socket.on("activeDisplaysUpdate", display => {
            this.$store.commit("display/set", display);
        });

        this.$root.socket.on("connect", () => {
            this.connected = true;
        });

        this.$root.socket.io.engine.on("close", () => {
            this.connected = false;
        });
    },
    components: { Hotkeys, ScoreContainer }
}
</script>
