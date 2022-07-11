<template>
    <v-card 
        class="wheelOption"
        :color="highlight ? 'primary' : undefined"
    >
        <p>{{name}}</p>
    </v-card>
</template>

<script>
export default {
    props: ["name", "highlight"]
}
</script>

<style scoped>
p {
    text-align: center;
    justify-content: center;
    height: 120px;
}
</style>