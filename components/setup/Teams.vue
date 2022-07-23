<template>
    <v-card
        elevation="5"
        max-width="50vw"
    >
        <v-card-title>
            Team and Player Names
        </v-card-title>
        <v-form 
            v-model="valid"
            ref="playerNames"
            :disabled="disabled"
        >
            <v-container fluid>
                <v-slide-y-transition>
                    <v-alert 
                        type="warning" 
                        outlined
                        v-if="update"
                    >Data updated from other client</v-alert>
                </v-slide-y-transition>
                <v-row style="text-align: center;">
                    <v-col
                        style="border-right: solid 1px lightgray;"
                    >
                        <v-text-field
                            label="Team 1 Name"
                            outlined
                            required
                            :rules="playerNameRules"
                            v-model="teams[0].teamName"
                        >

                        </v-text-field>
                        <v-text-field
                            v-for="index in 3"
                            :key="index"
                            :label="'Player ' + index"
                            required
                            :rules="playerNameRules"
                            v-model="teams[0].players[index - 1]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Team 2 Name"
                            outlined
                            required
                            :rules="playerNameRules"
                            v-model="teams[1].teamName"
                        >

                        </v-text-field>
                        <v-text-field
                            v-for="index in 3"
                            :key="index"
                            :label="'Player ' + index"
                            required
                            :rules="playerNameRules"
                            v-model="teams[1].players[index - 1]"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-checkbox 
                    label="Reset Scores" 
                    required
                    v-model="resetScore"
                ></v-checkbox>
                <v-slide-y-transition>
                    <p class="text-center" v-if="defaultPrompt">Defaults filled | Click 'Update' to save!</p>
                </v-slide-y-transition>
                <v-btn 
                    @click="updateTeams" 
                    :disabled="!valid || disabled"
                    :color="colour"
                    :loading="loading"
                    style="transition: background-color 0.2s;"
                >Update</v-btn>

                <v-btn
                    @click="fillDefaults"
                    :disabled="disabled"
                    color="secondary"
                >Fill Defaults
                </v-btn>
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
            teams: [
                {
                    teamName: "Team 1",
                    players: []
                },
                {
                    teamName: "Team 2",
                    players: []
                }
            ],
            resetScore: true,
            colour: "primary",
            update: false,
            disabled: false,
            loading: false,
            defaultPrompt: false
        }
    },

    async created() {
        try {
            const data = await this.$root.socket.emitP("getTeamsData");
            if (Array.isArray(data)) {
                if (data[0]?.teamName) this.teams[0].teamName = data[0].teamName;
                if (data[0]?.players) this.teams[0].players = data[0].players.map(player => player.name);
                
                if (data[1]?.teamName) this.teams[1].teamName = data[1].teamName;
                if (data[1]?.players) this.teams[1].players = data[1].players.map(player => player.name);
            }
        } catch(e) {
            //
        }

        //Listen for changes incase other client submits
        this.$root.socket.on("teamsUpdate", (data) => {
            if (Array.isArray(data)) {
                if (data[0]?.teamName) this.teams[0].teamName = data[0].teamName;
                if (data[0]?.players) this.teams[0].players = data[0].players.map(player => player.name);
                
                if (data[1]?.teamName) this.teams[1].teamName = data[1].teamName;
                if (data[1]?.players) this.teams[1].players = data[1].players.map(player => player.name);

                if (this.loading) {
                    this.loading = false;
                    this.disabled = false;
                    this.colour = "success";

                    setTimeout(() => {
                        this.colour = "primary"
                    }, 2000)

                } else if (this.colour === "primary") {
                    this.update = true;
                    this.disabled = true;

                    setTimeout(() => {
                        this.update = false;
                        this.disabled = false;
                    }, 4000)
                }
            }
        });
    },

    methods: {
        updateTeams() {
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("setTeams", {
                teams: this.teams,
                resetScores: this.resetScore
            });
        },

        fillDefaults() {
            this.teams = [
                {
                    teamName: "Team 1",
                    players: [
                        "Guest 1",
                        "Guest 2",
                        "Owen"
                    ]
                },
                {
                    teamName: "Team 2",
                    players: [
                        "Guest 4",
                        "Guest 5",
                        "Rob"
                    ]
                }
            ]

            this.defaultPrompt = true;

            setTimeout(() => {
                this.defaultPrompt = false;
            }, 5000)
        }
    }
}
</script>