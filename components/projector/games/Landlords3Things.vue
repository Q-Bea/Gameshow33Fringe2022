<template>
    <v-container fluid>
        <v-scroll-y-transition mode="out-in">
            <v-row justify="center" align="center">
                <v-col
                    :key="value + 'image1'"
                    cols="6"
                >
                    <v-img
                        v-if="visible && typeof value === 'number'"
                        :src="`assets/games/Landlords3Things/images/q${value}-book.jpg`"
                        contain
                        max-height="90vh"
                        style="vertical-align: middle;"
                    />
                </v-col>
                <v-col
                    :key="value + 'image2'"
                    cols="6"
                >
                    <v-img
                        v-if="visible && typeof value === 'number'"
                        :src="`assets/games/Landlords3Things/images/q${value}-band.jpg`"
                        contain
                        max-height="90vh"
                        style="vertical-align: middle;"
                    />
                </v-col>
            </v-row>
        </v-scroll-y-transition>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            visible: true,
            value: undefined
        }
    },
    created() {
        this.$nuxt.$on("displayEvent", (data) => {
            if (data != undefined) {
                switch(data.eventName) {
                    case "show":
                        if (typeof data.value === "number" && data.value <= 5 && data.value > 0) {
                            this.value = data.value
                            this.visible = true;
                        }
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