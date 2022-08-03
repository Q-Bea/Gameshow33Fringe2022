<!-- Deprecated (math is hard and not worth it right now) -->

<template>
    <v-card
        elevation="5"
        max-width="50vw"
    >
        <v-card-title>
            Keystone Adjustments
        </v-card-title>

        <v-form        
            v-model="valid"
            ref="keystoneOptions"
            :disabled="disabled"
            @submit="updateGames"
            onsubmit="return false"
        >
            <v-container>
                <v-row>
                    <v-slider
                        label="Pan Offset deg"
                        max="90"
                        min="-90"
                        tick-size="1"
                        v-model="value"
                        hide-details
                    >

                    <template v-slot:append>
                        <v-text-field
                            v-model="value"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 80px"
                            suffix="deg"
                            :rules="rules"
                            required
                        ></v-text-field>
                    </template>

                    </v-slider>
                </v-row>

                <br/>

                <v-btn 
                    @click="updateKeystone" 
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
            value: 0,
            rules: [
                v => !isNaN(parseInt(v)) || "Not a Number"
            ],
            colour: "primary",
            loading: false,
            disabled: false
        }
    },
    async created() {
        try {
            const keystone = await this.$root.socket.emitP("getKeystone");
            if (typeof keystone === "number" && keystone <= 90 && keystone >= -90) {
                this.value = keystone;
            }

        } catch (e) {
            //
        }

        this.$root.socket.on("keystoneUpdate", value => {
            if (typeof value === "number" && value <= 90 && value >= -90) {
                this.value = value;

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
        updateKeystone() {
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("setKeystone", this.value)
        }
    }
}
</script>