<script setup>
import {displayRating, isAuthenticated} from "../util.js";
import Tooltip from "@/Components/Tooltip.vue";
import {computed, ref} from "vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
   level: Object
});

const hovered = ref(false);

const list = {
    // 'rating_difficulty': 'DIFFICULTY',
    'rating_overall': 'OVERALL',
    'rating_gameplay': 'GAMEPLAY',
    'rating_visuals': 'VISUALS',
};

const hasRating = ref(!!(props.level.reviews && props.level.reviews.length));
const hasReview = ref(hasRating.value && (props.level?.reviews[0]?.review?.length ?? 0 > 0));

const reviewMessage = computed(() => {
    if (hasRating.value && hasReview.value) return 'You rated and reviewed this';
    if (hasRating.value && !hasReview.value) return 'You rated this but did not review it';
    if (!hasRating.value && hasReview.value) return 'You reviewed this but did not rate it';

    return 'You haven\'t rated or reviewed this';
})
</script>
<template>
    <div class="relative z-10 justify-center w-full sm:w-fit">
        <div class="z-10 relative grid items-end grid-cols-4 gap-4 py-1.5 px-4 -[text-shadow:black_0_0_10px]">
            <div class="x justify-center sm:justify-start">
                <Tooltip v-if="isAuthenticated()" @mouseenter="hovered = true" @mouseleave="hovered = false" class="group" position="top-right" :message="reviewMessage">
                    <div class="x items-center">
                        <span class="text-xs uppercase">Reviews</span>
                        <Icon v-if="hasRating && hasReview" name="check" size="16" scale="size-4" class="text-green-500 relative left-1.5"/>
                        <Icon v-else-if="!hasRating && !hasReview" name="check" size="16" scale="size-4" class="text-transparent group-hover:text-red-500 relative left-1.5"/>
                        <Icon v-else name="check" size="16" scale="size-4" class="text-amber-500 relative left-1.5"/>
                    </div>
                    <span class="text-lg font-bold">{{ level.reviews_count ?? 'N/A' }}</span>
                </Tooltip>
                <div v-else-if="level.reviews_count" class="y">
                    <span class="text-xs uppercase">Reviews</span>
                    <span class="text-lg font-bold">{{ level.reviews_count }}</span>
                </div>
            </div>
            <div v-for="(rating, key) in list" class="y items-center sm:items-start">
                <span class="text-xs uppercase">{{ rating }}</span>
                <span class="text-lg font-bold" :class="{'text-green-500': hasRating && hovered}">{{ displayRating(hasRating && hovered ? level.reviews[0][key] : level[key]) }}<span class="text-xs text-ui-600">/10{{ key === 'rating_difficulty' ? '0' : '' }}</span></span>
            </div>
        </div>
        <div class="absolute z-0 inset-0 overflow-hidden rounded-bl-lg rounded-br-lg sm:rounded-br-none">
            <div class="h-full md:-translate-x-4 sm:skew-x-12 sm:rounded-tr-lg bg-ui-800"></div>
        </div>
    </div>
</template>
