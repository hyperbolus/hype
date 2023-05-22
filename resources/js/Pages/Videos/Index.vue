<script setup>
import {Link, useForm} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import getYouTubeID from "get-youtube-id";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import AppLayout from "@/Layouts/Dash.vue";
import Lightbox from "@/Components/Lightbox.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";

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
    <app-layout title="Videos">
        <template #breadcrumbs>
            <Link :href="route('videos.index')">Videos</Link>
        </template>
        <div class="flex flex-col space-y-4 md:w-3/4">
            <h2 class="font-bold text-2xl">Videos</h2>
            <Pagination :list="videos"/>
            <div v-if="videos.total === 0" class="pane text-center italic text-neutral-400 dark:text-neutral-500">No Videos ;(</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <VideoLightbox v-for="video in videos.data" :video="video" class="w-full"/>
            </div>
            <Pagination :list="videos"/>
        </div>
        <div class="flex flex-col space-y-4 md:w-1/4">
            <h2 class="font-bold text-2xl">Submit Video</h2>
            <div v-if="$page.props.auth" class="glass p-4">
                <form @submit.prevent="submit" class="space-y-2">
                    <Input v-model="form.video_id" type="text" placeholder="YouTube Video Link" required/>
                    <Input v-model="form.level_id" type="text" placeholder="Level ID" required/>
                    <Button>Add</Button>
                </form>
            </div>
            <div v-else class="pane">
                <span>You must <Link class="underline" :href="route('auth::login')">log in</Link> to submit a video</span>
            </div>
        </div>
    </app-layout>
</template>
