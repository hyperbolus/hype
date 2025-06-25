<script setup>
import LevelReview from "@/Components/LevelReview.vue";
import RatingsCurve from "@/Components/RatingsCurve.vue";
import UserLayout from "@/Pages/Users/Partials/UserLayout.vue";
import MinMaxInput from "@/Components/MinMaxInput.vue";
import QueryResults from "@/Components/QueryResults.vue";
import {router, useForm, usePage} from "@inertiajs/vue3";
import Accordion from "@/Components/Accordion.vue";

const props = defineProps({
    profile: Object,
    reviews: Object,
    curve: Object,
    sorting: Object,
});

const form = useForm({
    difficulty_min: props.sorting.difficulty ? props.sorting.difficulty.toString().split('-')[0] : 0,
    difficulty_max: props.sorting.difficulty ? props.sorting.difficulty.toString().split('-')[1] : 100,
    overall_min: props.sorting.overall ? props.sorting.overall.toString().split('-')[0] : 0,
    overall_max: props.sorting.overall ? props.sorting.overall.toString().split('-')[1] : 10,
    visuals_min: props.sorting.visuals ? props.sorting.visuals.toString().split('-')[0] : 0,
    visuals_max: props.sorting.visuals ? props.sorting.visuals.toString().split('-')[1] : 10,
    gameplay_min: props.sorting.gameplay ? props.sorting.gameplay.toString().split('-')[0] : 0,
    gameplay_max: props.sorting.gameplay ? props.sorting.gameplay.toString().split('-')[1] : 10,
})

const search = () => {
    let url = new URL('https://penis.com' + usePage().url);
    let query = new URLSearchParams(url.search);

    query.set('difficulty', `${form.difficulty_min}-${form.difficulty_max}`);
    query.set('overall', `${form.overall_min}-${form.overall_max}`);
    query.set('visuals', `${form.visuals_min}-${form.visuals_max}`);
    query.set('gameplay', `${form.gameplay_min}-${form.gameplay_max}`);

    if (query.get('difficulty') === '0-100') query.delete('difficulty');
    if (query.get('overall') === '0-10') query.delete('overall');
    if (query.get('visuals') === '0-10') query.delete('visuals');
    if (query.get('gameplay') === '0-10') query.delete('gameplay');

    router.get(url.pathname + '?' + query.toString())
}
</script>
<template>
    <UserLayout :profile="profile" container-classes="y md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div class="y space-y-4 md:w-1/3 xl:w-1/4 relative z-00">
            <RatingsCurve :user="profile" :curve="curve"/>
            <Accordion :open="true" title="Filters">
                <div class="y">
                    <span>Difficulty</span>
                    <MinMaxInput @commit="search" v-model:low="form.difficulty_min" v-model:high="form.difficulty_max" :min="0" :max="100" :step="1"/>
                </div>
                <div class="y">
                    <span>Overall</span>
                    <MinMaxInput @commit="search" v-model:low="form.overall_min" v-model:high="form.overall_max" :min="0" :max="10" :step="1"/>
                </div>
                <div class="y">
                    <span>Visuals</span>
                    <MinMaxInput @commit="search" v-model:low="form.visuals_min" v-model:high="form.visuals_max" :min="0" :max="10" :step="1"/>
                </div>
                <div class="y">
                    <span>Gameplay</span>
                    <MinMaxInput @commit="search" v-model:low="form.gameplay_min" v-model:high="form.gameplay_max" :min="0" :max="10" :step="1"/>
                </div>
            </Accordion>
        </div>
        <div class="y space-y-4 md:w-2/3 xl:w-3/4">
            <QueryResults :sorting="sorting" title="Reviews" :results="reviews" v-slot="{ item }" container-classes="y space-y-2">
                <LevelReview :review="item" :weight="profile.weight"/>
            </QueryResults>
        </div>
    </UserLayout>
</template>
