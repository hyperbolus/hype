<script setup>
import {Link} from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/AppLayout.vue";

const props = defineProps({
    playlists: Object
})
</script>
<template>
    <app-layout title="Playlists">
        <template #breadcrumbs>
            <Link :href="$page.props.url">Playlists</Link>
        </template>
        <div class="y space-y-4 md:w-3/4">
            <h2 class="mx-2 font-bold text-2xl">Playlists</h2>
            <Link v-for="playlist in playlists" :href="route('playlists.show', playlist.id)" class="block y pane">
                <div class="x items-center justify-between">
                    <h1 class="text-xl font-bold">{{ playlist.title }}</h1>
                    <span></span>
                </div>
                <div class="x items-center justify-between">
                    <p>{{ playlist.description }}</p>
                    <span></span>
                </div>
            </Link>
        </div>
        <div class="y space-y-4 md:w-1/4">
            <h2 class="font-bold text-2xl mx-2">More</h2>
            <Link :href="route('playlists.create')" class="rounded text-neutral-100 px-4 py-2 shadow border border-neutral-300 dark:border-neutral-700 bg-cyan-400">
                Create a Playlist
            </Link>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
