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
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-row style="margin-bottom: 10px;">
                        <v-card style="width: 40%;">
                            <v-card-title>Status</v-card-title>
                            <Status/>
                        </v-card>
                    </v-row>

                    <v-row style="margin-bottom: 10px;">
                        <v-col>
                            <v-row style="margin-bottom: 5px;">
                                <v-card style="width: 50%;">
                                    <v-card-title>Scenes</v-card-title>
                                    <Scenes/>
                                </v-card>

                                <v-card style="width: 50%;">
                                    <v-card-title>Games</v-card-title>
                                    <Games/>
                                </v-card>
                            </v-row>

                            <v-row justify="center">
                                <v-card
                                    style="transform: translateY(-25px);"
                                >
                                    <v-btn
                                        color="success"
                                        height="50"
                                        :disabled="pending == undefined || pending.length == 0"
                                        @click="setCurrent"
                                    >
                                        Transition
                                    </v-btn>
                                </v-card>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-card style="width: 100%;">
                            <v-card-title>Display Hotkeys</v-card-title>
                            <Hotkeys/>
                        </v-card>
                    </v-row>
                </v-col>
            </v-row>

        </v-container>

        <ScoreContainer/>
    </v-container>
</template>

<script>
import ScoreContainer from '@/components/control/ScoreContainer.vue'
import Status from '~/components/control/panels/Status.vue'
import Scenes from '~/components/control/panels/Scenes.vue'
import Games from '~/components/control/panels/Games.vue'
import Hotkeys from '~/components/control/panels/Hotkeys.vue'
export default {
    middleware: 'auth',
    head: {
        title: "Controller"
    },
    computed: {
        pending() {
            return this.$store.state.display.pending;
        },
        current() {
            return this.$store.state.display.current;
        }
    }, 
    data() {
        return {
            dialog: false,
            connected: undefined
        }
    },
    created() {
        this.$root.socket = this.$nuxtSocket({
            withCredentials: true
        })

        this.$root.socket.emit("getActiveDisplays", display => {
            this.$store.commit("display/set", display)
        })

        this.$root.socket.on("activeDisplaysUpdate", display => {
            this.$store.commit("display/set", display)
        })

        this.$root.socket.emit("getGamesInUse", data => {
            this.$store.commit("games/set", data);
        })

        this.$root.socket.on("gamesInUseUpdate", data => {
            this.$store.commit("games/set", data);
        })

        this.$root.socket.on("connect", () => {
            this.connected = true;
        })

        this.$root.socket.io.engine.on("close", () => {
            this.connected = false;
        })
    },
    methods: {
        setCurrent() {
            if (this.pending === this.current) return;

            this.$root.socket.emit("setActiveDisplays", {
                current: this.pending,
                pending: this.current
            })
        }
    },

    components: { ScoreContainer, Status, Scenes, Games, Hotkeys }
}
</script>