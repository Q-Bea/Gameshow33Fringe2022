<template>
    <v-container>
        <v-row>
            <!-- Team1 -->
            <v-col style="padding-right: 30px">
                <h2 class="team-header">{{teams[0]?.teamName ?? "Team 1"}}</h2>
                <v-row justify="center">
                    <PointModule 
                        v-for="(player, index) in teams[0]?.players" 
                        :key="player.name" 
                        :name="player.name"
                        :points="player.points"
                        :teamIndex="0"
                        :playerIndex="index"/>
                </v-row>
            </v-col>

            <!-- Team2 -->
            <v-col style="padding-left: 30px">
                <h2 class="team-header">{{teams[1]?.teamName ?? "Team 2"}}</h2>
                <v-row justify="center">
                    <PointModule 
                        v-for="(player, index) in teams[1]?.players" 
                        :key="player.name + index" 
                        :name="player.name"
                        :points="player.points"
                        :teamIndex="1"
                        :playerIndex="index"/>
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
            teams: []
        };
    },
    created() {
        this.$root.socket.emit("getTeamsData", (data) => {
            this.teams = data;
        })

        this.$root.socket.on("teamsUpdate", (data) => {
            this.teams = data;
        });
    },
    methods: {
        pointsModify(playerIndex, teamIndex, points) {
            this.$root.socket.emit("addPlayerPoints", {
                playerIndex: playerIndex,
                teamIndex: teamIndex,
                points: points
            })
        }
    },
    components: { PointModule }
}
</script>
