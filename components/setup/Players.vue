<template>
    <v-card
        elevation="5"
        max-width="50vw"
    >
        <v-card-title>
            Player Names
        </v-card-title>
        <v-form 
            v-model="valid"
            ref="playerNames"
        >
            <v-container fluid>
                <v-alert 
                    type="warning" 
                    outlined
                    v-if="update"
                >Data updated from other client</v-alert>
                <v-row style="text-align: center;">
                    <v-col>
                        <h2>Team 1</h2>
                        <v-text-field
                            v-for="index in 3"
                            :key="index"
                            :label="'Player ' + index"
                            required
                            :rules="playerNameRules"
                            v-model="players.team1[index - 1]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <h2>Team 2</h2>

                        <v-text-field
                            v-for="index in 3"
                            :key="index"
                            :label="'Player ' + index"
                            required
                            :rules="playerNameRules"
                            v-model="players.team2[index - 1]"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-checkbox 
                    label="Reset Scores" 
                    required
                    v-model="players.resetScore"
                ></v-checkbox>
                <v-btn 
                    @click="updatePlayerNames" 
                    :disabled="!valid || disabled"
                    :color="players.colour"
                >Update</v-btn>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            playerNameRules: [
                v => !!v || "Name is required!"
            ],
            players: {
                team1: [],
                team2: [],
                resetScore: true,
                colour: "primary"
            },
            update: false,
            disabled: false
        }
    },

    beforeMount() {
        this.$parent.socket.emit("getPlayerData", (data) => {
            if (data.team1) {
                this.players.team1 = data.team1.map(player => player.name);
            }
            if (data.team2) {
                this.players.team2 = data.team2.map(player => player.name);
            }
        });

        //Listen for changes incase other client submits
        this.$parent.socket.on("playersUpdate", (data) => {
            let changed = false;
            if (data.team1) {
                changed = true;
                this.players.team1 = data.team1.map(player => player.name);
            }

            if (data.team2) {
                changed = true;
                this.players.team2 = data.team2.map(player => player.name);
            }

            if (changed && this.players.colour === "primary") {
                this.update = true;
                this.disabled = true;

                setTimeout(() => {
                    this.update = false;
                    this.disabled = false;
                }, 5000)
            }
        });
    },

    methods: {
        updatePlayerNames() {
            // this.socket.emit("setPlayerNames", {team1: this.players.team1, team2: this.players.team2}, this.players.resetScore)  
            this.$parent.socket.emit("setPlayerNames", {team1: this.players.team1, team2: this.players.team2, reset: this.players.resetScore});

            this.players.colour = "success";

            setTimeout(() => {
                this.players.colour = "primary"
            }, 2000)
        }
    }
}
</script>