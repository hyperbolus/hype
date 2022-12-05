<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import getYouTubeID from "get-youtube-id";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import CommonLayout from "@/Layouts/CommonLayout.vue";

const props = defineProps({
    videos: Object
})

const form = useForm({
    level_id: null,
    video_id: ''
})

const submit = () => {
    form.transform(data => ({
        ...data,
        video_id: getYouTubeID(form.video_id),
    })).post(route('videos.store'), {
        onFinish: () => form.reset('video_id', 'level_id'),
    });
}


</script>
<template>
    <common-layout>
        <template #breadcrumbs>
            <Link :href="route('videos.index')">Videos</Link>
        </template>
        <div class="flex flex-col space-y-4 md:w-3/4">
            <h2 class="font-bold text-2xl">Videos</h2>
            <Pagination :list="videos"/>
            <div class="pane" v-if="videos.data.length === 0">No videos ;(</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div v-for="video in videos.data" class="pane">
                    <iframe class="!w-full" :src="'https://www.youtube.com/embed/' + video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <Pagination :list="videos"/>
        </div>
        <div class="flex flex-col space-y-4 md:w-1/4">
            <h2 class="font-bold text-2xl">Submit Video</h2>
            <div v-if="$page.props.auth" class="pane">
                <form @submit.prevent="submit" class="space-y-2">
                    <Input v-model="form.video_id" type="text" placeholder="YouTube Video Link" required/>
                    <Input v-model="form.level_id" type="text" placeholder="Level ID" required/>
                    <Button>Add</Button>
                </form>
            </div>
            <div v-else class="pane">
                <span>You must be signed in to submit a video</span>
            </div>
        </div>
    </common-layout>
</template>
