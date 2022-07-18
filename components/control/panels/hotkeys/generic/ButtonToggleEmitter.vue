<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="toggleOn ? 'green darken-1' : 'red darken-1'"
        style="transition: background-color 0.2s;"
    >
        <p class="display-name">{{label}}</p>
    </v-card>
</template>

<script>
export default {
    props: ["label", "dataKey"],

    data() {
        return {
            toggleOn: false
        }
    },  
    
    methods: {
        click() {
            this.$root.socket.emit("displayEvent", {
                key: this.dataKey,
                type: "push"
            })

            this.toggleOn = !this.toggleOn
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