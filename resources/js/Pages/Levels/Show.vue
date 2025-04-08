<script setup>
import Layout from './Layout.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Carousel from "@/Components/Carousel.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import {isAuthenticated} from "@/util.js";
import {ref} from "vue";
import LevelReview from "@/Components/LevelReview.vue";
import ReplayTicket from "@/Components/ReplayTicket.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import {useClipboard} from "@vueuse/core";
import Lightbox from "@/Components/Lightbox.vue";
import Errors from "@/Components/Errors.vue";
import getYouTubeID from "get-youtube-id";
import Sorting from "@/Components/Sorting.vue";
import QueryFooter from "@/Components/QueryFooter.vue";
import RatingOverview from "@/Components/RatingOverview.vue";

const props = defineProps({
    level: Object,
    review: Object,
    reviews: Object,
    sorting: Object
})

const form = useForm({
    rating_gameplay: props.review ? props.review.rating_gameplay : 5,
    rating_difficulty: props.review ? props.review.rating_difficulty : 5,
    rating_visuals: props.review ? props.review.rating_visuals : 5,
    rating_overall: props.review ? props.review.rating_overall : 5,
    body: props.review ? props.review.review : '',
    level_id: props.level.id
});

const blanks = ref({
    difficulty: false,
    gameplay: false,
    visuals: false
});

const submit = () => {
    form.transform((data) => {
        let final = {...data}; // Copy
        final.rating_difficulty = blanks.value.difficulty ? null : final.rating_difficulty;
        final.rating_gameplay = blanks.value.gameplay ? null : final.rating_gameplay;
        final.rating_visuals = blanks.value.visuals ? null : final.rating_visuals;

        return final;
    }).post(route('reviews.store'), {
        preserveScroll: true,
    });
}

const source = ref(props.level.id)
const { copied, copy } = useClipboard({source, legacy: true})

const videoForm = useForm({
    level_id: props.level.id,
    video_id: ''
})

const submitVideo = () => {
    videoForm.transform(data => ({
        ...data,
        video_id: getYouTubeID(videoForm.video_id),
    })).post(route('videos.store'), {
        onFinish: () => videoForm.reset('video_id'),
    });
}
</script>
<template>
    <Layout :level="level" :tags="true">
        <div class="flex !mt-0 flex-col md:flex-row bg-ui-950 border border-ui-900 rounded-lg p-4 gap-4 my-4">
            <div class="y space-y-2 md:w-3/4">
                <template v-if="false">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Images</h2>
                        <Link :href="route('levels.images.show', level.id)" class="pane !py-1">Submit</Link>
                    </div>
                    <div v-if="level.images.length === 0" class="pane">No images available. Add one?</div>
                    <Carousel v-else :images="level.images"/>
                </template>
                <h2 class="font-bold text-2xl">Overview</h2>
                <RatingOverview :level="level"/>
                <div class="x items-center justify-between">
                    <h2 class="font-bold text-2xl">Reviews</h2>
                    <Sorting :sorting="sorting" :url="route('levels.reviews.show', level.id)"/>
                </div>
                <Pagination :list="reviews"/>
                <div v-if="reviews.data.length === 0" class="pane">This level has no reviews. Be the first!</div>
                <LevelReview v-for="review in reviews.data" :review="review"/>
                <QueryFooter :sorting="sorting" :url="route('levels.reviews.show', level.id)" :results="reviews"/>
                <Pagination :list="reviews"/>
            </div>
            <div class="y space-y-2 md:w-1/4">
                <div class="w-full space-y-2">
                    <h2 class="font-bold text-2xl">Info</h2>
                    <div class="y space-y-2 pane">
                        <div class="x justify-between">
                            <span>All</span>
                            <span>{{ level.reviews_only_count + level.ratings_only_count }}</span>
                        </div>
                        <div class="x justify-between">
                            <span>Reviews Only</span>
                            <span>{{ level.reviews_only_count }}</span>
                        </div>
                        <div class="x justify-between">
                            <span>Ratings Only</span>
                            <span>{{ level.ratings_only_count }}</span>
                        </div>
                    </div>
                    <div class="y space-y-2 pane">
                        <div class="x justify-between items-center">
                            <span>ID</span>
                            <div class="x space-x-1 items-center">
                                <Tooltip @click="copy(level.id)" class="cursor-pointer" :class="{'text-green-500': copied}" :message="copied ? 'Copied!' : 'Copy ID'">
                                    <Icon class="w-4" name="clipboard-document-list"/>
                                </Tooltip>
                                <span>{{ level.id }}</span>
                            </div>
                        </div>
                        <div class="x justify-between">
                            <span>Title</span>
                            <span>{{ level.name }}</span>
                        </div>
                        <div class="x justify-between">
                            <span>Creator</span>
                            <span>{{ level.creator }}</span>
                        </div>
                    </div>
                    <div v-if="false" class="flex items-center justify-center rounded-md px-4 py-2 bg-rose-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
                            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                        <span class="font-bold cursor-pointer">Download Level</span>
                    </div>
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Videos</h2>
                        <Lightbox>
                            <span class="pane !py-1 cursor-pointer">Submit</span>
                            <template #content>
                                <div @click.stop v-if="isAuthenticated()" class="glass p-4 text-ui-200">
                                    <form @submit.prevent="submitVideo" class="space-y-2">
                                        <Input v-model="videoForm.video_id" type="text" placeholder="YouTube Video Link" required/>
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
                    <div v-if="level.videos.length === 0" class="pane">No videos available</div>
                    <VideoLightbox v-for="video in level.videos" :video="video" class="w-full"/>
                </div>
                <div class="hidden md:block w-full space-y-2">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Replays</h2>
                        <Link :href="route('replays.create')" class="pane !py-1 cursor-pointer">Submit</Link>
                    </div>
                    <div v-if="level.replays?.length === 0" class="pane">No replays available</div>
                    <div v-else class="pane !py-0 !px-0 divide-y divide-ui-800">
                        <ReplayTicket v-for="macro in level.replays" :macro="macro" :level="level"/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
<style scoped>
input[type=range] {
    @apply h-1.5 rounded bg-ui-950
}

input[type=range]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply bg-ui-700 border-none cursor-pointer
}

input[type=range][disabled]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply opacity-0
}
</style>
