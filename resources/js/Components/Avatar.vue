<script setup>
const props = defineProps({
    user: Object
})



</script>
<template>
    <img class="rounded-full bg-neutral-100 dark:bg-neutral-800" :src="user.avatar_url ?? 'https://ui-avatars.com/api/?background=random&size=256&rounded=true&&format=svg&name=' + user.name" alt="avatar"/>
</template>
