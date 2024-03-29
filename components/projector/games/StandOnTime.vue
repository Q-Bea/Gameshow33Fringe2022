<template>
    <v-container fluid class="sot-container">
        <!-- TODO: Game Title -->
        <div class="target-line">
            Target<br/>{{stylizedTarget}}
        </div>
        <div class="segment-rules">
            <span style="transform: translateY(216px); top: 32vh;"></span>
            <span style="transform: translateY(216px); top: 22vh;"></span>
            <span style="transform: translateY(216px); top: 12vh;"></span>
        </div>
        <v-row justify="center" style="transform: translateY(212px);">
            <v-row no-gutters style="width: 50%; border-right: 3px dotted black" justify="center">
                <Timer
                    v-for="(player, index) in teams[0]?.players"
                    :key="player + index"
                    :playerName="player"
                    :timerIndex="index"
                />
            </v-row>
            <v-row no-gutters style="width: 50%;" justify="center">
                <Timer
                    v-for="(player, index) in teams[1]?.players"
                    :key="player + (index + teams[0]?.players.length ?? 0)"
                    :playerName="player"
                    :timerIndex="(index + teams[0]?.players.length ?? 0)"
                />
            </v-row>
        </v-row>
    </v-container>
</template>

<style scoped>
.sot-container {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
}
.game-header {
    text-align: center;
    font-size: xx-large;
}

.target-line {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
    border-bottom: 5px double black;
    width: 100%;
    padding-bottom: 0.8rem;
    text-align: center;
    font-size: 50px;
}

.segment-rules {
    position: fixed;
    width: 98vw;
    left: 50%;
    transform: translateX(-50%);
}

.segment-rules span {
    border-bottom: 2px dotted grey;
    position: absolute;
    width: 100%;
    left: 0;
    opacity: 50%;
}
</style>

<script>
import Timer from "./SOT/Timer.vue"

let interval;
export default {
    components: {Timer},
    data() {
        return {
            startTime: undefined,
            timerActive: false,
            teams: [],
            timersRaw: [],
            stoppedTimers: new Set(),
            targetSeconds: undefined,
            hideTimer: true,
            pauseOffsetRaw: 0
        }
    },

    computed: {
        playersConcat() {
            if (this.teams.length == 2) {
                return this.teams[0]?.players?.concat(this.teams[1]?.players) ?? []
            }

            return [];
        },

        stylizedTarget() {
            const target = this.targetSeconds;

            if (target == undefined || this.hideTimer) {
                return "--:--"
            } else {
                let seconds = Math.floor(this.targetSeconds);
                const minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;

                // return `${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`
                const styleParts = [];
                if (minutes != 0) styleParts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);

                if (seconds != 0) styleParts.push(`${seconds} second${seconds === 1 ? "" : "s"}`)

                return styleParts.join(" and ")
            }
        }
    },

    async created() {
        this.$nuxt.$on("displayEvent", (payload) => {
            if (payload != undefined && payload.eventName) {
                switch(payload.eventName) {
                    case "timerToggle":
                        if (typeof payload.value === "number") {
                            this.startTime = payload.value;
                            this.timerActive = true;
                            this.hideTimer = false;

                            this.startTicker()
                        } else {
                            this.timerActive = false;

                            this.stopTicker()
                            
                            //Support pausing
                            this.pauseOffsetRaw += (Date.now() - this.startTime);
                        }

                        break

                    case "stopPlayerTime":
                        if (typeof payload.value === "string") {
                            //Might as well make this an unofficial toggle as well
                            //(if stopped again, restart the timer)
                            if (this.stoppedTimers.has(payload.value)) {
                                this.stoppedTimers.delete(payload.value)
                            } else {
                                this.stoppedTimers.add(payload.value)
                            }
                        }
                        break;

                    case "timerTarget":
                        if (typeof payload.value === "number") {
                            this.targetSeconds = payload.value;
                            this.hideTimer = false;
                        }
                        break;

                    case "resetTimer":
                        this.startTime = undefined;
                        this.hideTimer = true;
                        this.stoppedTimers.clear();

                        this.timersRaw = [];

                        this.pauseOffsetRaw = 0;
                        this.$nuxt.$emit("sot-tick", this.timersRaw);
                        break;
                }
            }
        }) 

        try {
            const teamData = await this.$root.socket.emitP("getTeamsData");

            if (Array.isArray(teamData)) {
                this.teams = teamData;
            }
        } catch(e) {
            //
        }

        this.$root.socket.on("teamsUpdate", data => {
            if (Array.isArray(data)) {
                this.teams = data;
            }
        })

        this.$nuxt.$on("displayEventSavedData", (data) => {
            if (data != undefined) {
                if ("timerToggle" in data) {
                    this.startTime = data.timerToggle;
                    
                    if (typeof data.timerToggle === "number") {
                        this.timerActive = true;
                        this.hideTimer = false;
                        this.startTicker();
                    }
                }

                if ("timerTarget" in data) {
                    if (typeof data.timerTarget === "number") {
                        this.targetSeconds = data.timerTarget;
                    }
                }
            }
        })

        this.$emit("mounted")
    },

    methods: {
        startTicker() {
            interval = setInterval(() => {
                if (typeof this.startTime !== "number" || !this.timerActive ) {
                    clearInterval(interval)
                    return;
                }

                this.playersConcat.forEach((player, index) => {
                    if (this.stoppedTimers.has(player + index)) return;
                    this.timersRaw[index] = (Date.now() - this.startTime) + this.pauseOffsetRaw;
                });

                this.$nuxt.$emit("sot-tick", this.timersRaw);
            }, 10) //every 100ms
        },

        stopTicker() {
            clearInterval(interval);
        }
    }
}
</script>
