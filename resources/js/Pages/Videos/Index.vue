<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import getYouTubeID from "get-youtube-id";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'

const props = defineProps({
    videos: Object
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
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <h2 class="font-bold text-2xl">Videos</h2>
                <Pagination :list="videos"/>
                <div class="box" v-if="videos.data.length === 0">No videos ;(</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div v-for="video in videos.data" class="box">
                        <iframe class="!w-full" :src="'https://www.youtube.com/embed/' + video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <Pagination :list="videos"/>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <h2 class="font-bold text-2xl">Submit Video</h2>
                <div v-if="$page.props.auth" class="box">
                    <form @submit.prevent="submit" class="space-y-2">
                        <Input v-model="form.video_id" type="text" placeholder="YouTube Video Link" required/>
                        <Input v-model="form.level_id" type="text" placeholder="Level ID" required/>
                        <Button>Add</Button>
                    </form>
                </div>
                <div v-else class="box">
                    <span>You must be signed in to submit a video</span>
                </div>
            </div>
        </div>
    </app-layout>
</template>
