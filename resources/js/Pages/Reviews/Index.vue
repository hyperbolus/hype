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
            <div class="x items-center space-x-1 rounded-md px-2 py-1 border border-amber-500 bg-amber-500/10">
                <Icon size="24" type="outline" class="w-8 text-amber-500 shrink-0" name="exclamation-circle"/>
                <span>Looking for the level charts? <Link :href="route('levels.index')" class="underline text-ui-200">They've moved!</Link></span>
            </div>
            <QueryResults :results="reviews" :sorting="sorting" title="Reviews" :url="route('reviews.index')" v-slot="{ item, index }" container-classes="y space-y-2">
                <LevelReview :review="item" :key="index"/>
            </QueryResults>
        </div>
    </app-layout>
</template>
