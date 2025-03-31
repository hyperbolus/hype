<script setup>
import Layout from "../Layout.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import Pagination from "@/Components/Pagination.vue";
import {useForm, Link} from "@inertiajs/vue3";
import getYouTubeID from "get-youtube-id";
import route from "ziggy-js";
import Lightbox from "@/Components/Lightbox.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {isAuthenticated} from "@/util.js";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    level: Object,
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
    <Layout :level="level">
        <div class="y space-y-2 !mt-0 bg-ui-950 border border-ui-900 rounded-lg px-4 py-2 space-x-2">
            <div class="x items-center justify-between">
                <h2 class="font-bold text-2xl">Videos</h2>
                <Lightbox>
                    <span class="pane !py-1 cursor-pointer">Submit</span>
                    <template #content>
                        <div @click.stop v-if="isAuthenticated()" class="glass p-4 text-ui-200">
                            <form @submit.prevent="submit" class="space-y-2">
                                <Input v-model="form.video_id" type="text" placeholder="YouTube Video Link" required/>
                                <Input v-model="form.level_id" type="text" placeholder="Level ID" required/>
                                <Errors/>
                                <Button>Add</Button>
                            </form>
                        </div>
                        <div @click.stop v-else class="pane text-ui-200">
                            <span>You must <Link class="underline" :href="route('auth::login')">log in</Link> to submit a video</span>
                        </div>
                    </template>
                </Lightbox>
            </div>
            <Pagination :list="videos"/>
            <div v-if="videos.data.length === 0" class="pane text-center italic text-ui-600">No Videos</div>
            <div class="grid grid-cols-4 gap-4">
                <VideoLightbox v-for="video in videos.data" :video="video" class="w-full"/>
            </div>
            <Pagination :list="videos"/>
        </div>
    </Layout>
</template>
