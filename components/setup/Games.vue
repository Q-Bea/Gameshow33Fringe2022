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
                    :items="games"
                    multiple
                    chips
                    v-model="selectedGames"
                    hint="Please select which games are in use this show"
                    persistent-hint
                    placeholder="No Games Selected"
                    required
                    :rules="gameRules"
                >
                </v-select>

                <br/>

                <v-btn 
                    @click="updateGames" 
                    :disabled="!valid || disabled"
                    :color="colour"
                    :loading="loading"
                >Update</v-btn>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            games: [],
            selectedGames: [],
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

    created() {
        this.$parent.socket.emit("getValidGames", games => {
            if (Array.isArray(games)) {
                this.games = games;
            }
        })

        this.$parent.socket.emit("getGamesInUse", games => {
            if (Array.isArray(games)) {
                this.selectedGames = games;
            }
        })

        this.$parent.socket.on("gamesInUseUpdate", (games) => {
            if (this.colour !== "primary") return;
            
            if (Array.isArray(games)) {
                this.selectedGames = games;

                if (this.loading) {
                    this.loading = false;
                    this.colour = "success"

                    setTimeout(() => {
                        this.colour = "primary"
                    }, 2000)
                } else if (this.colour === "primary") {
                    this.disabled = true;
                    this.update = true;
                    this.loading = true;
    
                    setTimeout(() => {
                        this.disabled = false;
                        this.update = false;
                        this.loading = false;
                    }, 4000)
                }

            }
        })
    },

    methods: {
        updateGames() {
            this.loading = true;

            this.$parent.socket.emit("setGamesInUse", this.selectedGames)
        }
    }
}
</script>

