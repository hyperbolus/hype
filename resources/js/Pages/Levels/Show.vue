<script setup>
import Layout from './Layout.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Button from "@/Jetstream/Button.vue";
import Username from "@/Components/Username.vue";
import Avatar from "@/Components/Avatar.vue";
import Carousel from "@/Components/Carousel.vue";
import PostPad from "@/Components/PostPad.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import Pagination from "@/Components/Pagination.vue";
import Lightbox from "@/Components/Lightbox.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import route from 'ziggy-js'
import {displayRating, isAdmin, isAuthenticated} from "@/util.js";
import ReportModal from "@/Components/ReportModal.vue";
import {ref} from "vue";
import Errors from "@/Components/Errors.vue";
import Icon from "@/Components/Icon.vue";
import LevelReview from "@/Components/LevelReview.vue";
import ReplayTicket from "@/Components/ReplayTicket.vue";
import LevelRatingStamp from "@/Components/LevelRatingStamp.vue";

const props = defineProps({
    level: Object,
    review: Object,
    reviews: Object,
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
};
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
                <div class="x pane justify-between">
                    <div class="y">
                        <span class="text-xs uppercase">Reviews</span>
                        <span class="text-xl font-bold">{{ level.reviews_count }}</span>
                    </div>
                    <div class="y">
                        <span class="text-xs uppercase">Difficulty</span>
                        <span class="text-xl font-bold">{{ displayRating(level.rating_difficulty) }}<span class="text-xs text-ui-600">/100</span></span>
                    </div>
                    <div class="y">
                        <span class="text-xs uppercase">Overall</span>
                        <span class="text-xl font-bold">{{ displayRating(level.rating_overall) }}<span class="text-xs text-ui-600">/10</span></span>
                    </div>
                    <div class="y">
                        <span class="text-xs uppercase">Gameplay</span>
                        <span class="text-xl font-bold">{{ displayRating(level.rating_gameplay) }}<span class="text-xs text-ui-600">/10</span></span>
                    </div>
                    <div class="y">
                        <span class="text-xs uppercase">Visuals</span>
                        <span class="text-xl font-bold">{{ displayRating(level.rating_visuals) }}<span class="text-xs text-ui-600">/10</span></span>
                    </div>
                </div>
                <h2 class="font-bold text-2xl">Reviews</h2>
                <Pagination :list="reviews"/>
                <div v-if="reviews.data.length === 0" class="pane">
                    This level has no reviews. Be the first!
                </div>
                <LevelReview v-for="review in reviews.data" :review="review"/>
                <Pagination :list="reviews"/>
            </div>
            <div class="y space-y-2 md:w-1/4">
                <div class="w-full space-y-2">
                    <div v-if="false" class="flex items-center justify-center rounded-md px-4 py-2 bg-rose-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
                            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                        <span class="font-bold cursor-pointer">Download Level</span>
                    </div>
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Videos</h2>
                        <span class="!hidden pane !py-1 cursor-pointer">Submit</span>
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
