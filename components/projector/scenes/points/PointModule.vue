<template>
    <v-card 
        height="45vh" 
        width="55vh"
        elevation="20"
        class="point-module"
    >
        <v-card-title style="justify-content: center; font-size: 50px;;">
            {{teamName ?? ""}}
        </v-card-title>
        <v-row style="justify-content: center;">
            <v-container class="team-info">
                <v-row justify="center">
                    <v-chip-group>
                        <v-chip 
                            class="player-name"
                            v-for="name in players"
                            :key="name"

                            :ripple="false"
                            outlined
                        >{{name}}</v-chip>
                    </v-chip-group>

                </v-row>
                <br/>
                <p class="text-center points-text">{{points}}</p>
            </v-container>
        </v-row>
    </v-card>
</template>

<style scoped>
.team-info {
    text-align: center;
    overflow: auto;
    overflow-y: hidden;
    margin-top: 5%;
}

.player-name {
    overflow: auto;
    white-space: nowrap;
    overflow-y: hidden;
    padding-left: 10px;
    padding-right: 10px;
    font-size: x-large;
}

.points-text {
    font-size: 100px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5%;
    font-family: 'Bebas_Neue';
}

.point-module {
    padding-left: 30px; 
    padding-right: 30px;
    margin-left: 3rem;
    margin-right: 3rem;
    background-color: rgb(245, 250, 255);
}
</style>

<script>
export default {
    props: ['teamName', 'points', "players"]
}
</script>