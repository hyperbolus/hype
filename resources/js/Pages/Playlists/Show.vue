<script setup>
import {Link} from '@inertiajs/vue3';
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";
import Username from "@/Components/Username.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import {getUser, isAuthenticated} from "@/util.js";

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
            <Link :href="$page.props.url">{{ playlist.title }}</Link>
        </template>
        <div class="y space-y-4 w-full">
            <div class="x items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">{{ playlist.title }}</h2>
                    <span class="text-sm">Created by <Username :pop-under="true" :user="playlist.owner"/>, {{ new Date(playlist.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Playlist ID: {{ playlist.id }}</span>
                </div>
                <div class="x space-x-2">
                    <Link :href="route('roulette') + `?type=playlist&id=${playlist.id}&seed=${Math.floor(Math.random() * (99999 - 10000) + 99999)}`" class="button">Roulette</Link>
                    <Link v-if="isAuthenticated() && playlist.owner_id === getUser().id" :href="route('playlists.edit', playlist.id)" class="button">Edit</Link>
                    <Link v-if="playlist.collaboration === 'public' || (isAuthenticated() && playlist.owner_id === getUser().id)" :href="route('submissions.create', playlist.id)" class="button">Submit Level</Link>
                </div>
            </div>
            <p class="pane">{{ playlist.description ?? 'This playlist has no description' }}</p>
            <div class="pane" v-if="playlist.submissions.length === 0">This playlist has no levels</div>

            <div v-for="submission in playlist.submissions" class="bg-ui-800 rounded-lg">
                <div class="px-2 py-1">
                    <span>Submitted By: {{ submission.submitter ? submission.submitter.name : 'Anonymous'  }}</span>
                </div>
                <LevelTicket :level="submission.level"/>
            </div>
        </div>
    </app-layout>
</template>
