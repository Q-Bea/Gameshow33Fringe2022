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

    async created() {
        try {
            const games = await this.$root.socket.emitP("getValidGames");
            if (Array.isArray(games)) {
                this.games = games;
            }
        } catch (e) {
            //
        }

        try {
            const games = await this.$root.socket.emitP("getGamesInUse");
            if (Array.isArray(games)) {
                this.selectedGames = games;
            }
        } catch (e) {
            //
        }

        this.$root.socket.on("gamesInUseUpdate", (games) => {
            if (Array.isArray(games)) {
                this.selectedGames = games;

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
        updateGames() {
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("setGamesInUse", this.selectedGames)
        }
    }
}
</script>

