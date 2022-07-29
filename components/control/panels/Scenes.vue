<template>
    <v-container>
        <v-row justify="center">
            <v-card 
                v-for="scene in scenes"
                :key="scene"
                :color="getColour(scene)"
                class="d-flex align-center justify-center"
                height="150"
                width="150"
                @click="setPending(scene)"
                @dblclick="setCurrent(scene)"
                style="transition: background-color 0.2s;"
            >
                <p class="display-name">{{scene}}</p>

                <v-scroll-y-reverse-transition>
                    <div
                        v-if="scene === current"
                        class="active-indicator"
                    >
                        (Active)
                    </div>

                    <div
                        v-else-if="scene === pending"
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
            return this.$store.state.display.current
        },
        pending() {
            return this.$store.state.display.pending
        }
    },
    data() {
        return {
            scenes: []
        }
    },

    async created() {
        try {
            const scenes = await this.$root.socket.emitP("getValidScenes");

            if (Array.isArray(scenes)) {
                this.scenes = scenes;
            }
        } catch(e) {
            //
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
    text-align: center;
    pointer-events: none;

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