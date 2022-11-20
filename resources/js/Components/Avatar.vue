<script setup>
const props = defineProps({
    user: Object
})



</script>
<template>
    <img class="rounded-full" :src="user.avatar_url ?? 'https://ui-avatars.com/api/?background=random&size=256&rounded=true&&format=svg&name=' + user.name" alt="avatar"/>
</template>
