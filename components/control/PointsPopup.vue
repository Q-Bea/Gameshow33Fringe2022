<template>
    <v-container>
        <v-row>
            <!-- Team1 -->
            <v-col style="padding-right: 30px">
                <h2 class="team-header">Team 1</h2>
                <v-row justify="center">
                    <PointModule 
                        v-for="player in playerData.team1" 
                        :key="player.name" 
                        :name="player.name"
                        :points="player.points"
                        teamName="team1"/>
                </v-row>
            </v-col>

            <!-- Team2 -->
            <v-col style="padding-left: 30px">
                <h2 class="team-header">Team 2</h2>
                <v-row justify="center">
                    <PointModule 
                        v-for="player in playerData.team2" 
                        :key="player.name" 
                        :name="player.name"
                        :points="player.points"
                        teamName="team2"/>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.team-header {
    text-align: center;
    margin-bottom: 1rem;
}
</style>

<script>
import PointModule from './PointModule.vue'
export default {
    data: () => {
        return {
            playerData: {
                team1: [],
                team2: []
            }
        };
    },
    beforeMount() {
        this.socket = this.$nuxtSocket({withCredentials: true});

        this.socket.emit("getPlayerData", (data) => {
            if (data.team1) {
                this.playerData.team1 = data.team1;
            }

            if (data.team2) {
                this.playerData.team2 = data.team2;
            }
        })

        this.socket.on("playersUpdate", (data) => {
            this.playerData = data;
        });
    },
    methods: {
        pointsModify(player, team, points) {
            this.socket.emit("addPoints", {
                playerName: player,
                teamName: team,
                points: points
            })
        }
    },
    components: { PointModule }
}
</script>
