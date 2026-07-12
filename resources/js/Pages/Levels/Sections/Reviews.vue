<script setup>
import Layout from '../Layout.vue'
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import LevelReview from "@/Components/LevelReview.vue";
import QueryFooter from "@/Components/QueryFooter.vue";
import Sorting from "@/Components/Sorting.vue";
import {Link} from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    level: Object,
    review: Object,
    reviews: Object,
    sorting: Object,
});
</script>
<template>
    <Layout>
        <div class="y !mt-0 bg-ui-950 border border-ui-900 rounded-lg px-4 py-2 space-y-2">
            <LevelReview v-if="review" :review="review" :level="level"/>

            <div class="y md:flex-row items-center gap-2 justify-between">
                <h2 class="font-bold text-2xl">Reviews</h2>
                <div class="flex flex-wrap items-center gap-2">
                    <Sorting :sorting="sorting" :url="route('levels.reviews.show', level.id)"/>
                    <Link :href="route('reviews.create') + '?level=' + level.id" class="x items-center space-x-1.5 rounded-md font-bold text-white px-3 py-1 !bg-blue-500">
                        <span>{{ review ? 'Edit Your' : 'Write a' }} Review/Rating</span>
                        <Icon name="pencil"/>
                    </Link>
                </div>
            </div>
            <Pagination :list="reviews"/>
            <div v-if="reviews.data.length === 0" class="pane">This level has no reviews. Be the first!</div>
            <LevelReview :key="review.id" v-for="review in reviews.data" :review="review" :level="level"/>
            <QueryFooter :sorting="sorting" :url="route('levels.reviews.show', level.id)" :results="reviews"/>
            <Pagination :list="reviews"/>
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
