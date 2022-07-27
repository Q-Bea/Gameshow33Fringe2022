<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        :color="'grey lighten-2'"
        style="transition: background-color 0.2s;"
        :disabled="disabled"
    >
        <v-container>
            <v-row>
                <v-col>
                    <slot class="text-center">
                        <p class="text-center">Data Entry</p>
                    </slot>
                    <v-form
                        v-model="valid"
                        :disabled="disabled"
                    >
                        <v-text-field
                            :label="dataEntryLabel ?? 'Enter Data'"
                            outlined
                            dense
                            v-model="data"
                            :type="dataEntryType ?? undefined"
                            :suffix="dataEntrySuffix ?? undefined"
                            :rules="dataEntryRules ?? undefined"
                            required
                        ></v-text-field>
                        <v-btn
                            block
                            :disabled="!valid || disabled"
                            :loading="loading"
                            @click="submit"
                            :color="colour"
                            style="transition: background-color 0.2s;"
                        >Submit</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: ["eventName", "save", "dataEntryLabel", "dataEntryType", "dataEntrySuffix", "dataEntryRules"],
    data() {
        return {
            valid: false,
            data: 100,
            disabled: false,
            loading: false,
            colour: "primary lighten-1",
        }
    },

    created() {
        this.$nuxt.$on("displayEvent", (data) => {
            if (
                data != undefined && 
                data.eventName != undefined &&
                data.eventName === this.eventName &&
                data.value != undefined
            ) {
                this.data = data.value;

                this.loading = false;
                this.disabled = false;

                this.colour = "success lighten-1"

                setTimeout(() => {
                    this.colour = "primary lighten-1"
                }, 2000)
            }
        })

        this.$nuxt.$on("displayEventSavedData", (data) => {
            if (
                data != undefined &&
                this.eventName in data &&
                data[this.eventName] != undefined
            ) {
                this.data = data[this.eventName];
            }
        })
    },

    methods: {
        submit() {
            if (this.eventName === undefined || this.data === undefined) return;

            if (this.dataEntryType === "number") { //FIXME do better?
                if (isNaN(parseInt(this.data))) return
                this.data = parseInt(this.data)
            }
            this.loading = true;
            this.disabled = true;

            this.$root.socket.emit("displayEvent", {
                eventName: this.eventName,
                value: this.data,
                
                save: this.save ?? false,
                writeToDisplay: this.$store.state.display.current
            })
        }
    }
}
</script>