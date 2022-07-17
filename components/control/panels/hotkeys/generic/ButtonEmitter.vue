<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="colour ?? 'primary lighten-1'"
        style="transition: background-color 0.2s;"
    >
        <p class="display-name">{{label}}</p>

    </v-card>
</template>

<script>
export default {
    props: ["colour", "label", "dataKey"],
    methods: {
        click() {
            this.$root.socket.emit("displayEvent", {
                key: this.dataKey,
                type: "push"
            })
            

            const returnColour = this.colour;
            this.colour = "green lighten-1";
            
            setTimeout(() => {
                this.colour = returnColour;
            }, 230)
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

}
</style>