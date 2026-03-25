<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, usePage} from '@inertiajs/vue3';
import route from 'ziggy-js'
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import {difficulty, face, isAdmin, isAuthenticated} from "@/util";
import RatingOverview from "@/Components/RatingOverview.vue";
import LevelRatingStamp from "@/Components/LevelRatingStamp.vue";
import {computed, ref, toRef, toRefs, useTemplateRef} from "vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import {useTagManager} from "@/lib/composables/useTagManager";
import Lightbox from "@/Components/Lightbox.vue";
import Toggle from "@/Components/Toggle.vue";

const props = computed(() => usePage().props);

const level = computed(() => usePage().props.level);
const levelTagVotes = computed(() => usePage().props.levelTagVotes);
const tags = computed(() => usePage().props.tags);

const tabs = {
    'levels.show': {
        title: 'Overview',
    },
    'levels.reviews.show': {
        title: 'Reviews',
        count: level.value.reviews_count
    },
    'levels.tags.show': {
        title: 'Tags',
        count: level.value.tags_count
    },
    'levels.replays.show': {
        title: 'Macros',
        count: level.value.replays_count
    },
    'levels.videos.show': {
        title: 'Videos',
        count: level.value.videos_count
    },
};

const tagActive = ref(false);
const tagInput = useTemplateRef('tagInput');

const toggleTagInput = () => {
    tagActive.value = !tagActive.value;

    if (tagActive.value && tagInput.value) {
        tagInput.value.focus()
        dropdown.value.open = true;
    }
}

