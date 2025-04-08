<script setup>
import VideoLightbox from "@/Components/VideoLightbox.vue";
import UserLayout from "@/Pages/Users/Partials/UserLayout.vue";
import QueryResults from "@/Components/QueryResults.vue";

const props = defineProps({
    profile: Object,
    videos: Object,
    sorting: Object
});
</script>
<template>
    <UserLayout :profile="profile">
        <QueryResults title="Videos" :sorting="sorting" :results="videos" v-slot="{ item }" :delay="25" container-classes="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <VideoLightbox :video="item" class="w-full"/>
        </QueryResults>
    </UserLayout>
</template>
