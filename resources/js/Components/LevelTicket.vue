<script setup>
import {Link} from "@inertiajs/vue3";
import {face} from "@/util.js";
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

</script>
<template>
    <div>
        <div class="relative group/ticket">
            <Link :href="route('levels.show', level.id)" class="block pane z-0 !px-0 !py-0 relative hover:shadow-lg transition-shadow text-ui-300 delay-0">
                <div class="x relative z-10 items-center md:space-x-2">
                    <div class="y w-full z-0">
                        <div class="x items-center px-4 py-2 [text-shadow:black_0_0_10px]">
                            <span class="y sm:hidden space-y-1 justify-center -ml-1 mr-3">
                                <span class="rounded-full p-[.15rem] px-2 bg-yellow-400" :class="{'invisible': level.stars === 0}"></span>
                                <span v-if="level.featured" class="rounded-full p-[.15rem] px-2 bg-amber-500"></span>
                                <span v-if="level.epic > 0" class="rounded-full p-[.15rem] px-2 bg-red-500"></span>
                                <span v-if="level.epic > 1" class="rounded-full p-[.15rem] px-2 bg-fuchsia-500"></span>
                                <span v-if="level.epic > 2" class="rounded-full p-[.15rem] px-2 bg-cyan-300"></span>
                            </span>
                            <Tooltip class=" mr-4 sm:flex place-items-center w-16 aspect-square shrink-0">
                                <img class="" :src="face(level)" alt=""/>
                            </Tooltip>
                            <div class="y">
                                <div class="x z-10 items-center h-full">
                                    <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                                    <div class="hidden sm:flex items-center [text-shadow:black_0px_2px_2px]">
                                        <div class="pl-2 pr-0.5 py-2 group">
                                            <div class="rounded-sm px-[.15rem] bg-yellow-400" :class="{'invisible': level.stars === 0}">
                                                <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase [text-shadow:black_1px_1px_2px] text-black">Rated</div>
                                            </div>
                                        </div>
                                        <div class="px-0.5 py-2 group">
                                            <div class="rounded-sm px-[.15rem] bg-amber-500" :class="{'invisible': level.featured === 0}">
                                                <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Featured</div>
                                            </div>
                                        </div>
                                        <div class="px-0.5 py-2 group">
                                            <div class="rounded-sm px-[.15rem] bg-red-500" :class="{'invisible': level.epic < 1}">
                                                <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Epic</div>
                                            </div>
                                        </div>
                                        <div class="px-0.5 py-2 group">
                                            <div class="rounded-sm px-[.15rem] bg-fuchsia-500" :class="{'invisible': level.epic < 2}">
                                                 <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Legendary</div>
                                            </div>
                                        </div>
                                        <div class="pl-0.5 pr-12 py-2 group">
                                            <div class="rounded-sm px-[.15rem] bg-cyan-300" :class="{'invisible': level.epic < 3}">
                                                <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Mythic</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p v-if="level.creator === '-'" class="text-lg">{{ level.creator }}</p>
                                <Link v-else class="text-lg w-fit" :href="route('profiles.show', level.creator)">{{ level.creator }}</Link>
                            </div>
                        </div>
                        <div class="rounded-bl-lg">
                            <LevelRatingStamp v-if="showRatings" :level="level"/>
                        </div>
                    </div>
                </div>
                <div class="absolute z-0 right-0 top-0 h-full w-full rounded-lg overflow-hidden [mask-image:linear-gradient(to_right,rgba(0,0,0,0.1)_25%,rgba(0,0,0,1)_60%);]">
                    <div class="absolute inset-0 -md:w-4/5 group-hover/ticket:scale-105 transition-transform bg-cover bg-center opacity-80" :style="`background-image:url('${level.banner_url ?? ('https://levelthumbs.prevter.me/thumbnail/' + level.id + '/small')}');`"></div>
                </div>
            </Link>
        </div>
    </div>
</template>
