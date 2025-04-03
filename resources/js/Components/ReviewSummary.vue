<script setup>
import Tooltip from "@/Components/Tooltip.vue";
import {trimAtWord} from "../util.js";
import Username from "@/Components/Username.vue";
import {Link} from "@inertiajs/vue3";
import route from "ziggy-js";
import {useTimeAgo} from "@vueuse/core";

const props = defineProps({
    review: Object,
    decorations: Boolean
});
</script>
<template>
    <div class="y text-sm px-4 py-2 justify-between">
        <div class="x justify-between space-x-2">
            <Link :href="route('levels.show', review.level.id)" class="font-bold">{{ review.level.name }}</Link>
            <Tooltip :message="review.created_at"><span class="text-ui-500">{{ useTimeAgo(review.created_at).value }}</span></Tooltip>
        </div>
        <span class="text-ui-500">by {{ review.level.creator }}</span>
        <Link :href="route('reviews.show', review.id)" class="italic line-clamp-3">"{{ review.review.substring(3, review.review.length - 4) }}"</Link>
        <div class="x items-center space-x-1 justify-end"><span>&#8212;</span><Username :user="review.author"/></div>
    </div>
</template>
