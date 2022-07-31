<template>
    <v-container fluid class="fill-height base" :style="`background-color: ${backgroundColor}`">
        <v-row align="center" justify="center">
            <p class="clock-text">{{clockText}}</p>
        </v-row>

        <v-dialog width="300" v-model="dialog" dark>
            <v-card>
                <v-card-title>
                Enable Screen Lock?
                </v-card-title>

                <v-card-text>
                This will prevent your screen from going to sleep while this tab is active
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    text
                    @click="dialog = false; enableInsomnia()"
                >
                    Enable
                </v-btn>
                <v-btn
                    color="error"
                    text
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>
                </v-card-actions>
            </v-card>        
        </v-dialog>
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
            backgroundColor: "black",
            dialog: true
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
        setInterval(() => {
            const date = new Date(Date.now());

            let hours = date.getHours();
            const minutes = date.getMinutes();
            let amPm = "am"

            if (hours > 11) {
                if (hours !== 24) amPm = "pm"
                if (hours > 12) hours -= 12
            }

            const textMinutes = (minutes < 10 ? "0" : "") + minutes

            this.clockText = `${hours}:${textMinutes}${amPm}`
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
        enableInsomnia() {
            this.vueInsomnia().on();
        },
        
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