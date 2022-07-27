<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="overrideColour ?? (colour ?? 'primary lighten-1')"
        style="transition: background-color 0.1s;"
    >
        <slot
            class="display-name"
        >
        <p 
            v-if='label != undefined' 
            class="display-name"
        >{{label}}</p>
        </slot>
    </v-card>
</template>

<script>
export default {
    props: ["colour", "label", "dataValue", "eventName", "save"],

    data() {
        return {
            overrideColour: undefined
        }
    },

    created() {
        this.$nuxt.$on("displayEvent", (data) => {
            if (
                data != undefined && 
                data.eventName != undefined &&
                data.eventName === this.eventName &&
                data.value != undefined &&
                data.value === this.dataValue
            ) {
                if (data.eventName === this.eventName) {
                    this.pulse("green darken-1");
                }
            }
        })

        //Buttons don't save any data so they don't need the synchronization listener
    },

    methods: {
        pulse(colour = "green lighten-1") {
            this.overrideColour = colour;
            
            setTimeout(() => {
                this.overrideColour = undefined;
            }, 230)
        },

        click() {
            if (!this.eventName) return;

            this.$root.socket.emit("displayEvent", {
                eventName: this.eventName,
                value: this.dataValue,

                //For Storage, value is saved
                save: this.save ?? false
            })

            this.pulse();
        }
    }
}
</script>

<style scoped>
.display-name {
    pointer-events: none;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    overflow: scroll;
}
</style>