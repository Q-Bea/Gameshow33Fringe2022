<template>
    <v-card
        elevation="5"
        max-width="50vw"
        max-height="70vh"
        style="overflow-y: scroll;"
    >
        <v-card-title>
            Valid Games
        </v-card-title>

        <v-card-text>Enter the list of games that can be used for any show</v-card-text>

        <v-form
            v-model="valid"
            ref="gamesOptions"
            :disabled="disabled"
            @submit="updateGames"
            onsubmit="return false"
        >
            <v-container fluid>
                <v-slide-y-transition>
                    <v-alert 
                        type="warning" 
                        outlined
                        v-if="update"
                    >Data updated from other client</v-alert>
                </v-slide-y-transition>

                <!-- The available options should be from "games in use" -->
                <v-combobox
                    outlined
                    label="Tech Games"
                    hint="Type the title of a new game, or delete existing ones"
                    persistent-hint
                    clearable
                    small-chips
                    :items="techGamesInUse"
                    required
                    :rules="gameRules"
                    v-model="techGames"
                    multiple
                >
                    <template v-slot:selection="data">
                        <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                        close
                        :color="techGamesInUse.includes(data.item) ? 'green lighten-1' : ''"
                        >
                        {{ data.item }}
                        </v-chip>
                    </template>
                </v-combobox>

                <br/>

                <v-combobox
                    outlined
                    label="No-Tech games"
                    hint="Type the title of a new game, or delete existing ones"
                    persistent-hint
                    clearable
                    small-chips
                    :items="noTechGamesInUse"
                    required
                    :rules="gameRules"
                    v-model="noTechGames"
                    multiple
                >
                    <template v-slot:selection="data">
                        <v-chip
                        :key="JSON.stringify(data.item)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item)"
                        close
                        :color="noTechGamesInUse.includes(data.item) ? 'green lighten-1' : ''"
                        >
                        {{ data.item }}
                        </v-chip>
                    </template>
                </v-combobox>

                <br/>

                <p>Note: Modifications will not appear in the "Games in Use" section until you press update</p>

                <v-btn 
                    @click="updateGames" 
                    :disabled="!valid || disabled"
                    :color="colour"
                    :loading="loading"
                    style="transition: background-color 0.2s;"
                >Update</v-btn>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            techGames: [],
            noTechGames: [],
            techGamesInUse: [],
            noTechGamesInUse: [],
            colour: "primary",
            disabled: false,
            valid: false,
            update: false,
            gameRules: [
                v => v.length>0 || "At least 1 game is required!"
            ],
            loading: false
        }
    },

    async created() {
        try {
            const games = await this.$root.socket.emitP("getValidGames");
            if (games != undefined) {
                if (Array.isArray(games.tech)) {
                    this.techGames = games.tech;
                }

                if (Array.isArray(games.noTech)) {
                    this.noTechGames = games.noTech;
                }
            }
        } catch (e) {
            //
        }

        try {
            const games = await this.$root.socket.emitP("getGamesInUse");
            if (games != undefined) {
                if (Array.isArray(games.tech)) {
                    this.techGamesInUse = games.tech;
                }

                if (Array.isArray(games.noTech)) {
                    this.noTechGamesInUse = games.noTech;
                }
            }        
        } catch (e) {
                //
        }

        this.$root.socket.on("gamesInUseUpdate", (games) => {
            if (games != undefined) {
                if (Array.isArray(games.tech)) {
                    this.techGamesInUse = games.tech;
                }

                if (Array.isArray(games.noTech)) {
                    this.noTechGamesInUse = games.noTech;
                }
            }
        })

        this.$root.socket.on("validDisplaysUpdate", (displays) => {
            if (this.incomingData(displays.games)) {             
                if (this.loading) {
                    this.loading = false;
                    this.disabled = false;
                    this.colour = "success"

                    setTimeout(() => {
                        this.colour = "primary"
                    }, 2000)
                } else if (this.colour === "primary") {
                    this.disabled = true;
                    this.update = true;
    
                    setTimeout(() => {
                        this.disabled = false;
                        this.update = false;
                    }, 4000)
                }
            }
        })
    },

    methods: {
        incomingData(games) {
            if (games) {
                let changed = false;
                if (Array.isArray(games.tech)) {
                    this.techGames = games.tech;
                    changed = true;
                }

                if (Array.isArray(games.noTech)) {
                    this.noTechGames = games.noTech;
                    changed = true;
                }

                return changed;
            }

            return false;
        },
        updateGames() {
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("setValidGames", {
                tech: this.techGames,
                noTech: this.noTechGames
            })
        }
    }
}
</script>

