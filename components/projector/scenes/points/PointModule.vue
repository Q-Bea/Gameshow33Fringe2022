<template>
    <div>
        <p>{{name}}</p>
        <p>{{points}}</p>
    </div>
</template>

<script>
export default {
    props: ['name', 'points']
}
</script>