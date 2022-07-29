<template>
    <v-container>
        <v-row justify="center">
            <v-card 
                v-for="game in games"
                :key="game"
                :color="getColour(game)"
                class="d-flex align-center justify-center"
                height="150"
                width="150"
                @click="setPending(game)"
                @dblclick="setCurrent(game)"
                style="transition: background-color 0.2s;"
            >
                <p class="display-name">{{game}}</p>

                <v-scroll-y-reverse-transition>
                    <div
                        v-if="game === current"
                        class="active-indicator"
                    >
                        (Active)
                    </div>

                    <div
                        v-if="game === pending"
                        class="active-indicator"
                    >
                        (Pending)
                    </div>
                </v-scroll-y-reverse-transition>

            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    computed: {
        current() {
            return this.$store.state.display.current;
        },
        pending() {
            return this.$store.state.display.pending;
        },
        games() {
            return this.$store.state.games.tech;
        }
    },

    methods: {
        getColour(name) {
            if (name === this.current) {
                return "primary lighten-1";
            }

            if (name === this.pending) {
                return "warning lighten-1";
            }

            return;
        },

        setPending(name) {
            if (name === this.current) return;
            this.$root.socket.emit("setActiveDisplays", {
                pending: name
            })
        },

        setCurrent(name) {
            if (name === this.current) return;

            const prevCur = this.current;

            this.$root.socket.emit("setActiveDisplays", {
                current: name,
                pending: prevCur
            })
        }
    }
}
</script>

<style scoped>
.display-name {
    font-size: larger;
    pointer-events: none;
    text-align: center;

    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

}
.active-indicator {
    position: absolute;
    bottom: 1rem;
    font-size: small;
    text-align: center;

    pointer-events: none;
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

}
</style>