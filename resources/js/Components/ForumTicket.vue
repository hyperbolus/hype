<script setup>
import {Link} from '@inertiajs/inertia-vue3'
import Timestamp from "@/Components/Timestamp.vue";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    forum: Object
})
</script>
<template>
    <Link :href="route('forums.show', forum.slug)" class="x items-center rounded pl-4 bg-opacity-60 dark:bg-opacity-60 bg-white dark:bg-neutral-900 shadow transition hover:shadow-lg hover:bg-opacity-75 dark:hover:bg-opacity-75 gap-4" >
        <div class="x flex-grow justify-between">
            <div class="flex py-2 items-center space-x-4">
                <div class="transition-colors bg-neutral-200 dark:bg-neutral-800 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-xl">{{ forum.name }}</h2>
                    <p class="text-sm">{{ forum.description }}</p>
                </div>
            </div>
            <div class="x py-4 items-center text-center gap-2">
                <div class="y">
                    <h2>{{ forum.posts_count }}</h2>
                    <p class="text-xs">Posts</p>
                </div>
                <div class="y">
                    <h2>{{ forum.threads_count }}</h2>
                    <p class="text-xs">Threads</p>
                </div>
            </div>
        </div>
        <div class="py-3 rounded border-r border-r-neutral-300"></div>
        <div class="relative h-full w-1/4">
            <div v-if="false" class="x items-center absolute h-full w-full overflow-clip">
                <Avatar v-if="forum.last_post" class="scale-75 opacity-30 absolute -right-1/3" :user="forum.last_post.author"/>
            </div>
            <div v-if="forum.last_post" class="y pr-2 py-4 w-full">
                <Link :href="route('threads.show', forum.last_post.thread)" class="z-10 font-bold text-sm">{{ forum.last_post.thread.title }}</Link>
                <span class="z-10 text-xs"><Username :user="forum.last_post.author"/> &bull; <Timestamp :time="forum.last_post.created_at"/></span>
            </div>
        </div>
    </Link>
</template>
