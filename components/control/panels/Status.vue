<template>
    <div class="panel-scene">
        <v-card-text>
            Current Display: {{current}}<br/>
            Pending Display: {{pending}}
        </v-card-text>
    </div>
</template>

<script>
export default {
    computed: {
        current() {
            return this.$store.state.display.current
        },
        pending() {
            return this.$store.state.display.pending
        }
    }
}
</script>