<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";

const props = defineProps({
    playlists: Object
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('playlists.index')">Playlists</Link>
        </template>
        <div class="x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="y space-y-4 md:w-3/4">
                <h2 class="mx-2 font-bold text-2xl">Playlists</h2>
                <Link v-for="playlist in playlists" :href="route('playlists.show', playlist.id)" class="block y box">
                    <div class="x items-center justify-between">
                        <h1 class="text-xl font-bold">{{ playlist.title }}</h1>
                        <span>visibility: {{ playlist.visibility }}</span>
                    </div>
                    <div class="x items-center justify-between">
                        <p>{{ playlist.description }}</p>
                        <span>collaboration: {{ playlist.collaboration }}</span>
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
        </div>
    </app-layout>
</template>
