<script setup>
import {Link} from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import QueryResults from "@/Components/QueryResults.vue";
import route from "ziggy-js";
import look from "../../../images/playlist_look.png"
import PlaylistTicket from "@/Components/PlaylistTicket.vue";

const props = defineProps({
    playlists: Object,
    sorting: Object
});
</script>
<template>
    <app-layout>
        <div class="md:w-3/4">
            <QueryResults :sorting="sorting" :url="route('playlists.index')" title="Playlists" :results="playlists" container-classes="y space-y-2" v-slot="{ item, key }">
                <PlaylistTicket :playlist="item" :key="key"/>
            </QueryResults>
        </div>
        <div class="y space-y-4 md:w-1/4">
            <h2 class="font-bold text-2xl mx-2">More</h2>
            <Link :href="route('playlists.create')" class="rounded-lg text-ui-100 px-4 py-2 shadow bg-ui-700 !mt-2">
                Create a Playlist
            </Link>
            <img :src="look" alt=""/>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
