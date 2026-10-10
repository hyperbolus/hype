<script setup>
import UserLayout from "@/Pages/Users/Partials/UserLayout.vue";
import QueryResults from "@/Components/QueryResults.vue";
import PlaylistTicket from "@/Components/PlaylistTicket.vue";
import {Link} from "@inertiajs/vue3";

const props = defineProps({
    profile: Object,
    playlists: Object,
    sorting: Object
});
</script>
<template>
    <UserLayout :profile="profile">
        <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-2xl">Playlists</h2>
            <Link class="rounded-lg bg-blue-500 px-3 py-1 font-bold text-white" :href="route('playlists.create')">New Playlist</Link>
        </div>
        <QueryResults :sorting="sorting" :results="playlists" v-slot:default="{ item }" container-classes="y space-y-2">
            <PlaylistTicket :playlist="item"/>
        </QueryResults>
    </UserLayout>
</template>
