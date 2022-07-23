<template>
    <v-row>
        <ButtonToggleEmitter
            dataKey="timerToggle"
            name="timerToggle"
            :isActive="eventData?.timerToggle ?? false"
        >
            <template v-slot:active>
                <p class="text-center">
                    Timer Running<br/><br/>Click to Pause
                </p>
            </template>

            <template v-slot:inactive>
                <p class="text-center">
                    Timer Inactive<br/><br/>Click to Start
                </p>            
            </template>
        </ButtonToggleEmitter>

        <ButtonEmitter
            v-for="(player, index) in getPlayers()"
            :key="player.name + index"
            colour="blue lighten-3"
        >
        Stop Time:<br/>
        {{player.name}}
        </ButtonEmitter>
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue'
import ButtonToggleEmitter from './generic/ButtonToggleEmitter.vue'
export default {
    methods: {
        getPlayers() {
            if (this.data.length == 2) {
                return this.data[0].players.concat(this.data[1].players);
            }
    
            return [];
        }
    },
    
    data() {
        return {
            data: [],
            eventData: {
                timerToggle: false
            }
        }
    },  
    async created() {
        try {
            const teamData = await this.$root.socket.emitP("getTeamsData");
            if (Array.isArray(teamData)) {
                this.data = teamData;
            }
        } catch(e) {
            //
        }

        try {
            const savedEventData = await this.$root.socket.emitP("getSavedDisplayEventData", "StandOnTime");
            if (savedEventData !== undefined) {
                this.eventData = savedEventData;
            }
        } catch(e) {
            //
        }

        this.$root.socket.on("teamsUpdate", data => {
            if (Array.isArray(data)) {
                this.data = data;
            }
        })

        this.$root.socket.on("displayEvent", (data) => {
            if (
                data !== undefined && 
                data.key !== undefined && 
                data.val !== undefined
            ) {
                this.eventData[data.key] = data.val;
            }
        })
    },
    components: {ButtonEmitter, ButtonToggleEmitter}
}
</script>