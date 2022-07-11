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
        >
            <v-container fluid>
                <v-alert 
                    type="warning" 
                    outlined
                    v-if="update"
                >Data updated from other client</v-alert>
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
            disabled: false
        }
    },

    beforeMount() {
        this.$parent.socket.emit("getWheelOptions", (data) => {
            if (data) {
                this.wheelOptions = data;
            }
        });

        //Listen for changes incase other client submits
        this.$parent.socket.on("wheelUpdate", (data) => {
            if (data) {
                this.wheelOptions = data;

                //Make sure updating on this client doesn't trigger the alert
                if (this.submitColour === "primary") {
                    this.update = true;
                    this.disabled = true;

                    setTimeout(() => {
                        this.update = false;
                        this.disabled = false;
                    }, 5000)
                }

            }
        });
    },

    methods: {
        updateWheelOptions() {
            this.$parent.socket.emit("setWheelOptions", this.wheelOptions);

            this.submitColour = "success";

            setTimeout(() => {
                this.submitColour = "primary"
            }, 2000)
        }
    }
}
</script>