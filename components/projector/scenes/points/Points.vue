<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title style="justify-content: center;">
                        Team 1
                    </v-card-title>
                    <v-row style="justify-content: center;">
                        <PointModule
                            v-for="player in playerData.team1"
                            :key="player.name"
                            :name="player.name"
                            :points="player.points"
                            teamName="team1"
                            class="point-module"
                        ></PointModule>
                    </v-row>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title style="justify-content: center;">
                        Team 2
                    </v-card-title>
                    <v-row style="justify-content: center;">
                        <PointModule
                            v-for="player in playerData.team2"
                            :key="player.name"
                            :name="player.name"
                            :points="player.points"
                            class="point-module"
                            teamName="team2"
                        ></PointModule>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PointModule from './PointModule.vue'
export default {
    data() {
        return {
            playerData: {
                team1: [],
                team2: []
            }
        }
    },
    mounted() {
        const socket = this.$nuxtSocket({withCredentials: true});

        socket.emit("getPlayerData", (data) => {
            this.playerData = data;
        })

        socket.on("playersUpdate", (data) => {
            this.playerData = data;
        });
    },
    components: { PointModule }
}
</script>

<style>
.point-module {
    padding: 5px;
    text-align: center;
    border: 1px solid lightgrey;
    margin: 5px;
    border-radius: 3px;
    width: 90px;
}
</style>