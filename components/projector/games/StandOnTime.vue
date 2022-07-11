<template>
    <h1 class="game-header">Stand On Time</h1>

    <div class="timer-container">
        <div class="team-container">
            <Timer/>
            <Timer/>
            <Timer/>
        </div>

        <div class="spacer"></div>

        <div class="team-container">
            <Timer/>
            <Timer/>
            <Timer/>
        </div>
    </div>
</template>

<style scoped>
.game-header {
    text-align: center;
    font-size: xx-large;
}

.timer-container {
    display: flex;
}

.team-container {
    display: flex;
}

.spacer {
    flex-grow: 1;
}
</style>

<script>
import Timer from "./SOT/Timer.vue"

export default {
    components: {Timer},

    
}
</script>
