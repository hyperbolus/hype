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
    <span v-if="user.flag" class="fflag" :class="`ff-${size} fflag-${user.flag}`"></span>
</template>
