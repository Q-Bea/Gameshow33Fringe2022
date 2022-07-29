<!-- This hotkey section is a list of all game names in the show -->
<!-- 
    This way, non-tech games have a nice stylized banner,
    But also, games that have something more don't need to make space for a name and distract from what is actually going on
-->
<template>
    <v-row>
        <ButtonEmitter
            v-for="game in techGames"
            :key="game"
            eventName="setGameName"
            colour="cyan accent-4"
            :dataValue="game"
        >
        <div class="text-center">
            <p>Show:</p>
            <p>{{game}}</p>
        </div>
        </ButtonEmitter>

        <ButtonEmitter
            v-for="game in noTechGames"
            :key="game"
            eventName="setGameName"
            colour="purple lighten-1"
            :dataValue="game"
        >
        <div class="text-center">
            <p>Show:</p>
            <p>{{game}}</p>
        </div>
        </ButtonEmitter>

        <ButtonEmitter
            label="Blackout"
            eventName="blackout"
            colour="red darken-2"
        />

        <ButtonEmitter
            v-for="sound in knownSounds"
            :key="sound"
            colour="blue-grey lighten-1"
            eventName="playSound"
            :dataValue="sound"
        >
        <div class="text-center">
            <p>Play Sound:</p>
            <p>{{sound}}</p>
        </div>
        </ButtonEmitter>


    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue';
export default {
    data() {
        return {
            techGames: [],
            noTechGames: [],
            knownSounds: []
        };
    },
    created() {
        const games = this.$store.state.games;
        if (games) {
            if (Array.isArray(games.tech)) {
                this.techGames = games.tech;
            }
            if (Array.isArray(games.noTech)) {
                this.noTechGames = games.noTech;
            }
        }
        this.$emit("mounted");
    },
    async fetch() {
        try {
            this.knownSounds = (await this.$axios.$get("/api/getDisplayAssetNames/scenes/GameName/sounds")).names
        } catch(e) {
            //Oh well FIXME??
        }    
    },
    components: { ButtonEmitter }
}
</script>