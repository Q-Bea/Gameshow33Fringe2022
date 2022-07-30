<!--         :style="`opacity: ${vis === false ? '0' : '1.0'}`" -->
<template>
    <v-card 
        height="45vh" 
        width="55vh"
        elevation="20"
        :class="`point-module${vis ? '' : ' hide'}`"
    >
        <v-card-title style="justify-content: center; font-size: 50px; white-space: nowrap;">
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
                <p :class="`text-center points-text ${vis ? '' : 'point-hide'}`" style="z-index: 0;">{{points}}</p>
            </v-container>
        </v-row>
    </v-card>
</template>

<style scoped>
.team-info {
    text-align: center;
    overflow: hidden;
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
    transition: font-size 1s ease-in-out 0.5s;
}

.point-hide {
    font-size: 0 !important;
}

.point-module {
    padding-left: 30px; 
    padding-right: 30px;
    margin-left: 2rem;
    margin-right: 2rem;
    background-color: rgb(245, 250, 255);
    transition: height 1s ease-in-out 0.5s, width 1s ease-in-out 0.5s, padding 1s ease-in-out 0.5s, margin 1s ease-in-out 0.5s;
    overflow: hidden;
}

.hide {
    padding-left: 0px !important;
    padding-right: 0px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    height: 0 !important;
    width: 0 !important;
}
</style>

<script>
export default {
    props: ['teamName', 'points', "players", "vis"]
}
</script>