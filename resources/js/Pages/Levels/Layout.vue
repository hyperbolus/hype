<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import route from 'ziggy-js'
import {invisiblePixel} from "@/util.js";
import Icon from "@/Components/Icon.vue";
import LevelTicket from "@/Components/LevelTicket.vue";

const props = defineProps({
    level: Object,
    tags: Boolean
})

const tabs = {
    'levels.show': 'Overview',
    'levels.reviews.show': 'Reviews',
    'levels.tags.show': 'Tags',
    'levels.replays.show': 'Macros',
    'levels.videos.show': 'Videos',
    //'levels.view': 'Level Viewer',
    //'levels.edit': 'Edit',
};

</script>
<template>
    <app-layout :title="level.name" :decorations="false">
        <div class="y space-y-4 w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl pb-4">
            <div class="!hidden absolute inset-0 -z-10 bg-bottom" :style="`background-image: url(${level.banner_url ?? invisiblePixel});mask-image: linear-gradient(black 25%, transparent 50%);mask-size: 8rem;`"></div>
            <LevelTicket :show-ratings="false" :level="level"/>
            <div v-if="tags" class="x flex-wrap bg-ui-950 border border-ui-900 rounded-lg items-center gap-2 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full px-4 py-2">
                <span class="y items-center font-bold text-sm uppercase">Top Tags</span>
                <div class="py-2 select-none border-r border-ui-400 border-ui-700"></div>
                <span v-if="level.top_tags.length === 0" class="text-ui-500">No Tags</span>
                <Link v-else v-for="tag in level.top_tags" :href="route('tags.show', tag)" :title="`${tag.pivot.verified ? 'Verified' : 'Unverified'} tag`" class="x items-center text-ui-300 px-2 py-1 text-sm rounded-md bg-ui-800 capitalize">
                    <Icon v-if="tag.pivot.verified" name="check-badge" class="inline mr-1 rounded-full text-green-500 w-5"/>
                    {{tag.name}}
                </Link>
            </div>
            <div class="x space-x-2 px-4">
                <Link v-for="(tab, key) in tabs" :href="route(key, level.id)" class="rounded-t px-2 border border-b-0" :class="route().current(key) ? 'border-ui-800 bg-ui-950' : 'mt-1 border-ui-900 bg-ui-1000'">{{ tab }}</Link>
            </div>
            <slot/>
        </div>
    </app-layout>
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
