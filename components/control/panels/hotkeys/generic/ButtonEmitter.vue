<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="overrideColour ?? (colour ?? 'primary lighten-1')"
        style="transition: background-color 0.1s;"
    >
        <p 
            v-if='label !== undefined' 
            class="display-name"
        >{{label}}</p>
        <div
            v-else
            class="text-center display-name"
        >
            <slot
                class="display-name"
            ></slot>
        </div>

    </v-card>
</template>

<script>
export default {
    props: ["colour", "label", "dataKey", "dataValue", "name"],

    data() {
        return {
            overrideColour: undefined
        }
    },

    methods: {
        pulse(colour = "green lighten-1") {
            this.overrideColour = colour;
            
            setTimeout(() => {
                this.overrideColour = undefined;
            }, 230)
        },

        click() {
            this.$root.socket.emit("displayEvent", {
                name: this.name,
                key: this.dataKey ?? undefined,
                value: this.dataValue ?? undefined,
                save: this.dataKey !== undefined && this.dataValue !== undefined
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