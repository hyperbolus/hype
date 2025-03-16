<script setup>
import {Link} from "@inertiajs/vue3";
import {displayRating, face} from "@/util.js";
import LevelRatingStamp from "@/Components/LevelRatingStamp.vue";
import Tooltip from "@/Components/Tooltip.vue";
import route from "ziggy-js";

const props = defineProps({
    level: Object,
    showRatings: {
        type: Boolean,
        default: true
    }
})

// TODO: Fucking disgusting, clean it up
// border-2 border-red-50 rounded-lg shadow-[0_0_5px_3px_rgba(240,240,100,1)]
</script>
<template>
    <div>
        <div class="relative group/ticket">
            <Tooltip position="right" v-if="level.reviews && level.reviews.length" class="z-10 !absolute -top-2 -right-2 w-fit">
                <template #content>
                    <div class="y space-y-2 text-sm w-32">
                        <h3 class="font-bold text-lg text-center">Your Review</h3>
                        <div class="x justify-between">
                            <span>Difficulty</span>
                            <span>{{ displayRating(level.reviews[0].rating_difficulty) }}</span>
                        </div>
                        <div class="x justify-between">
                            <span>Gameplay</span>
                            <span>{{ displayRating(level.reviews[0].rating_gameplay) }}</span>
                        </div>
                        <div class="x justify-between">
                            <span>Visuals</span>
                            <span>{{ displayRating(level.reviews[0].rating_visuals) }}</span>
                        </div>
                        <div class="x justify-between">
                            <span>Overall</span>
                            <span>{{ displayRating(level.reviews[0].rating_overall) }}</span>
                        </div>
                    </div>
                </template>
                <Link :href="route('reviews.show', level.reviews[0].id)" class="block p-2 bg-ui-700 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="{'text-amber-500': !!level.reviews[0].rating_difficulty + !!level.reviews[0].rating_gameplay + !!level.reviews[0].rating_visuals + !!level.reviews[0].rating_overall < 4}">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                    </svg>
                </Link>
            </Tooltip>
            <Link :href="route('levels.show', level.id)" class="block pane z-0 !px-0 !py-0 overflow-hidden relative hover:shadow-lg transition-shadow text-ui-300 delay-0">
                <div class="x relative z-10 items-center md:space-x-2">
                    <div class="y w-full z-0">
                        <div class="x items-center px-4 py-2 [text-shadow:black_0_0_10px]">
                            <span class="y sm:hidden space-y-1 justify-center -ml-1 mr-3">
                                <span class="rounded-full p-[.15rem] px-2 bg-yellow-400" :class="{'invisible': level.stars === 0}"></span>
                                <span v-if="level.featured" class="rounded-full p-[.15rem] px-2 bg-amber-500"></span>
                                <span v-if="level.epic" class="rounded-full p-[.15rem] px-2 bg-red-500"></span>
                            </span>
                            <div class="hidden mr-4 sm:flex place-items-center w-16 aspect-square">
                                <img :src="face(level)" alt=""/>
                            </div>
                            <div class="y">
                                <div class="x z-10 items-center h-full space-x-2">
                                    <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                                    <span class="hidden sm:flex space-x-1">
                                        <span class="rounded-full p-[.15rem] py-2 bg-yellow-400" :class="{'invisible': level.stars === 0}"></span>
                                        <span class="rounded-full p-[.15rem] py-2 bg-amber-500" :class="{'invisible': !level.featured}"></span>
                                        <span class="rounded-full p-[.15rem] py-2 bg-red-500" :class="{'invisible': !level.epic}"></span>
                                    </span>
                                </div>
                                <p class="text-lg">{{ level.creator }}</p>
                            </div>
                        </div>
                        <LevelRatingStamp v-if="showRatings" :level="level"/>
                    </div>
                </div>
                <div class="absolute right-0 top-0 h-full w-full -md:w-4/5 group-hover/ticket:scale-105 transition-transform bg-cover bg-center opacity-80 [mask-image:linear-gradient(to_right,rgba(0,0,0,0.1)_25%,rgba(0,0,0,1)_60%);]" :style="`background-image:url('${level.banner_url ?? 'https://raw.githubusercontent.com/cdc-sys/level-thumbnails/refs/heads/main/thumbs/' + level.id + '.png'}');`"></div>
            </Link>
        </div>
    </div>
</template>
