<template>
    <v-row>
        <ButtonEmitter
            label="Show Name"
            eventName="showName"
            colour="purple lighten-2"
        />

        <ButtonEmitter
            colour="light-blue lighten-1"
            v-for="image in knownImages"
            :key="image"
            eventName="showImage"
            :dataValue="image"
        >
            <div class="text-center">
                <p>Show Image:</p>
                <p>{{image}}</p>
            </div>
        </ButtonEmitter>

        <ButtonEmitter
            label="Blackout"
            eventName="blackout"
            colour="red lighten-1"
        />
    </v-row>
</template>

<script>
import ButtonEmitter from './generic/ButtonEmitter.vue'
export default {
    data() {
        return {
            knownImages: []
        };
    },
    async fetch() {
        try {
            this.knownImages = (await this.$axios.$get("/api/getDisplayAssetNames/games/SlapDicks/images")).names;
        }
        catch (e) {
            //Oh well FIXME??
        }
    },
    components: { ButtonEmitter, ButtonEmitter }
}
</script>