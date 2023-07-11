<script setup>
const props = defineProps({
    user: Object,
    size: {
        type: String,
        default: 'sm'
    }
});
</script>
<template>
    <span v-if="[14].includes(user.id)" class="rounded-sm font-bold text-xs px-1 bg-blue-500 uppercase mr-1">Bot</span>
    <span v-else-if="user.flag" class="fflag rounded-sm" :class="`ff-${size} fflag-${user.flag}`"></span>
</template>
