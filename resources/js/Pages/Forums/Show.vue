<script setup>
import { Link } from '@inertiajs/inertia-vue3';
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Avatar from "@/Components/Avatar.vue";
import AppLayout from "@/Layouts/AppLayout.vue";

defineProps({
    forum: Object,
})

</script>
<template>
    <app-layout title="Forums">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ forum.name }}</span>
        </template>
        <div class="y w-full space-y-2">
            <div>
                <h2 class="mx-2 font-bold text-2xl">{{ forum.name }}</h2>
                <p class="text-sm mx-2">{{ forum.description }}</p>
            </div>
            <div class="flex justify-between">
                <div class="w-full"></div>
                <div v-if="$page.props.auth" class="w-full flex justify-end">
                    <Link v-if="!forum.group_id || forum.group_id === $page.props.user.primary_group_id" :href="route('threads.create') + '?fid=' + forum.id" class="button">Create Thread</Link>
                </div>
            </div>
            <div v-for="subforum in forum.children" class="flex-col space-y-2">
                <h2 class="font-bold text-2xl">{{ subforum.name }}</h2>
            </div>
            <div v-if="forum.threads.length === 0">
                <span>no threads ;(</span>
            </div>
            <div v-for="thread in forum.threads" class="x items-center justify-between pane">
                <div class="x items-center gap-4">
                    <Avatar class="w-8" :user="thread.author"/>
                    <div class="y">
                        <Link :href="route('threads.show', thread)" class="font-bold text-lg">{{ thread.title }}</Link>
                        <span class="text-xs text-neutral-500 dark:text-neutral-400">By <Username :user="thread.author"/>, {{ new Date(thread.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}</span>
                    </div>
                </div>
                <div class="x items-center gap-4">
                    <div class="y text-center">
                        <span>{{ thread.views }}</span>
                        <span class="text-xs uppercase">VIEWS</span>
                    </div>
                    <div class="y text-center">
                        <span>{{ thread.posts_count }}</span>
                        <span class="text-xs uppercase">REPLIES</span>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
