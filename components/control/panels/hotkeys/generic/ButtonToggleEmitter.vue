<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="value !== false ? 'green lighten-1' : 'red accent-2'"
        style="transition: background-color 0.2s;"
        :disabled="disabled"
    >
        <slot name="active"
            v-if="value !== false"
            class="display-name"
        >
            <p class="display-name">{{getCurrentText()}}</p>
        </slot>

        <slot name="inactive"
            v-else
            class="display-name"
        >
            <p>{{getCurrentText()}}</p>
        </slot>

    </v-card>
</template>

<script>
export default {
    props: ["label","activeLabel", "inactiveLabel", "eventName", "getTrueValue"],

    data() {
        return {
            disabled: false,
            value: false
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
                this.value = data.value;
            }
        })

        this.$nuxt.$on("displayEventSavedData", (data) => {
            if (
                data != undefined &&
                this.eventName in data &&
                data[this.eventName] != undefined
            ) {
                this.value = data[this.eventName];
            }
        })
    },
    
    methods: {
        click() {
            if (this.eventName === undefined) return;

            this.$root.socket.emit("displayEvent", {
                eventName: this.eventName,
                writeToDisplay: this.$store.state.display.current?.replace(/ /g, ""),
                value: this.getNextValue(),
                save: true
            })
        },

        getCurrentText() {
            if (this.active && this.activeLabel) {
                return this.activeLabel
            }

            if (!this.active && this.inactiveLabel) {
                return this.inactiveLabel
            }

            if (this.label) {
                return this.label;
            }
        },

        getNextValue() {
            if (this.value !== false) return false;

            if (this.getTrueValue !== undefined) {
                return this.getTrueValue();
            }

            return true
        }
    }
}
</script>

<style scoped>
.display-name,
.display-name * {
    pointer-events: none;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    overflow: scroll;
}
</style>