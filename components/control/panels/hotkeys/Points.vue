<template>
    <v-row>
        <ButtonEmitter
            v-for="i in 2"
            :key="i"
            :label="`Victory Team ${i}`"
            colour="yellow accent-4"
            eventName="victory"
            :dataValue="i - 1"
        />

    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue';
export default {
    components: { ButtonEmitter }
}
</script>