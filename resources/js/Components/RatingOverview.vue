<script setup>
import {displayRating} from "../util.js";

const props = defineProps({
    level: Object
});
</script>
<template>
    <div class="x pane justify-between space-x-4 grow">
        <div class="y">
            <span class="text-xs uppercase">Difficulty</span>
            <span class="text-xl font-bold">{{ displayRating(level.rating_difficulty, 2) }}<span class="text-xs text-ui-600">/100</span></span>
        </div>
        <div class="y">
            <span class="text-xs uppercase">Overall</span>
            <span class="text-xl font-bold">{{ displayRating(level.rating_overall, 2) }}<span class="text-xs text-ui-600">/10</span></span>
        </div>
        <div class="y">
            <span class="text-xs uppercase">Gameplay</span>
            <span class="text-xl font-bold">{{ displayRating(level.rating_gameplay, 2) }}<span class="text-xs text-ui-600">/10</span></span>
        </div>
        <div class="y">
            <span class="text-xs uppercase">Visuals</span>
            <span class="text-xl font-bold">{{ displayRating(level.rating_visuals, 2) }}<span class="text-xs text-ui-600">/10</span></span>
        </div>
    </div>
</template>
