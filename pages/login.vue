<template>
    <div class="login-container">
        <h1>Welcome</h1>

        <p>Login by clicking below</p>

        <v-btn 
            @click="$auth.loginWith('auth0');spin=true"
            :loading="spin"
            width="30%"
            color="success"
        >Login</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            spin: false
        }
    }
}
</script>

<style scoped>
.login-container {
    padding-top: 10rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}

h1, p {
    text-align: center;
}

p {
    padding-top: 1rem;
    padding-bottom: 1rem;

    font-size: larger;
}
</style>