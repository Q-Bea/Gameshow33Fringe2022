<template>
    <v-container fluid>
        <v-scroll-y-transition mode="out-in" v-if="visible">
            <p 
                class="countdown" 
                :key="currentNumber"
                v-if="currentNumber != 2"
            >{{currentNumber}}</p>
            <v-img 
                v-else
                src="/assets/scenes/Countdown/tuna.png"
                contain
                eager
            />
        </v-scroll-y-transition>
    </v-container>
</template>

<style scoped>
.countdown {
    color: white;
    text-align: center;
    width: 100%;
    font-size: 200px;
}
</style>

<script>
export default {
    data() {
        return {
            currentNumber: 10,
            visible: true
        }
    },
    created() {
        this.$nuxt.$on("displayEvent", data => {
            if (
                data.eventName === "next"
            ) {
                if (this.currentNumber <= 0) return;
                this.currentNumber--;

                if (this.currentNumber == 0) {
                    this.visible = false;
                }
            } else if (
                data.eventName === "back"
            ) {
                if (this.currentNumber >= 10) return;
                this.currentNumber++
                this.visible = true;
            }
        })

        this.$emit("mounted")
    }
}
</script>