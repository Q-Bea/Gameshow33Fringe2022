<template>
    <v-container fluid>
        <WebsocketDisconnect/>
        <ProjectorDisconnected/>

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

                            <v-row justify="center">
                                <v-btn
                                    relative
                                    height="50"
                                    color="red darken-2"
                                    dark
                                    @click="flashClock"
                                >
                                    <v-icon>mdi-alert-octagram</v-icon>Flash Clock
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-card style="width: 100%;">
                            <v-card-title>
                                Display Hotkeys
                                <v-btn
                                    @click="hideHotkeys = !hideHotkeys"
                                    right
                                    absolute
                                    plain
                                >
                                    {{hideHotkeys ? "Show": "Hide"}}
                                </v-btn>
                            </v-card-title>
                            <Hotkeys
                                v-if="!hideHotkeys"
                            />
                        </v-card>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <ScoreContainer/>
    </v-container>
</template>

<style>
* {
    touch-action: manipulation;
}
</style>

<script>
import ScoreContainer from '@/components/control/ScoreContainer.vue'
import Status from '~/components/control/panels/Status.vue'
import Scenes from '~/components/control/panels/Scenes.vue'
import Games from '~/components/control/panels/Games.vue'
import Hotkeys from '~/components/control/panels/Hotkeys.vue'
import WebsocketDisconnect from '~/components/control/WebsocketDisconnect.vue'
import ProjectorDisconnected from '~/components/control/ProjectorDisconnected.vue'
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
            connected: undefined,
            hideHotkeys: false
        }
    },
    async created() {
        this.$root.socket = this.$nuxtSocket({
            withCredentials: true
        })

        try {
            const displays = await this.$root.socket.emitP("getActiveDisplays");
            if (displays != undefined) {
                this.$store.commit("display/set", displays)
            }
        } catch (e) {
            //
        }

        try {
            const games = await this.$root.socket.emitP("getGamesInUse");
            this.$store.commit("games/set", games);
        } catch(e) {
            //
        }

        this.$root.socket.on("activeDisplaysUpdate", display => {
            if (display != undefined) {
                this.$store.commit("display/set", display)
            }
        })

        this.$root.socket.on("gamesInUseUpdate", data => {
            this.$store.commit("games/set", data);
        })
    },
    methods: {
        setCurrent() {
            if (this.pending === this.current) return;

            this.$root.socket.emit("setActiveDisplays", {
                current: this.pending,
                pending: this.current
            })
        },

        flashClock() {
            this.$root.socket.emit("flashClock")
        }
    },

    components: { ScoreContainer, Status, Scenes, Games, Hotkeys, WebsocketDisconnect, ProjectorDisconnected }
}
</script>