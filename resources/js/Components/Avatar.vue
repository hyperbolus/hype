<script setup>
const props = defineProps({
    user: Object
})
</script>
<template>
    <img class="rounded-full" :src="user.avatar_url ?? '/api/avatar?name=' + user.name" alt="avatar"/>
</template>
