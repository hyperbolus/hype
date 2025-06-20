<script setup>
import {Link, useForm} from "@inertiajs/vue3";
import {difficulty, face, isAdmin} from "@/util.js";
import LevelRatingStamp from "@/Components/LevelRatingStamp.vue";
import Tooltip from "@/Components/Tooltip.vue";
import route from "ziggy-js";
import {useFileDialog} from "@vueuse/core";

const props = defineProps({
    level: Object,
    showRatings: {
        type: Boolean,
        default: true
    }
})

const banner = useForm({
    action: 'update banner',
    content: null
})

const { open: openBannerFile, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
    directory: false
})

onChange((files) => {
    if (files.length !== 1) return;

    banner.content = files[0];

    banner.post(route('levels.update', props.level), {
        errorBag: 'changeBanner',
    })
})
</script>
<template>
    <div class="pane z-10 !px-0 !py-0 relative group/ticket hover:shadow-lg transition-shadow text-ui-300 delay-0">
        <div class="x relative z-10 items-center md:space-x-2 z-20">
            <div class="y w-full items-start relative z-0">
                <Link :href="route('levels.show', level.id)" class="z-0 absolute inset-0"></Link>
                <div class="x items-stretch relative z-10 [text-shadow:black_0_0_10px]">
                    <span class="y sm:hidden space-y-1 justify-center mx-3">
                        <span class="rounded-full p-[.15rem] px-2 bg-yellow-400" :class="{'invisible': level.stars === 0}"></span>
                        <span v-if="level.featured" class="rounded-full p-[.15rem] px-2 bg-amber-500"></span>
                        <span v-if="level.epic > 0" class="rounded-full p-[.15rem] px-2 bg-red-500"></span>
                        <span v-if="level.epic > 1" class="rounded-full p-[.15rem] px-2 bg-fuchsia-500"></span>
                        <span v-if="level.epic > 2" class="rounded-full p-[.15rem] px-2 bg-cyan-300"></span>
                    </span>
                    <Tooltip :message="difficulty(level)" class="sm:ml-3 mr-3 my-2 sm:flex place-items-center w-16 aspect-square shrink-0">
                        <img :src="face(level)" alt=""/>
                    </Tooltip>
                    <div class="y">
                        <Link :href="route('levels.show', level.id)" class="x z-10 pt-2 items-center w-fit">
                            <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                            <div class="hidden sm:flex items-center [text-shadow:black_0px_2px_2px]">
                                <div class="pl-2 pr-0.5 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-yellow-400" :class="{'invisible': level.stars === 0}">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase [text-shadow:black_1px_1px_2px] text-black">Rated</div>
                                    </div>
                                </div>
                                <div class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-amber-500" :class="{'hidden': level.featured === 0}">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Featured</div>
                                    </div>
                                </div>
                                <div v-if="level.epic > 0" class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-red-500">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Epic</div>
                                    </div>
                                </div>
                                <div v-if="level.epic > 1" class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-fuchsia-500">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Legendary</div>
                                    </div>
                                </div>
                                <div v-if="level.epic > 2" class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-cyan-300">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Mythic</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <p v-if="level.creator === '-'" class="text-lg">{{ level.creator }}</p>
                        <div v-else class="x">
                            <Link class="text-lg w-fit" :href="route('profiles.show', level.creator)">{{ level.creator }}</Link>
                            <Link :href="route('levels.show', level.id)" class="grow"></Link>
                        </div>
                    </div>
                </div>
                <LevelRatingStamp v-if="showRatings" :level="level"/>
            </div>
        </div>
        <div v-if="isAdmin()" @click.stop class="hidden sm:block absolute right-0 top-0 h-full z-30 overflow-hidden">
            <div class="y justify-between relative -right-[100%] group-hover/ticket:right-0 transition-[right] p-2 h-full">
                <Link v-if="level.reviews && level.reviews.length" :href="route('reviews.show', level.reviews[0].id)" class="block p-2 bg-ui-800 border border-ui-700 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="{'text-amber-500': !!level.reviews[0].rating_difficulty + !!level.reviews[0].rating_gameplay + !!level.reviews[0].rating_visuals + !!level.reviews[0].rating_overall < 4}">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                    </svg>
                </Link>
                <div @click="openBannerFile" v-if="isAdmin()" class="block cursor-pointer p-2 bg-ui-800 border border-ui-700 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                        <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="block cursor-pointer p-2 bg-ui-800 border border-ui-700 rounded-md invisible">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 -z-10"></div>
            </div>
        </div>
        <div class="absolute z-0 right-0 top-0 h-full w-full rounded-lg overflow-hidden [mask-image:linear-gradient(to_right,rgba(0,0,0,0.1)_25%,rgba(0,0,0,1)_60%);]">
            <div class="absolute inset-0 -md:w-4/5 group-hover/ticket:scale-105 transition-transform bg-cover bg-center opacity-80" :style="`background-image:url('${level.banner_url ?? ('https://levelthumbs.prevter.me/thumbnail/' + level.id + '/small')}');`"></div>
        </div>
    </div>
</template>
