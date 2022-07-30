<template>
    <v-card
        elevation="5"
        max-width="50vw"
    >
        <v-card-title>
            Games in Use
        </v-card-title>

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

                <v-select
                    :items="techGames"
                    label="Tech Games"
                    multiple
                    chips
                    v-model="selectedTechGames"
                    hint="Select which tech games are in this show"
                    persistent-hint
                    placeholder="No Games Selected"
                    required
                    :rules="gameRules"
                    solo
                    clearable
                >
                </v-select>

                <v-select
                    :items="noTechGames"
                    label="No Tech Games"
                    multiple
                    chips
                    v-model="selectedNoTechGames"
                    hint="Select which no-tech games are in this show"
                    persistent-hint
                    placeholder="No Games Selected"
                    required
                    :rules="gameRules"
                    solo
                    clearable
                >
                </v-select>

                <br/>

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
            selectedTechGames: [],
            selectedNoTechGames: [],
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
            this.incomingData(games)
        } catch (e) {
            //
        }

        this.$root.socket.on("gamesInUseUpdate", (games) => {
            if (this.incomingData(games)) {             
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
            console.log(games)
            if (games != undefined) {
                let changed = false;
                if (Array.isArray(games.tech)) {
                    this.selectedTechGames = games.tech;
                    changed = true;
                }

                if (Array.isArray(games.noTech)) {
                    this.selectedNoTechGames = games.noTech;
                    changed = true;
                }

                return changed;
            }

            return false;
        },
        updateGames() {
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("setGamesInUse", {
                tech: this.selectedTechGames,
                noTech: this.selectedNoTechGames
            })
        }
    }
}
</script>

