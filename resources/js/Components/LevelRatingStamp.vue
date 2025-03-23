<script setup>
import {displayRating, isAuthenticated} from "../util.js";
import Tooltip from "@/Components/Tooltip.vue";
import {ref} from "vue";

const props = defineProps({
   level: Object
});

const hovered = ref(false);
const reviewed = props.level.reviews && props.level.reviews.length;
</script>
<template>
    <div  class="x z-10 md:-translate-x-8 justify-center sm:w-fit sm:skew-x-12 sm:rounded-tr-lg bg-ui-800">
        <div class="grid items-end sm:-skew-x-12 grid-cols-4 sm:grid-cols-5 md:ml-8 gap-4 py-1.5 px-4 -[text-shadow:black_0_0_10px]">
            <div class="hidden sm:flex flex-col">
                <Tooltip v-if="isAuthenticated()" @mouseenter="hovered = true" @mouseleave="hovered = false" class="group" position="top-right" :message="level.reviews && level.reviews.length ? 'You Reviewed This' : 'You Haven\'t Reviewed This'">
                    <div class="x items-center">
                        <span class="text-xs uppercase">Reviews</span>
                        <svg v-if="level.reviews && level.reviews.length" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-green-500 relative left-1.5">
                            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4 text-transparent group-hover:text-red-500 relative left-1.5">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                    </div>
                    <span class="text-lg font-bold">{{ level.reviews_count }}</span>
                </Tooltip>
                <div v-else class="y">
                    <span class="text-xs uppercase">Reviews</span>
                    <span class="text-lg font-bold">{{ level.reviews_count }}</span>
                </div>
            </div>
            <div class="y">
                <span class="text-xs uppercase">Difficulty</span>
                <span class="text-lg font-bold" :class="{'text-green-500': reviewed && hovered}">{{ displayRating(reviewed && hovered ? level.reviews[0].rating_difficulty : level.rating_difficulty) }}<span class="text-xs text-ui-600">/100</span></span>
            </div>
            <div class="y">
                <span class="text-xs uppercase">Overall</span>
                <span class="text-lg font-bold" :class="{'text-green-500': reviewed && hovered}">{{ displayRating(reviewed && hovered ? level.reviews[0].rating_overall : level.rating_overall) }}<span class="text-xs text-ui-600">/10</span></span>
            </div>
            <div class="y">
                <span class="text-xs uppercase">Gameplay</span>
                <span class="text-lg font-bold" :class="{'text-green-500': reviewed && hovered}">{{ displayRating(reviewed && hovered ? level.reviews[0].rating_gameplay : level.rating_gameplay) }}<span class="text-xs text-ui-600">/10</span></span>
            </div>
            <div class="y">
                <span class="text-xs uppercase">Visuals</span>
                <span class="text-lg font-bold" :class="{'text-green-500': reviewed && hovered}">{{ displayRating(reviewed && hovered ? level.reviews[0].rating_visuals : level.rating_visuals) }}<span class="text-xs text-ui-600">/10</span></span>
            </div>
        </div>
    </div>
</template>
