<template>
    <v-row>
        <ButtonEmitter
            label="Next"
            eventName="next"
            colour="blue lighten-1"
        />

        <ButtonEmitter
            label="Back"
            eventName="back"
            colour="red darken-1"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue';
export default {
    components: { ButtonEmitter, ButtonEmitter },

    created() {
        this.$emit("mounted")
    }
}
</script>