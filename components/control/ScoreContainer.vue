<template>
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
                :style="`bottom: 2.5rem; left: 50%; transform: translateX(-50%); opacity: ${opacity}%;`"
                fixed
                @mouseenter="hover(true)"
                @mouseleave="hover(false)"
            >Points</v-btn>
        </template>

        <v-card>
            <PointsPopup/>
        </v-card>
    </v-dialog>
</template>

<script>
import PointsPopup from "./PointsPopup.vue";
export default {
    computed: {
        opacity() {
            return this.dialog ? 100 : this.baseOpacity
        }
    },
    data: () => {
        return {
            dialog: false,
            baseOpacity: 40
        };
    },
    methods: {
        hover(on) {
            this.baseOpacity = on ? 100 : 50
        }
    },
    components: { PointsPopup }
}
</script>