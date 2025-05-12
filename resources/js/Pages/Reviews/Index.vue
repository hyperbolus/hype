<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import route from 'ziggy-js'
import LevelReview from "@/Components/LevelReview.vue";
import QueryResults from "@/Components/QueryResults.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    reviews: Object,
    sorting: Object
});
</script>
<template>
    <app-layout>
        <div class="y space-y-2 w-full">
            <QueryResults :results="reviews" :sorting="sorting" title="Reviews" :url="route('reviews.index')" v-slot="{ item, index }" container-classes="y space-y-2">
                <LevelReview :review="item" :key="index"/>
            </QueryResults>
        </div>
    </app-layout>
</template>
