<template>
    <v-container fluid
        style="position: fixed; bottom: 3rem; pointer-events: none;"
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
                        color="purple darken-2"
                        v-bind="attr"
                        v-on="on"
                        dark
                        style="pointer-events: auto;"
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