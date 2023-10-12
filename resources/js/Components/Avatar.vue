<script setup>
import {Link} from "@inertiajs/vue3";
import route from "ziggy-js";

const props = defineProps({
    user: Object,
    width: String,
    link: Boolean
})
</script>
<template>
    <component :is="link ? Link : 'span'" :href="link ? route('users.show', user.id) : null" class="relative">
        <span class="absolute z-0 rounded-full bg-ui-700 animate-pulse inset-0"></span>
        <img class="relative z-10 rounded-full" :src="user.avatar_url ?? '/api/avatar?name=' + user.name" alt="avatar" :class="width ?? 'w-8'"/>
    </component>
</template>
