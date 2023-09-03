<script setup>
const props = defineProps({
    user: Object
})
</script>
<template>
    <span>{{ user.primary_group_id === 1 ? 'Administrator' : 'Junior Member' }}</span>
</template>
