<template>
    <div class="point-module">
    <v-btn @click="$parent.pointsModify(playerIndex, teamIndex, 1)" width="100%" color="success" location="top center">+</v-btn>
    <div class="player-info">
        <p class="player-name">{{name}}</p>
        <p class="player-points">{{points}}</p>
    </div>
    <v-btn @click="$parent.pointsModify(playerIndex, teamIndex, -1)" width="100%" location="bottom center" color="error">-</v-btn>

    </div>
</template>

<script>
export default {
    props: ["name", "points", "teamIndex", "playerIndex"],
}
</script>

<style scoped>
.player-info {
    text-align: center;
    overflow: scroll;
}

.player-name {
    overflow: scroll;
}

.point-module {
    margin: 5px;
    padding: 3px;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 90px;
}
</style>