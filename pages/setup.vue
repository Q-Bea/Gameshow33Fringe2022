<template>
    <div class="setup-page">
        <h1>Setup</h1>

        <br/>

        <v-container fluid>
            <v-row>
                <Players style="min-width: 400px;" />
                <Wheel style="min-width: 400px;"/>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Players from "~/components/setup/Players.vue";
import Wheel from "~/components/setup/Wheel.vue";
export default {
    beforeMount() {
        this.socket = this.$nuxtSocket({ withCredentials: true });
    },
    components: { Players, Wheel }
}
</script>