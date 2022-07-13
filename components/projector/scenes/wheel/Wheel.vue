<template>
    <v-container fluid style="width: 60vw;">
        <v-row>
            <v-col 
                cols="4"
                v-for="option in wheelOptions"
                :key="option"
            >
                <WheelOption
                    :name="option"
                    :highlight="option === chosen"
                ></WheelOption>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import WheelOption from './WheelOption.vue'
export default {
    computed: {
        wheelOptions() {
            return this.$store.state.wheel.options
        }
    },

    data() {
        return {
            chosen: "1"
        };
    },

    mounted() {
        this.$root.socket.on("sceneEvent", payload => {
            switch(payload.eventName) {
                case "select":
                    this.pick(payload.selected)
                    break;
            }
        })
    },

    methods: {
        pick(selected = undefined) {

        }
    },
    components: { WheelOption }
}
</script>