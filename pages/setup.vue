<template>
    <div class="setup-page">
        <WebsocketDisconnect/>

        <h1 class="text-center">Setup</h1>
        <br/>

        <v-container fluid>
            <v-row>
                <Teams style="width: 400px;"/>
                <!-- <Wheel style="width: 400px;"/> -->
                <Games style="width: 400px;"/>
                <!-- <Resets style="width: 400px;"/> -->
            </v-row>
        </v-container>

        <v-btn
            fixed
            bottom
            right
            color="purple darken-2"
            to="/control"
            dark
        >
            Go To Control
        </v-btn>
    </div>
</template>

<script>
import Teams from "~/components/setup/Teams.vue";
import Wheel from "~/components/setup/Wheel.vue";
import Games from "~/components/setup/Games.vue";
import WebsocketDisconnect from "~/components/control/WebsocketDisconnect.vue";
import Resets from "~/components/setup/Resets.vue";
export default {
    middleware: 'auth',
    head: {
        title: "Game Setup"
    },
    data() {
        return {
            connected: undefined
        }
    },
    created() {
        this.$root.socket = this.$nuxtSocket({ withCredentials: true });
    },
    
    components: { Teams, Wheel, Games, WebsocketDisconnect, Resets }
}
</script>