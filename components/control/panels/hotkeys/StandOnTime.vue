<template>
    <v-row>
        <ButtonToggleEmitter label="Start/Pause Time"/>

        <ButtonEmitter
            v-for="(option, index) in wheelOptions"
            :key="option + index"
            :label="`Rig: ${option}`"
            colour="blue lighten-3"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue'
import ButtonToggleEmitter from './generic/ButtonToggleEmitter.vue'
export default {
    components: {ButtonEmitter, ButtonToggleEmitter}
}
</script>