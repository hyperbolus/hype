<script setup>
const props = defineProps({
    user: Object,
    size: {
        type: String,
        default: 'md'
    }
});
</script>
<template>
    <span v-if="user.flag" class="fflag" :class="`ff-${size} fflag-${user.flag}`"></span>
</template>
