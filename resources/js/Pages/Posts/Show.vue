<script setup>
import {Link, useForm, usePage} from '@inertiajs/vue3';
import route from "ziggy-js";
import Post from "@/Components/Post.vue";
import PostPad from "@/Components/PostPad.vue";
import AppLayout from "@/Layouts/Dash.vue";
import {ref} from "vue"

const props = defineProps({
    post: Object
})
</script>
<template>
    <app-layout :title="post.thread.title">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('forums.show', post.thread.forum.slug)">{{ post.thread.forum.name }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ post.thread.title }}</span>
        </template>
        <div class="y w-full space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">Viewing Post from {{ post.thread.title }}</h2>
                    <span class="text-sm">Thread by {{ post.thread.author.name }}, {{ new Date(post.thread.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Thread ID: {{ post.thread.id }}</span>
                </div>
                <div class="space-x-2">
                    <Link class="button" :href="route('threads.show', post.thread)">Back to Thread</Link>
                </div>
            </div>
            <Post :post="post" :op="post.thread.author.id"/>
        </div>
    </app-layout>
</template>
