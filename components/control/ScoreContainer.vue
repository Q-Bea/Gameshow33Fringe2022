<template>
    <v-container fluid
        style="position: fixed; bottom: 3rem;"
    >
        <v-row
            justify="center"
            style="width: 100%;"
        >
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
        </v-row>
    </v-container>
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