<!-- eslint-disable vue/html-closing-bracket-spacing -->
<template>
    <v-container fluid>
        <div class="page-header">
            <h1>Game Show 33</h1>

            <p>Welcome, please select a destination below:</p>
        </div>

        <br/>

        <v-row style="justify-content: center;">
            <v-card
                width="300"
                elevation="3"
                style="margin: 5px;"
            >
                <v-card-title>
                    <v-icon
                        left
                    >mdi-laptop
                    </v-icon>
                    Control Panel
                </v-card-title>
                <v-card-text>
                    Control the show visuals and sound (login required)
                </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn to="/control" text>Launch</v-btn>
                </v-card-actions>
            </v-card>

            <v-card
                width="300"
                elevation="3"
                style="margin: 5px;"
            >
                <v-card-title>
                    <v-icon left>mdi-keyboard</v-icon>
                    Hotkeys
                </v-card-title>

                <v-card-text>
                    Connect to the control panel with a screen just for quick-fire triggers (login required)
                </v-card-text>

                <v-card-actions style="justify-content: center;">
                    <v-btn to="/hotkeys" text>Launch</v-btn>
                </v-card-actions>
            </v-card>

            <v-card
                width="300"
                elevation="3"
                style="margin: 5px;"
            >
                <v-card-title>
                    <v-icon left>mdi-cog</v-icon>
                    Setup
                </v-card-title>

                <v-card-text>
                    Configure settings like player names or other data that changes night-to-night
                </v-card-text>

                <v-card-actions style="justify-content: center;">
                    <v-btn to="/setup" text>Launch</v-btn>
                </v-card-actions>
            </v-card>

            <v-card
                width="300"
                elevation="3"
                style="margin: 5px;"
            >
                <v-card-title>
                    <v-icon left>mdi-projector</v-icon>
                    Projector
                </v-card-title>

                <v-card-text>
                    Open the projection screen which display content chosen by the controller
                </v-card-text>

                <v-card-actions style="justify-content: center;">
                    <v-btn to="/projector" text>Launch</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>

export default {
    head: {
        title: "Game Show 33 | Home"
    }
}
</script>

<style scoped>
.page-header {
    text-align: center;
    margin-top: 5rem;
}
</style>