<template>
    <v-row>
        <ButtonEmitter
            eventName="refreshProjector"
            colour="red lighten-1"
            label="Refresh Projector Clients"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue'
export default {
    components: {ButtonEmitter}
}
</script>