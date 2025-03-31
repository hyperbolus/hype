<script setup>
const props = defineProps({
    user: Object
})
</script>
<template>
    <span class="text-base font-normal">{{ user.banned_at ? 'Banned' : user.custom_title ?? (user.primary_group_id === 1 ? 'Administrator' : 'Junior Member') }}</span>
</template>
