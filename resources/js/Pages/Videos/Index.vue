<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import getYouTubeID from "get-youtube-id";

const props = defineProps({
    videos: Array
})

const form = useForm({
    level_id: null,
    video_id: ''
})

const submit = () => {
    form.post(route('videos.store'))
    form.transform(data => ({
        ...data,
        video_id: getYouTubeID(form.video_id),
    })).post(route('videos.store'), {
        onFinish: () => form.reset('video_id', 'level_id'),
    });
}


</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('videos.index')">Videos</Link>
        </template>
        <div class="flex max-w-6xl w-full gap-4 py-4">
            <div class="flex flex-col space-y-4 w-3/4">
                <h2 class="font-bold text-2xl">Videos</h2>
                <div v-for="video in videos" class="rounded px-4 py-2 space-y-2 bg-gray-50 border border-gray-300">
                    <div class="flex items-center space-x-2 justify-between">
                        <iframe class="w-fit" :src="'https://www.youtube.com/embed/' + video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-4 w-1/4">
                <h2 class="font-bold text-2xl">Submit Video</h2>
                <div v-if="$page.props.auth" class="rounded bg-gray-50 p-4 border border-gray-300">
                    <form @submit.prevent="submit" class="space-y-2">
                        <Input v-model="form.video_id" placeholder="YouTube Video Link" class="p-2" required/>
                        <Input v-model="form.level_id" placeholder="Level ID" class="p-2" required/>
                        <Button>Add</Button>
                    </form>
                </div>
                <div v-else class="rounded bg-gray-50 p-4 border border-gray-300">
                    <span>You must be signed in to submit a video</span>
                </div>
            </div>
        </div>
    </app-layout>
</template>
