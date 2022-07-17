<template>
    <v-card 
        class="d-flex align-center justify-center"
        height="150"
        width="150"
        @click="click"
        :color="active"
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
        }
    }
}
</script>