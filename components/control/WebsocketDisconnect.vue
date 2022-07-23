<template>
    <v-slide-y-transition>
        <v-overlay
            v-if="connected === false"
        >
            <v-alert
                icon="mdi-connection"
                color="red accent-1"
                width="100%"
                elevation="3"
                light
            >
            Websocket Disconnected! If this message persists, please refresh your browser
            </v-alert>
        </v-overlay>
    </v-slide-y-transition>
</template>

<script>
export default {
    data() {
        return {
            connected: undefined
        };
    },

    created() {
        this.$root.socket.on("connect", () => {
            this.connected = true;
        });

        this.$root.socket.io.engine.on("close", () => {
            this.connected = false;
        });
    }
}
</script>