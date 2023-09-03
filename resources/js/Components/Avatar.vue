<script setup>
const props = defineProps({
    user: Object,
    width: String
})
</script>
<template>
    <span class="relative">
        <span class="absolute z-0 rounded-full bg-ui-700 animate-pulse inset-0"></span>
        <img class="relative z-10 rounded-full" :src="user.avatar_url ?? '/api/avatar?name=' + user.name" alt="avatar" :class="width ?? 'w-8'"/>
    </span>
</template>
