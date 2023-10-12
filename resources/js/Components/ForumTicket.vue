<script setup>
import {Link} from '@inertiajs/vue3'
import Timestamp from "@/Components/Timestamp.vue";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    forum: Object
})
</script>
<template>
    <div class="x items-stretch items-center rounded-lg bg-opacity-60 bg-ui-900 shadow transition hover:shadow-lg hover:bg-opacity-75 gap-4 px-4">
        <div class="x space-x-4 grow">
            <div class="x items-center my-4">
                <div class="transition-colors bg-ui-800 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </div>
            </div>
            <Link :href="route('forums.show', forum.slug)" class="y justify-center py-2 grow">
                <h2 class="text-lg">{{ forum.name }}</h2>
                <p class="text-sm break-all">{{ forum.description }}</p>
            </Link>
            <div class="x items-center text-center gap-2">
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
        <div class="hidden md:block py-3 rounded border-r border-r-ui-300 self-center"></div>
        <div class="hidden md:flex justify-between w-1/4 shrink-0">
            <div v-if="forum.last_post" class="y w-full justify-center">
                <Link :href="route('threads.show', forum.last_post.thread)" class="z-10 font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis">{{ forum.last_post.thread.title }}</Link>
                <div class="flex flex-col-reverse lg:flex-row lg:items-center text-xs">
                    <Username :user="forum.last_post.author"/>
                    <span class="hidden lg:inline px-1">&bull;</span>
                    <Timestamp :time="forum.last_post.created_at"/>
                </div>
            </div>
            <div v-else class="y justify-center">
                <span class="z-10 font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis opacity-50">No posts</span>
            </div>
        </div>
        <div class="x items-center shrink-0">
            <Avatar :link="true" v-if="forum.last_post" width="w-10" :user="forum.last_post.author"/>
        </div>
    </div>
</template>
