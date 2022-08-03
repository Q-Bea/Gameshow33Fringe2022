<template>
    <div class="setup-page">
        <WebsocketDisconnect/>

        <h1 class="text-center">Setup</h1>
        <br/>

        <v-container fluid>
            <v-row justify="center">
                <Teams style="width: 400px;"/>
                <Games style="width: 400px;"/>
                <ValidGames style="width: 600px"/>
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
import Games from "~/components/setup/Games.vue";
import WebsocketDisconnect from "~/components/control/WebsocketDisconnect.vue";
import Keystone from "~/components/setup/Keystone.vue";
import ValidGames from "~/components/setup/ValidGames.vue";
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
    
    components: { Teams, Games, WebsocketDisconnect, Keystone, ValidGames }
}
</script>