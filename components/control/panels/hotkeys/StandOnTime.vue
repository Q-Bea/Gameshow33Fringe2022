<template>
    <v-row>
        <ButtonToggleEmitter
            eventName="timerToggle"
            :getTrueValue="curTime"
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
            :key="player + index"
            colour="blue lighten-3"
            eventName="stopPlayerTime"
            :dataValue="player + index"
            :save="true"
        >
        Stop Time:<br/>
        {{player}}
        </ButtonEmitter>

        <DataEntry
            dataEntryLabel="Target in seconds"
            dataEntrySuffix="sec."
            dataEntryType="number"
            :dataEntryRules="[
                v => !!v || 'Required!',
                v => !isNaN(parseInt(v)) || 'Not a number!',
                v => parseInt(v) > 0 || 'Out of bounds!'
            ]"
            eventName="timerTarget"
            :save="true"
        >
        <p class="text-center">Set Target Time</p>
        </DataEntry>
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue'
import ButtonToggleEmitter from './generic/ButtonToggleEmitter.vue'
import DataEntry from "./generic/DataEntry.vue"
export default {
    methods: {
        getPlayers() {
            if (this.data.length == 2) {
                return this.data[0].players.concat(this.data[1].players);
            }
    
            return [];
        },

        curTime() {
            return Date.now()
        }
    },
    
    data() {
        return {
            data: []
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

        this.$root.socket.on("teamsUpdate", data => {
            if (Array.isArray(data)) {
                this.data = data;
            }
        })

        this.$emit("mounted")
    },
    components: { ButtonEmitter, ButtonToggleEmitter, DataEntry, DataEntry }
}
</script>