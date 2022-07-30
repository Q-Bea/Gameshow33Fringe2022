<template>
    <v-row justify="center" align="center" class="point-row fill-height">
        <PointModule
            v-if="teams[0]"
            :teamName="teams[0].teamName"
            :points="teams[0].points"
            :players="teams[0].players"
            :vis="team1Vis"
        />
        <v-fade-transition>
            <PointModule
                v-if="teams[1]"
                :teamName="teams[1].teamName"
                :points="teams[1].points"
                :players="teams[1].players"
                :vis="team2Vis"
            />
        </v-fade-transition>
    </v-row>
</template>

<style scoped>
.point-row {
    background: linear-gradient(135deg, #e0b11c 0%, #6c6d8b 40%, #6c6d8b 60%, #e32a0b 100%);
    height: 100vh; 
}
</style>

<script>
import PointModule from './PointModule.vue'
export default {
    data() {
        return {
            team1Vis: true,
            team2Vis: true
        }
    },
    computed: {
        teams() {
            return this.$store.state.teams.data;
        }
    },

    created() {
        this.$nuxt.$on("displayEvent", data => {
            if (
                data != undefined && 
                data.eventName === "victory" &&
                typeof data.value === "number"
            ) {
                if (data.value === 0) this.team2Vis = !this.team2Vis;
                else this.team1Vis = !this.team1Vis
            }
        })
    },
    
    components: { PointModule }
}
</script>