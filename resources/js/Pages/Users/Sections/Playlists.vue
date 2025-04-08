<script setup>
import UserLayout from "@/Pages/Users/Partials/UserLayout.vue";
import QueryResults from "@/Components/QueryResults.vue";
import PlaylistTicket from "@/Components/PlaylistTicket.vue";

const props = defineProps({
    profile: Object,
    playlists: Object,
    sorting: Object
});
</script>
<template>
    <UserLayout :profile="profile">
        <QueryResults title="Playlists" :sorting="sorting" :results="playlists" v-slot="{ item }" container-classes="y space-y-2">
            <PlaylistTicket :playlist="item"/>
        </QueryResults>
    </UserLayout>
</template>
