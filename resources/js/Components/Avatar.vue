<script setup>
import {Link} from "@inertiajs/vue3";
import route from "ziggy-js";
import kitty from "@/../images/kitty.png"

const props = defineProps({
    user: Object,
    width: String,
    link: Boolean
})
</script>
<template>
    <component :is="link ? Link : 'span'" :href="link ? route('users.show', user.id) : null" class="relative">
        <span class="absolute z-0 rounded-full bg-ui-700 animate-pulse inset-0"></span>
        <div v-if="false && user.flag?.length > 2" class="absolute z-20 -inset-[20%] pointer-events-none">
            <img alt="" :src="kitty">
        </div>
        <img class="relative z-10 rounded-full" :src="user.avatar_url ?? '/api/avatar?name=' + user.name" alt="avatar" :class="width ?? 'w-8'"/>
    </component>
</template>
