<script setup>
import {Link, useForm, usePage} from '@inertiajs/inertia-vue3';
import route from "ziggy-js";
import CommonLayout from "@/Layouts/CommonLayout.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    playlist: Object
})
</script>
<template>
    <common-layout :title="playlist.title">
        <template #breadcrumbs>
            <Link :href="route('playlists.index')">Playlists</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="$page.props.url">{{ playlist.title }}</Link>
        </template>
        <div class="y space-y-4 w-full">
            <div class="x items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">{{ playlist.title }}</h2>
                    <span class="text-sm">Created by <Username :user="playlist.owner"/>, {{ new Date(playlist.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Playlist ID: {{ playlist.id }}</span>
                </div>
                <div class="x space-x-2">
                    <Link :href="route('roulette') + `?type=playlist&id=${playlist.id}&seed=${Math.floor(Math.random() * (99999 - 10000) + 99999)}`" class="button">Roulette</Link>
                    <Link :href="route('playlists.edit', playlist)" class="button">Edit</Link>
                    <Link :href="route('submissions.create', playlist)" class="button">Submit Level</Link>
                </div>
            </div>
            <div class="box" v-if="playlist.submissions.length === 0">This playlist has no levels</div>
            <Link v-for="submission in playlist.submissions" :href="route('levels.show', submission.level.id)" class="block y p-2 rounded bg-neutral-900 border border-neutral-700">
                <div class="x justify-between">
                    <h1 class="text-xl font-bold">{{ submission.level.name }}</h1>
                    <div>
                        <span>Submitted By: {{ submission.submitter ? submission.submitter.name : 'Anonymous'  }}</span>
                    </div>
                </div>
                <h6 class="text-sm">{{ submission.level.creator }}</h6>
                <p>{{ submission.level.description }}</p>
            </Link>
        </div>
    </common-layout>
</template>
