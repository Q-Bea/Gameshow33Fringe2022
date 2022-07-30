<template>
    <v-col style="padding-left: 30px">
    <h2 
        class="team-header"
    >{{teamName ?? ""}}</h2>
    <v-row justify="center">
        <div class="point-module">
            <v-container fluid>
                <v-row justify="space-between">
                    <v-btn @click="pointsModify(1)" width="60%" color="success">+</v-btn>
                    <v-btn @click="pointsModify(0.5)" color="success darken-1">+0.5</v-btn>
                </v-row>
            </v-container>                <v-container class="team-info">
                    <v-row justify="center">
                        <span 
                            class="player-name"
                            v-for="name in players"
                            :key="name"
                        >{{name}}</span>
                    </v-row>
                        <br/>
                        <p class="team-points">{{points}}</p>
                </v-container>
            <v-container fluid>
                <v-row justify="space-between">
                    <v-btn @click="pointsModify(-1)" width="60%" color="error">-</v-btn>
                    <v-btn @click="pointsModify(-0.5)" color="error darken-1">-0.5</v-btn>
                </v-row>
            </v-container>
        </div>
    </v-row>
</v-col>
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
    min-width: 200px;
    max-width: 300px;
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
    props: ["teamName", "players", "points", "teamIndex"],

    methods: {
        pointsModify(points) {
            if (typeof this.teamIndex !== "number") return;
            this.$root.socket.emit("addPlayerPoints", {
                teamIndex: this.teamIndex,
                points: points
            })
        }
    }
}
</script>