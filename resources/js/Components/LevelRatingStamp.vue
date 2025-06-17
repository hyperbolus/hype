<script setup>
import {displayRating, isAuthenticated} from "../util.js";
import Tooltip from "@/Components/Tooltip.vue";
import {ref} from "vue";

const props = defineProps({
   level: Object
});

const hovered = ref(false);
const reviewed = props.level.reviews && props.level.reviews.length;

const list = {
    'rating_difficulty': 'DIFFICULTY',
    'rating_overall': 'OVERALL',
    'rating_gameplay': 'GAMEPLAY',
    'rating_visuals': 'VISUALS',
};
</script>
<template>
    <div class="relative z-10 justify-center sm:w-fit">
        <div class="z-10 relative grid items-end grid-cols-4 sm:grid-cols-5 gap-4 py-1.5 px-4 -[text-shadow:black_0_0_10px]">
            <div class="y">
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
                    <span class="text-lg font-bold">{{ level.reviews_count }}<span class="text-xs text-ui-600">/100</span></span>
                </div>
            </div>
            <div v-for="(rating, key) in list" class="y">
                <span class="text-xs uppercase">{{ rating }}</span>
                <span class="text-lg font-bold" :class="{'text-green-500': reviewed && hovered}">{{ displayRating(reviewed && hovered ? level.reviews[0][key] : level[key]) }}<span class="text-xs text-ui-600">/10{{ key === 'rating_difficulty' ? '0' : '' }}</span></span>
            </div>
        </div>
        <div class="absolute z-0 inset-0 overflow-hidden rounded-bl-lg rounded-br-lg sm:rounded-br-none">
            <div class="h-full md:-translate-x-4 sm:skew-x-12 sm:rounded-tr-lg bg-ui-800"></div>
        </div>
    </div>
</template>
