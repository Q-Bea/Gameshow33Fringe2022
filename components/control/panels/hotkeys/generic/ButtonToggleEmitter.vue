<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="isActive ? 'green lighten-1' : 'red accent-2'"
        style="transition: background-color 0.2s;"
        :disabled="disabled"
    >
        <slot name="active"
            v-if="isActive"
            class="display-name"
        >
            <p>{{getCurrentText()}}</p>
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
    props: ["label","activeLabel", "inactiveLabel", "dataKey", "name", "isActive"],

    data() {
        return {
            disabled: false
        }
    }, 
    
    methods: {
        click() {
            this.$root.socket.emit("displayEvent", {
                name: this.name ?? "toggleEvent",
                writeToDisplay: this.$store.state.display.current,
                key: this.dataKey,
                val: !this.isActive,
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