<template>
    <v-container fluid>
        <h1>G33 Control Panel</h1>

        <v-container fluid>
            <v-row>
                <v-col>
                    <v-row>
                        <v-card style="width: 30%;">
                            <v-card-title>Status</v-card-title>
                            <Status/>
                        </v-card>
                    </v-row>

                    <v-row>
                        <v-card style="width: 50%;">
                            <v-card-title>Scenes</v-card-title>

                        </v-card>

                        <v-card style="width: 50%;">
                            <v-card-title>Games</v-card-title>
                        </v-card>
                    </v-row>

                    <v-row>
                        <v-card style="width: 100%;">
                            <v-card-title>Hotkeys</v-card-title>
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
export default {
    middleware: 'auth',
    data() {
        return {
            availableGames: ["Base", "StandOnTime", "Demo2"],
            dialog: false
        }
    },
    mounted() {
        this.socket = this.$nuxtSocket({
            withCredentials: true
        })

        this.socket.on("test", (data) => {
            console.log(data)
        })
    },
    methods: {
        changeGame(gameName) {
            this.socket.emit("changeGame", gameName)
            return;
        },

        test() {
            this.socket.emit("test", "t");
        }
    },

    components: { ScoreContainer, Status }
}
</script>