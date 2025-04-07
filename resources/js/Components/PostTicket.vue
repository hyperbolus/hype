<script setup>
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from "ziggy-js";
import {Link} from '@inertiajs/vue3'

const props = defineProps({
    post: Object
});
</script>
<template>
    <div class="x items-center space-x-4 pane">
        <Avatar class="w-8" :user="post.author"/>
        <div class="y">
            <Link :href="route('posts.show', post.id)" class="font-bold text-lg">{{ post.thread.title }}</Link>
            <div class="x items-center text-xs text-ui-400">
                <span>By,</span>
                <Username class="ml-1" :user="post.author"/>
                <span>, {{ new Date(post.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}</span>
            </div>
        </div>
    </div>
</template>
