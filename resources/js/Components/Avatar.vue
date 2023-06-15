<script setup>
const props = defineProps({
    user: Object
})
</script>
<template>
    <span class="relative aspect-square rounded-full overflow-hidden">
        <span class="absolute -z-10 bg-ui-700 animate-pulse inset-0"></span>
        <img :src="user.avatar_url ?? '/api/avatar?name=' + user.name" alt="avatar"/>
    </span>
</template>
