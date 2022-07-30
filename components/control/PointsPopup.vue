<template>
    <v-container>
        <v-row>
            <PointsModule
                v-if="teams[0]"
                :players="teams[0].players"
                :points="teams[0].points"
                :teamIndex="0"
                :teamName="teams[0].teamName"
            />
            <PointsModule
                v-if="teams[1]"
                :players="teams[1].players"
                :points="teams[1].points"
                :teamIndex="1"
                :teamName="teams[1].teamName"
            />
        </v-row>
    </v-container>
</template>

<script>
import PointsModule from './PointsModule.vue';
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
        }
        catch (e) {
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
            });
        }
    },
    components: { PointsModule }
}
</script>
