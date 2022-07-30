<!-- eslint-disable vue/html-closing-bracket-spacing -->
<template>
    <v-container fluid>
        <div class="page-header">
            <h1>Game Show 33</h1>

            <p>Welcome, please select a destination below:</p>
        </div>

        <br/>

        <v-row style="justify-content: center;">
            <IndexCard
                description="Control the show visuals and sound (login required)"
                title="Control Panel"
                icon="mdi-laptop"
                to="control"
            />

            <IndexCard
                description="Connect to the control panel with a screen just for quick-fire triggers (login required)"
                title="Hotkeys"
                icon="mdi-keyboard"
                to="hotkeys"
            />

            <IndexCard
                description="Configure settings like player names or other data that changes night-to-night"
                title="Setup"
                icon="mdi-setup"
                to="setup"
            />

            <IndexCard
                description="Open the projection screen which display content chosen by the controller"
                title="Projector"
                icon="mdi-projector"
                to="projector"
            />

            <IndexCard
                description="Open the fullscreen clock which can flash to alert actors"
                title="Clock"
                icon="mdi-clock"
                to="clock"
            />
        </v-row>
    </v-container>
</template>

<script>
import IndexCard from '~/components/indexCard.vue';

export default {
    head: {
        title: "Game Show 33 | Home"
    },
    components: { IndexCard }
}
</script>

<style scoped>
.page-header {
    text-align: center;
    margin-top: 5rem;
}
</style>