<script setup>
import {displayRating} from "../util.js";

const props = defineProps({
   level: Object
});
</script>
<template>
    <div  class="x z-10 md:-translate-x-8 justify-center sm:w-fit sm:skew-x-12 sm:rounded-tr-lg bg-ui-800">
        <div class="grid items-end sm:-skew-x-12 grid-cols-4 sm:grid-cols-5 md:ml-8 gap-4 py-1.5 px-4 -[text-shadow:black_0_0_10px]">
            <span class="hidden sm:flex flex-col">
                <span class="text-xs uppercase">Reviews</span>
                <span class="text-lg font-bold">{{ level.reviews_count }}</span>
            </span>
            <span class="y">
                <span class="text-xs uppercase">Difficulty</span>
                <span class="text-lg font-bold">{{ displayRating(level.rating_difficulty) }}<span class="text-xs text-ui-600">/100</span></span>
            </span>
            <span class="y">
                <span class="text-xs uppercase">Overall</span>
                <span class="text-lg font-bold">{{ displayRating(level.rating_overall) }}<span class="text-xs text-ui-600">/10</span></span>
            </span>
            <span class="y">
                <span class="text-xs uppercase">Gameplay</span>
                <span class="text-lg font-bold">{{ displayRating(level.rating_gameplay) }}<span class="text-xs text-ui-600">/10</span></span>
            </span>
            <span class="y">
                <span class="text-xs uppercase">Visuals</span>
                <span class="text-lg font-bold">{{ displayRating(level.rating_visuals) }}<span class="text-xs text-ui-600">/10</span></span>
            </span>
        </div>
    </div>
</template>
