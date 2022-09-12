<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm, usePage} from '@inertiajs/inertia-vue3';
import route from "ziggy-js";

const props = defineProps({
    playlist: Object
})
</script>
<template>
    <app-layout :title="playlist.title">
        <template #breadcrumbs>
            <Link :href="route('playlists.index')">Playlists</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ playlist.title }}</span>
        </template>
        <div class="flex flex-col lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">{{ playlist.title }}</h2>
                    <span class="text-sm">Created by {{ playlist.owner.name }}, {{ new Date(playlist.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Playlist ID: {{ playlist.id }}</span>
                </div>
                <div>
                    <Link :href="route('submissions.create', playlist)" class="px-4 py-2 rounded bg-neutral-900">Submit Level</Link>
                </div>
            </div>
            <Link v-for="submission in playlist.submissions" :href="route('levels.show', submission.level.id)" class="block flex flex-col p-2 rounded bg-neutral-900 border border-neutral-700">
                <div class="flex justify-between">
                    <h1 class="text-xl font-bold">{{ submission.level.name }}</h1>
                    <div>
                        <span>Submitted By: {{ submission.submitter.name }}</span>
                    </div>
                </div>
                <h6 class="text-sm">{{ submission.level.creator }}</h6>
                <p>{{ submission.level.description }}</p>
            </Link>
        </div>
    </app-layout>
</template>
