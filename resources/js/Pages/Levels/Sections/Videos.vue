<script setup>
import Layout from "../Layout.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    level: Object,
    videos: Object
})
</script>
<template>
    <Layout :level="level">
        <div class="y space-y-2 !mt-0 bg-ui-950 border border-ui-900 rounded-lg px-4 py-2 space-x-2">
            <h2 class="font-bold text-2xl">Videos</h2>
            <Pagination :list="videos"/>
            <div v-if="videos.data.length === 0" class="pane text-center italic text-ui-600">No Videos</div>
            <div class="grid grid-cols-4">
                <VideoLightbox v-for="video in videos.data" :video="video" class="w-full"/>
            </div>
            <Pagination :list="videos"/>
        </div>
    </Layout>
</template>
