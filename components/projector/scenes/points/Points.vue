<template>
    <v-container class="fill-height maxme">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title style="justify-content: center;">
                        {{teams[0].teamName ?? "Team 1"}}
                    </v-card-title>
                    <v-row style="justify-content: center;">
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
                    </v-row>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title style="justify-content: center;">
                        {{teams[1].teamName ?? "Team 2"}}
                    </v-card-title>
                    <v-row style="justify-content: center;">
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
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.maxme {
    height: 100vh;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
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