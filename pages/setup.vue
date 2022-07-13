<template>
    <div class="setup-page">
        <v-slide-y-transition>
            <v-alert
                icon="mdi-connection"
                color="red lighten-1"
                v-if="connected === false"
                width="100%"
                style="position: fixed; z-index: 1001; left:0; bottom: 50%"
            >Websocket Disconnected! If this message persists, please refresh your browser</v-alert>
        </v-slide-y-transition>

        <h1>Setup</h1>
        <br/>

        <v-container fluid>
            <v-row>
                <Players style="width: 400px;" />
                <Wheel style="width: 400px;"/>
                <Games style="width: 400px;"/>
            </v-row>
        </v-container>

        <v-btn
            fixed
            bottom
            right
            color="primary"
            to="/control"
        >
            Go To Control
        </v-btn>
    </div>
</template>

<script>
import Players from "~/components/setup/Players.vue";
import Wheel from "~/components/setup/Wheel.vue";
import Games from "~/components/setup/Games.vue";
export default {
    middleware: 'auth',
    data() {
        return {
            connected: undefined
        }
    },
    created() {
        this.socket = this.$nuxtSocket({ withCredentials: true });

        this.socket.on("connect", () => {
            this.connected = true;
        })

        this.socket.io.engine.on("close", () => {
            this.connected = false;
        })
    },
    
    components: { Players, Wheel, Games }
}
</script>