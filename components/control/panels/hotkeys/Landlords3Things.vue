<template>
    <v-row>
        <ButtonEmitter
            v-for="i in 5"
            :key="i"
            eventName="show"
            :dataValue="i"
            colour="blue lighten-1"
        >
            <div class="text-center">
                <p>Show:</p>
                <p>Question {{i}}</p>
            </div>
        </ButtonEmitter>

        <ButtonEmitter
            eventName="blackout"
            label="Blackout"
            colour="red lighten-1"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue';
export default {
    components: { ButtonEmitter }
}
</script>