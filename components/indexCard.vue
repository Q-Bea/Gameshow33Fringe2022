<template>
    <v-card
        width="300"
        elevation="3"
        style="margin: 5px;"
    >
        <v-card-title>
            <v-icon
                left
            >{{icon}}
            </v-icon>
            {{title}}
        </v-card-title>
        <v-card-text>
            {{description}}
        </v-card-text>
        <v-card-actions style="justify-content: center;">
            <v-btn :to="`/${to}`" text>Launch</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ["icon", "title", "description", "to"]
}
</script>