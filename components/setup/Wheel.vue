<template>
    <v-card
        elevation="5"
        max-width="50vw"
    >
        <v-card-title>
            Minigame Wheel Options
        </v-card-title>
        <v-form 
            v-model="valid"
            ref="wheelOptions"
            :disabled="disabled"
            @submit="updateWheelOptions"
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
                <v-row style="text-align: center;">
                    <v-col>
                        <v-text-field
                            v-for="index in 3"
                            :key="index"
                            :label="'Option ' + index"
                            required
                            :rules="wheelOptionRules"
                            v-model="wheelOptions[index - 1]"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-for="index in 3"
                            :key="index"
                            :label="'Option ' + (index + 3)"
                            required
                            :rules="wheelOptionRules"
                            v-model="wheelOptions[(index + 3) - 1]"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-btn 
                    @click="updateWheelOptions" 
                    :disabled="!valid || disabled"
                    :color="submitColour"
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
            valid: true,
            wheelOptionRules: [
                v => !!v || "Option is required!"
            ],
            wheelOptions: [],
            submitColour: "primary",
            update: false,
            disabled: false,
            loading: false
        }
    },

    async created() {
        try {
            const options = await this.$root.socket.emitP("getWheelOptions");
            if (Array.isArray(options)) {
                this.wheelOptions = options;
            }
        } catch(e) {

        }

        //Listen for changes incase other client submits
        this.$root.socket.on("wheelUpdate", (data) => {
            if (Array.isArray(data)) {
                this.wheelOptions = data;

                if (this.loading) {
                    this.loading = false;
                    this.disabled = false;
                    this.submitColour = "success";

                    setTimeout(() => {
                        this.submitColour = "primary"
                    }, 2000)
                }
                else if (this.submitColour === "primary") {
                    //Make sure updating on this client doesn't trigger the alert
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
        updateWheelOptions() {
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("setWheelOptions", this.wheelOptions);
        }
    }
}
</script>