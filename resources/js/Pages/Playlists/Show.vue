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
    <app-layout>
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
