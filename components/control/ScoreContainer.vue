<template>
    <div class="score-container">
        <v-dialog
            v-model="dialog"
            width="max-content"
        >
            <template v-slot:activator="{on, attr}">
                <v-btn
                    color="primary"
                    v-bind="attr"
                    v-on="on"
                >Points</v-btn>
            </template>

            <v-card>
                <PointsPopup/>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import PointsPopup from "./PointsPopup.vue";
export default {
    data: () => {
        return {
            dialog: false
        };
    },
    components: { PointsPopup }
}
</script>

<style>
.score-container {
    display: flex;
    bottom: 4rem;
    position: fixed;
    width: 100%;
    justify-content: center;
}
</style>