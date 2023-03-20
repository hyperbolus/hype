<script setup>
import {Link, useForm} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import getYouTubeID from "get-youtube-id";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import AppLayout from "@/Layouts/Dash.vue";
import Lightbox from "@/Components/Lightbox.vue";

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
    <app-layout>
        <template #breadcrumbs>
            <Link :href="route('videos.index')">Videos</Link>
        </template>
        <div class="flex flex-col space-y-4 md:w-3/4">
            <h2 class="font-bold text-2xl">Videos</h2>
            <Pagination :list="videos"/>
            <div class="pane" v-if="videos.data.length === 0">No videos ;(</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <Lightbox v-for="video in videos.data" class="w-full">
                    <img class="w-full aspect-video object-cover rounded glass" loading="lazy" :src="`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`" alt="Thumbnail"/>
                    <template #content>
                        <div class="y space-y-2">
                            <iframe class="rounded box !px-0 !py-0 aspect-video h-[60vh]" :src="'https://www.youtube-nocookie.com/embed/' + video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="x gap-2 justify-between dark:text-neutral-200">
                                <Link @click.stop :href="route('levels.show', video.level_id)" class="box !py-1 !px-3">Level Page</Link>
                                <a @click.stop :href="`https://youtube.com/watch?v=${video.video_id}`" target="_blank" class="x items-center space-x-1 box !py-1 !px-3">
                                    <span>YouTube Video</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                        <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </template>
                </Lightbox>
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
