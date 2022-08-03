<template>
    <v-container fluid>
        <v-scroll-y-transition mode="out-in">
            <v-img
                v-if="visible && files[value] !== undefined"
                :key="value"
                :src="`assets/games/ChristianKristen/images/${files[value]}`"
                contain
                max-height="90vh"
            />
        </v-scroll-y-transition>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            visible: true,
            value: undefined,
            files: {
                christian: "christian.jpg",
                kristen: "kristen.jpg",
                intro: "intro.jpg",
                separation: "separation.png"
            }
        }
    },
    created() {
        this.$nuxt.$on("displayEvent", (data) => {
            if (data != undefined) {
                switch(data.eventName) {
                    case "show":
                        this.value = data.value;
                        this.visible = true;
                        break;
                    
                    case "blackout":
                        this.visible = !this.visible;
                        return
                }
            }
        })
    }
}
</script>