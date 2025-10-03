Z<script setup>
import {Link} from '@inertiajs/vue3';
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";
import Username from "@/Components/Username.vue";
import {displayRating} from "@/util.js";
import Avatar from "@/Components/Avatar.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import TipTap from "@/Components/TipTap.vue";
import WeightBadge from "@/Components/WeightBadge.vue";

const props = defineProps({
    review: Object
});

const weight = props.review.weight ?? props.review.author?.weight ?? props.weight ?? 1;
</script>
<template>
    <app-layout>
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('levels.show', review.level.id)">{{ review.level.id }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="$page.props.url">Review by {{ review.author.name }}</Link>
        </template>
        <div class="y w-full space-y-4">
            <div>
                <h2 class="font-bold text-2xl">Review of {{ review.level.name }}</h2>
                <span class="text-sm">by <Username :pop-under="true" :user="review.author"/>, {{ new Date(review.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Level ID: {{ review.level_id }}</span>
            </div>
            <LevelTicket :level="review.level" :show-ratings="false"/>
            <div class="x gap-2">
                <div class="y w-2/3 h-full">
                    <div class="x justify-between items-center">
                        <div class="x items-center space-x-2 bg-ui-800 rounded-t w-fit p-2 ml-2">
                            <Avatar class="w-6" :user="review.author"/>
                            <span><Username :user="review.author"/> says...</span>
                        </div>
                        <WeightBadge :weight="weight"/>
                    </div>
                    <div class="pane border border-ui-700 grow">
                        <p v-if="!review.review" class="italic text-ui-600 text-center">User has not left a written review</p>
                        <TipTap v-else :editable="false" v-model="review.review"/>
                    </div>
                </div>
                <div class="y space-y-4 pane grow border border-ui-700">
                    <div class="y">
                        <span class="font-bold text-sm">OVERALL</span>
                        <span class="font-bold text-3xl">{{ displayRating(review.rating_overall, 0) }}<span class="text-base text-ui-600">/10</span></span>
                        <div class="bg-ui-800 overflow-hidden rounded-full"><div class="bg-blue-500 p-[0.2rem] rounded-full" :class="{'invisible': review.rating_overall === null}" :style="`width: ${review.rating_overall * 10}%;`"></div></div>
                    </div>
                    <div class="y">
                        <span class="font-bold text-sm">GAMEPLAY</span>
                        <span class="font-bold text-3xl">{{ displayRating(review.rating_gameplay, 0) }}<span class="text-base text-ui-600">/10</span></span>
                        <div class="bg-ui-800 overflow-hidden rounded-full"><div class="bg-blue-500 p-[0.2rem] rounded-full" :class="{'invisible': review.rating_gameplay === null}" :style="`width: ${review.rating_gameplay * 10}%;`"></div></div>
                    </div>
                    <div class="y">
                        <span class="font-bold text-sm">VISUALS</span>
                        <span class="font-bold text-3xl">{{ displayRating(review.rating_visuals, 0) }}<span class="text-base text-ui-600">/10</span></span>
                        <div class="bg-ui-800 overflow-hidden rounded-full"><div class="bg-blue-500 p-[0.2rem] rounded-full" :class="{'invisible': review.rating_visuals === null}" :style="`width: ${review.rating_visuals * 10}%;`"></div></div>
                    </div>
                    <div class="y">
                        <span class="font-bold text-sm">DIFFICULTY</span>
                        <span class="font-bold text-3xl">{{ displayRating(review.rating_difficulty, 0) }}<span class="text-base text-ui-600">/100</span></span>
                        <div class="bg-ui-800 overflow-hidden rounded-full"><div class="bg-blue-500 p-[0.2rem] rounded-full" :class="{'invisible': review.rating_difficulty === null}" :style="`width: ${review.rating_difficulty}%;`"></div></div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
