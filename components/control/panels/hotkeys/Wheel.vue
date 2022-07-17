<template>
    <v-row>
        <ButtonEmitter label="Spin Randomly"/>

        <ButtonEmitter
            v-for="(option, index) in wheelOptions"
            :key="option + index"
            :label="`Rig: ${option}`"
            colour="blue lighten-3"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue';
export default {
    computed: {
        wheelOptions() {
            return this.$store.state.wheel.options
        }
    },
    components: {ButtonEmitter}
}
</script>