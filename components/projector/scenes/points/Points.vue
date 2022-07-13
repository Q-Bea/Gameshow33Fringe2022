<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title style="justify-content: center;">
                        {{teams[0].teamName ?? "Team 1"}}
                    </v-card-title>
                    <v-row style="justify-content: center;">
                        <PointModule
                            v-for="player in teams[0]?.players"
                            :key="player.name"
                            :name="player.name"
                            :points="player.points"
                            :teamIndex="0"
                            class="point-module"
                        ></PointModule>
                    </v-row>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title style="justify-content: center;">
                        {{teams[1].teamName ?? "Team 2"}}
                    </v-card-title>
                    <v-row style="justify-content: center;">
                        <PointModule
                            v-for="player in teams[1]?.players"
                            :key="player.name"
                            :name="player.name"
                            :points="player.points"
                            class="point-module"
                            :teamIndex="1"
                        ></PointModule>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PointModule from './PointModule.vue'
export default {
    computed: {
        teams() {
            return this.$store.state.teams.data;
        }
    },
    components: { PointModule }
}
</script>

<style>
.point-module {
    padding: 5px;
    text-align: center;
    border: 1px solid lightgrey;
    margin: 5px;
    border-radius: 3px;
    width: 90px;
}
</style>