const dropdown = useTemplateRef('dropdown');
const {formVote, searchQuery, searchResults, vote, verify} = useTagManager(tags.value, level, levelTagVotes);
</script>
<template>
    <app-layout :title="level.name" :fullwidth="true" :decorations="false">
        <div class="y relative items-center justify-between md:justify-end h-64 w-full bg-cover bg-center" :style="`background-image:url(${level.banner_url ?? ('https://levelthumbs.prevter.me/thumbnail/' + level.id + '/small')});`">
            <div class="absolute w-full bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black"></div>
            <RatingOverview class="md:hidden w-full !rounded-none" :level="level"/>
            <div class="x items-end lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full px-4 py-2 z-10">
                <Tooltip :message="difficulty(level)" class="md:ml-3 mr-2 md:mr-5 -mb-[0.5rem] md:-mb-10 md:flex place-items-center w-20 md:w-40 aspect-square shrink-0">
                    <img :src="face(level)" alt=""/>
                </Tooltip>
                <div class="grow">
                    <div class="x text-white">
                        <h1 class="text-2xl md:text-4xl font-bold">{{ level.name }}</h1>
                        <div class="x items-center [text-shadow:black_0px_2px_2px]">
                            <div class="pl-2 pr-0.5 py-2 group">
                                <div class="rounded-sm px-[.15rem] bg-yellow-400" :class="{'invisible': level.stars === 0}">
                                    <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase [text-shadow:black_1px_1px_2px]">Rated</div>
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
                    </div>
                    <Link :href="route('profiles.show', level.creator)" class="text-xl">{{ level.creator }}</Link>
                    <div class="x -space-x-2">
                        <img v-for="img in level.coins" class="size-6" src="https://browser.gdps.io/assets/silvercoin.png" alt="">
                    </div>
                </div>
                <RatingOverview class="!hidden md:!flex" :level="level"/>
            </div>
        </div>
        <div class="y justify-center w-full bg-ui-900 items-center">
            <div class="x flex-wrap items-center gap-2 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full px-4 py-2">
                <span class="y items-center font-bold text-sm uppercase md:ml-48">Top Tags</span>
                <div class="py-2 select-none border-r border-ui-700"></div>
                <span v-if="level.top_tags.length === 0" class="text-ui-500">No Tags</span>
                <div v-else v-for="tag in level.top_tags" class="x items-center text-ui-300 pl-2 pr-0.5 py-1 text-sm rounded-md bg-ui-800 capitalize group/tag">
                    <Tooltip @click="isAdmin() ? verify(tag.id, !tag.pivot.verified) : void(0)" v-if="tag.pivot.verified || isAdmin()" :inline="true" :message="`${tag.pivot.verified ? 'Verified' : 'Unverified'} tag`" class="mr-0.5" :class="{'cursor-pointer': isAdmin()}">
                        <Icon name="check" size="16" scale="size-5" class="rounded-full" :class="tag.pivot.verified ? 'text-blue-500' : 'text-ui-600'"/>
                    </Tooltip>
                    <Link :href="route('tags.show', tag)">{{tag.name}}</Link>
                    <div v-if="isAuthenticated()" class="x items-center px-1">
                        <Icon @click="!tag.voted || (tag.voted && !tag.approved) ? vote(tag.id, true) : void(0)" :class="`${!tag.voted || (tag.voted && !tag.approved) ? 'cursor-pointer text-ui-600' : 'text-green-500'}`" name="arrow-up" size="16" scale="size-4"/>
                        <Icon @click="!tag.voted || (tag.voted && tag.approved) ? vote(tag.id, false) : void(0)" :class="`${!tag.voted || (tag.voted && tag.approved) ? 'cursor-pointer text-ui-600' : 'text-red-500'}`" name="arrow-up" size="16" scale="size-4 rotate-180"/>
                    </div>
                </div>
                <div>
                    <input @keydown.enter="vote(searchQuery, true, () => searchQuery = '')" @click="dropdown.open = true" v-model="searchQuery" placeholder="Tag" ref="tagInput" class="px-0 py-0.5 text-sm mr-0 rounded-md bg-ui-950 border-transparent border-0 w-0 transition-all duration-300 ease-out" :class="{'w-32 !px-2 !mr-2 !border border-ui-700': tagActive}"/>
                    <Dropdown align="left" ref="dropdown">
                        <template #content>
                            <ul class="max-h-[50vh] overflow-y-auto">
                                <li class="px-4 py-1" v-if="searchResults.length === 0">No Results</li>
                                <li class="px-2 py-1 hover:bg-ui-700 cursor-pointer" v-for="tag in searchResults" @click="searchQuery = tag.name">{{ tag.name }}</li>
                            </ul>
                        </template>
                    </Dropdown>
                </div>
                <button v-show="tagActive" @click="vote(searchQuery, true, () => searchQuery = '')" class="bg-ui-800 p-0.5 -ml-3 mr-1 rounded" :class="tagActive ? 'text-green-500 hover:bg-green-500 hover:text-white' : 'hover:bg-ui-700'">
                    <Icon name="paper-airplane" size="16" scale="size-4" class="transition-transform duration-300 ease-out p-0.5"/>
                </button>
                <button @click="toggleTagInput" class="bg-ui-800 rounded -ml-2" :class="tagActive ? 'text-red-500 hover:bg-red-500 hover:text-white' : 'hover:bg-ui-700'">
                    <Icon name="plus" class="transition-transform duration-300 ease-out p-0.5" :class="{'rotate-45': tagActive}"/>
                </button>
                <span class="text-sm text-green-500" v-show="formVote.recentlySuccessful && tagActive">Submitted</span>
            </div>
        </div>
        <div class="y justify-center w-full bg-ui-950 items-center px-4">
            <div class="flex flex-wrap items-center text-sm justify-center z-10">
                <Lightbox>
                    <button class="px-2 py-1">
                        <Icon name="cog-6-tooth" scale="size-4"/>
                    </button>
                    <template #content>
                        <div @click.stop class="x rounded-lg shadow bg-ui-900 border border-ui-700 cursor-auto">
                            <div class="y border-r border-ui-700 min-w-48 py-2">
                                <span class="px-2 py-1 text-xs font-bold uppercase">Introductions</span>
                                <div class="x space-x-2 items-center p-2">
                                    <Icon name="information-circle" size="24" scale="size-8"/>
                                    <span>Level Charts</span>
                                </div>
                                <div class="x space-x-2 items-center p-2">
                                    <Icon name="information-circle" size="24" scale="size-8"/>
                                    <span>Level Pages</span>
                                </div>
                                <span class="px-2 py-1 text-xs font-bold uppercase">Preferences</span>
                                <div class="x space-x-2 items-center p-2 bg-ui-800">
                                    <Icon name="cog" size="24" scale="size-8"/>
                                    <span>Rating & Reviewing</span>
                                </div>
                                <div class="x space-x-2 items-center p-2">
                                    <Icon name="cog" size="24" scale="size-8"/>
                                    <span>Level Pages</span>
                                </div>
                                <div class="x space-x-2 items-center p-2">
                                    <Icon name="cog" size="24" scale="size-8"/>
                                    <span>User Pages</span>
                                </div>
                            </div>
                            <div class="y p-4 bg-ui-950 max-w-2xl rounded-r-lg">
                                <h1 class="text-4xl font-bold border-b border-ui-700">Settings</h1>
                                <label class="x justify-between mt-4">
                                    <span>Show Rating Scores</span>
                                    <Toggle/>
                                </label>
                                <p class="text-sm text-ui-400">Will display rating scores on review cards site-wide. Disabling this option will make scores hidden until clicked on to unspoiler.</p>

                                <label class="x justify-between mt-4">
                                    <span>Show Level Scores</span>
                                    <Toggle/>
                                </label>
                                <p class="text-sm text-ui-400">Will display average site scores for a level on its own page and on it's card site-wide</p>

                                <label class="x justify-between mt-4">
                                    <span>Level Scores on Hover</span>
                                    <Toggle/>
                                </label>
                                <p class="text-sm text-ui-400">Will display average site scores in place of a rating's scores when hovered over on a rating card</p>

                                <label class="x justify-between mt-4">
                                    <span>Relative Indicators</span>
                                    <Toggle/>
                                </label>
                                <p class="text-sm text-ui-400">Will show small icons next to review scores to indicate how far that review's score deviates from the level's average site rating</p>
                            </div>
                        </div>
                    </template>
                </Lightbox>
                <Link v-for="(tab, key) in tabs" :href="route(key, level.id)" :class="{'bg-ui-900': route().current(key)}" class="py-1.5 px-4">
                    <span class="font-bold">{{ tab.title }}</span>
                    <span class="text-ui-500" v-if="tab.hasOwnProperty('count')"> ({{ tab.count }})</span>
                </Link>
            </div>
        </div>
        <div class="y space-y-4 w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl pt-4">
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
