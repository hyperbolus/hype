<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Link } from '@inertiajs/inertia-vue3';

defineProps({
    forum: Object,
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ forum.name }}</span>
        </template>
        <div class="flex flex-col lg:max-w-5xl xl:max-w-6xl w-full space-y-4 p-4">
            <div>
                <h2 class="mx-2 font-bold text-2xl">{{ forum.name }}</h2>
                <p class="mx-2">{{ forum.description }}</p>
            </div>
            <div class="flex justify-between">
                <div class="w-full"></div>
                <div class="w-full flex justify-center">
                    <div class="flex w-fit rounded bg-neutral-900">
                        <div class="px-2 py-1">1</div>
                        <div class="px-2 py-1 border-l border-l-neutral-700">2</div>
                        <div class="px-2 py-1 border-l border-l-neutral-700">3</div>
                    </div>
                </div>
                <div class="w-full flex justify-end">
                    <Link :href="route('threads.create') + '?fid=' + forum.id" class="rounded px-2 py-1 bg-neutral-900 border border-neutral-700">Create Thread</Link>
                </div>
            </div>
            <div v-for="subforum in forum.children" class="flex-col space-y-2">
                <h2 class="font-bold text-2xl">{{ subforum.name }}</h2>
            </div>
            <div v-if="forum.threads.length === 0">
                <span>no threads ;(</span>
            </div>
            <div v-for="thread in forum.threads" class="flex px-2 py-2 rounded bg-neutral-900 border border-neutral-700">
                <Link :href="route('threads.show', thread)" class="font-bold text-2xl">{{ thread.title }}</Link>
            </div>
        </div>
    </app-layout>
</template>
