<template>
    <v-container>
        <v-row>
            <v-col style="padding-right: 30px">
                <h2 
                    class="team-header"
                    v-if="teams[0] != undefined"
                >{{teams[0]?.teamName ?? "Team 1"}}</h2>
                <v-row justify="center">
                    <div class="point-module">
                        <v-btn @click="pointsModify(0, 1)" width="100%" color="success" location="top center">+</v-btn>
                            <v-container class="team-info">
                                <v-row justify="center">
                                    <span 
                                        class="player-name"
                                        v-for="name in teams[0]?.players"
                                        :key="name"
                                    >{{name}}</span>
                                </v-row>
                                <br/>
                                <p class="team-points">{{teams[0]?.points}}</p>
                            </v-container>
                        <v-btn @click="pointsModify(0, -1)" width="100%" location="bottom center" color="error">-</v-btn>
                    </div>
                </v-row>
            </v-col>

            <v-col style="padding-left: 30px">
                <h2 
                    class="team-header"
                    v-if="teams[1] != undefined"
                >{{teams[1]?.teamName ?? "Team 2"}}</h2>
                <v-row justify="center">
                    <div class="point-module">
                        <v-btn @click="pointsModify(1, 1)" width="100%" color="success" location="top center">+</v-btn>
                            <v-container class="team-info">
                                <v-row justify="center">
                                    <span 
                                        class="player-name"
                                        v-for="name in teams[1]?.players"
                                        :key="name"
                                    >{{name}}</span>
                                </v-row>
                                    <br/>
                                    <p class="team-points">{{teams[1]?.points}}</p>
                            </v-container>
                        <v-btn @click="pointsModify(1, -1)" width="100%" location="bottom center" color="error">-</v-btn>
                    </div>
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

.point-module {
    margin: 5px;
    padding: 3px;
    border: 1px solid lightgray;
    border-radius: 3px;
    min-width: 150px;
    max-width: 250px;
}

.team-info {
    text-align: center;
    overflow: auto;
    overflow-y: hidden;
}

.player-name {
    overflow: auto;
    white-space: nowrap;
    overflow-y: hidden;
    padding: 5px
}
</style>

<script>
export default {
    data: () => {
        return {
            teams: []
        };
    },
    async created() {
        try {
            const teamData = await this.$root.socket.emitP("getTeamsData");
            if (Array.isArray(teamData)) {
                this.teams = teamData;
            }
        } catch(e) {
            //
        }

        this.$root.socket.on("teamsUpdate", (data) => {
            if (Array.isArray(data)) {
                this.teams = data;
            }
        });
    },
    methods: {
        pointsModify(teamIndex, points) {
            this.$root.socket.emit("addPlayerPoints", {
                teamIndex: teamIndex,
                points: points
            })
        }
    }
}
</script>
