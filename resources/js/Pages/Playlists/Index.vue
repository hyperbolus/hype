<script setup>
import {Link} from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";

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
            <Pagination :list="playlists"/>
            <Link v-for="playlist in playlists.data" :href="route('playlists.show', playlist.id)" class="block y pane">
                <div class="x items-center justify-between">
                    <h1 class="text-xl font-bold">{{ playlist.title }}</h1>
                    <span></span>
                </div>
                <div class="x items-center justify-between">
                    <p>{{ playlist.description }}</p>
                    <span></span>
                </div>
            </Link>
            <Pagination :list="playlists"/>
        </div>
        <div class="y space-y-4 md:w-1/4">
            <h2 class="font-bold text-2xl mx-2">More</h2>
            <Link :href="route('playlists.create')" class="rounded-lg text-ui-100 px-4 py-2 shadow bg-ui-700">
                Create a Playlist
            </Link>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
