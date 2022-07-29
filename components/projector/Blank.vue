<template>
    <div class="blank"></div>
</template>

<style scoped>
.blank {
    background-color: black;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left:0;
    top: 0;
}
</style>

<script>
export default {
    mounted() {
        this.$nuxt.$on("displayEvent", (data) => {
            if (data != undefined) {
                if (data.eventName === "refreshProjector") {
                    window.location.reload();
                }
            }
        })
    }
}
</script>