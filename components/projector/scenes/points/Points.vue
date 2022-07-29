<template>
    <v-row justify="center" align="center" class="point-row fill-height">
        <PointModule
            v-if="teams[0]"
            :teamName="teams[0].teamName"
            :points="teams[0].points"
            :players="teams[0].players"
        />
        <PointModule
            v-if="teams[1]"
            :teamName="teams[1].teamName"
            :points="teams[1].points"
            :players="teams[1].players"
        />
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
    computed: {
        teams() {
            return this.$store.state.teams.data;
        }
    },
    
    components: { PointModule, PointModule, PointModule }
}
</script>