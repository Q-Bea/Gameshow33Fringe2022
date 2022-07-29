<template>
    <v-slide-x-reverse-transition mode="out-in">
        <v-chip 
            style="position: fixed; right: 1rem; z-index: 1001;"
            :color="colour"
            v-if="display"
        >
            <v-icon small>{{connected ? 'mdi-cast-connected' : 'mdi-connection'}}</v-icon>&nbsp;{{text}}
        </v-chip>
    </v-slide-x-reverse-transition>
</template>

<script>
export default {
    data() {
        return {
            connected: undefined,
            display: true
        }
    },
    computed: {
        text() {
            switch(this.connected ?? undefined) {
                case true:
                    return "Projector Online!"

                case false:
                    return "Projector Disconnected!"

                default:
                    return "Projector Status Unknown!"
            }
        },

        colour() {
            switch(this.connected) {
                case true:
                    return "success darken-1"

                case false:
                    return "error darken-1"

                default:
                    return "warning darken-1"
            }
        }
    },
    mounted() {
        //This is a periodic checker (because the server doesn't have access to the disconnect event)
        //so every few seconds, ask the io server to lookup if a projector client is connected
        this.projectorQuery()
    },

    methods: {
        async projectorQuery() {
            try {
                const connected = await this.$root.socket.emitP("projectorConnected");
                
                this.connected = connected;

                if (connected === true) {
                    setTimeout(() => {
                        this.display = false;
                    }, 5000)
                } else {
                    this.display = true;
                }
            } catch(e) {
                //
            }

            setTimeout(() => {
                this.projectorQuery();
            }, 5000)
        }
    }
}
</script>