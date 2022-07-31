<template>
    <v-container fluid class="fill-height base" :style="`background-color: ${backgroundColor}`">
        <v-row align="center" justify="center">
            <p class="clock-text">{{clockText}}</p>
        </v-row>
    </v-container>
</template>

<style scoped>
.clock-text {
    color: white;
    font-size: 25vw;
    width: auto;
    display: flex;
}
</style>

<script>
export default {
    data() {
        return {
            clockText: "--:--",
            backgroundColor: "black"
        }
    },

    created() {
        this.$root.socket = this.$nuxtSocket({withCredentials: true})
        this.$root.socket.emit("joinQueryRoom", "clock")

        this.$root.socket.on("flashClock", () => {
            this.flash(10);
        })
    },

    mounted() {
        this.vueInsomnia().on(); //Prevent screen from sleeping
        setInterval(() => {
            const date = new Date(Date.now());

            let hours = date.getHours();
            const minutes = date.getMinutes();
            let amPm = "am"

            if (hours > 11) {
                amPm = "pm"
                hours -= 12
            }

            this.clockText = `${hours}:${minutes}${amPm}`
        }, 1000);

        //Attempt to go fullscreen
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {/* */});
        }
        else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen().catch(() => {/* */});
        }
    },

    methods: {
        async flash(numberOfTimes) {
            this.backgroundColor = "red";

            await new Promise(res => {
                setTimeout(() => {
                    this.backgroundColor = "black"
                    res()
                }, 300)
            })

            setTimeout(() => {
                if (numberOfTimes == 1) return;
                
                this.flash(numberOfTimes - 1)
            }, 300)
        }
    }
}
</script>