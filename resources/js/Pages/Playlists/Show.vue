<script setup>
import {Link, useForm} from '@inertiajs/vue3';
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";
import Username from "@/Components/Username.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import {getUser, isAuthenticated, isUser} from "@/util.js";

const props = defineProps({
    playlist: Object
})

const deleteSubmission = (id) => {
    useForm({}).delete(route('submissions.destroy', id), {
        preserveScroll: true
    })
}
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

            <div class="y space-y-1">
                <div v-for="submission in playlist.submissions" class="x items-center">
                    <div v-if="playlist.type === 'ordered'" class="text-xl font-bold mr-2 text-center w-16 bg-ui-900 rounded-md px-1 relative">#{{ parseInt(submission.rank.split('-')[1] ?? 0) + 1 }}</div>
                    <div class="relative grow">
                        <LevelTicket v-if="submission.level" :key="submission.id" :level="submission.level" :show-ratings="false">
                            <template #context-additions>
                                <button v-if="isUser(playlist.owner_id)" @click="deleteSubmission(submission.id)" class="px-2 py-1 hover:bg-ui-900 text-red-500 text-left rounded-t-lg">Remove From Playlist</button>
                            </template>
                        </LevelTicket>
                        <div class="x items-center justify-between absolute right-1 bottom-1 z-20 space-x-1">
                            <span v-if="playlist.attribution === 'shown' || (playlist.attribution === 'others' && playlist.owner_id !== submission.submitter_id)" class="bg-ui-800 border border-ui-700 rounded-lg px-2">From: {{ submission.submitter ? submission.submitter.name : 'Anonymous'  }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
