<template>
    <div class="timer" :style="`transform: translateY(${getTranslation});`">
        <p class="text-center">{{playerName}}</p>
        <p class="text-center">{{getTime}}</p>
    </div>
</template>

<style scoped>
.timer {
    font-size: larger;
    margin: 10px;
    text-align: center;
    width: 100px;
    position: relative;
    transform: translateY();
    border: 1px solid;
    border-radius: 10%;
    transition-duration: 0.2s;
    background-color: white;
}
</style>

<script>
const MAX_TRANSLATION = 45;
export default {
    props: ["playerName", "timerIndex"],
    data() {
        return {
            timerVal: undefined
        }
    },
    computed: {
        getTime() {
            if (typeof this.timerVal !== "number") return "--:--.--"

            let seconds = this.timerVal / 1000;
            const minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;

            return `${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds.toFixed(2)}`
        },

        getTranslation() {
            const target = this.$parent.targetSeconds;

            if (target === undefined || this.timerVal == undefined) return `${MAX_TRANSLATION}vh`;

            const curVal = this.timerVal / 1000; //get seconds

            let percentRemaining = 1 - (curVal / target);

            if (percentRemaining < -0.55) percentRemaining = -0.55

            return `${(MAX_TRANSLATION * percentRemaining).toFixed(1)}vh`
        }
    },
    created() {
        this.$nuxt.$on("sot-tick", (timers) => {
            if (Array.isArray(timers)) {
                if (typeof timers[this.timerIndex] === "number") {
                    this.timerVal = timers[this.timerIndex];
                } else {
                    this.timerVal = undefined;
                }
            }
        })
    }
}
</script>