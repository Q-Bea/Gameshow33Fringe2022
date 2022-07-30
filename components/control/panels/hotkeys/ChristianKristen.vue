<template>
    <v-row>
        <ButtonEmitter
            colour="light-blue"
            eventName="show"
            dataValue="intro"
        >
        <div class="text-center">
            <p>Show:</p>
            <p>Intro</p>
        </div>
        </ButtonEmitter>

        <ButtonEmitter
            colour="purple lighten-2"
            eventName="show"
            dataValue="christian"
        >
        <div class="text-center">
            <p>Show:</p>
            <p>Christian</p>
        </div>
        </ButtonEmitter>

        <ButtonEmitter
            colour="purple lighten-1"
            eventName="show"
            dataValue="kristen"
        >
        <div class="text-center">
            <p>Show:</p>
            <p>Kristen</p>
        </div>
        </ButtonEmitter>

        <ButtonEmitter
            colour="blue-grey lighten-2"
            eventName="show"
            dataValue="separation"
        >
        <div class="text-center">
            <p>Show:</p>
            <p>Separation</p>
        </div>
        </ButtonEmitter>

        <ButtonEmitter
            colour="red lighten-1"
            eventName="blackout"
            label="Blackout"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue'
export default {
    components: {ButtonEmitter}
}
</script>