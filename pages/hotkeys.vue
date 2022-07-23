<template>
    <v-container fluid>
        <WebsocketDisconnect/>


        <br/>

        <h1 class="text-center">Hotkeys</h1>
        <v-container style="width: max-content;">
            <v-card>
                <Status/>
            </v-card>
        </v-container>

        <Hotkeys/>

        <ScoreContainer/>
    </v-container>
</template>
<script>
import Hotkeys from "../components/control/panels/Hotkeys.vue";
import Status from "~/components/control/panels/Status.vue"
import ScoreContainer from "~/components/control/ScoreContainer.vue";
import WebsocketDisconnect from "~/components/control/WebsocketDisconnect.vue";
export default {
    middleware: "auth",
    computed: {
        currentScene() {
            return this.$store.state.display.current;
        }
    },

    async created() {
        this.$root.socket = this.$nuxtSocket({
            withCredentials: true
        });

        try {
            const displays = await this.$root.socket.emitP("getActiveDisplays");
            if (displays !== undefined) {
                this.$store.commit("display/set", displays);
            }
        } catch(e) {
            //
        }
        
        this.$root.socket.on("activeDisplaysUpdate", display => {
            if (display !== undefined) {
                this.$store.commit("display/set", display);
            }
        });
    },
    components: { Status, Hotkeys, ScoreContainer, WebsocketDisconnect }
}
</script>
