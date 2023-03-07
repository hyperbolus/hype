<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, router} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import {ref} from "vue";

const props = defineProps({
    levels: Object,
    filters: Object
})

const level_id = ref(null)

let sortBy = props.filters.sortBy;
const sortByNames = [
    'ID',
    'Overall Rating',
    'Gameplay Rating',
    'Visual Rating',
    'Difficulty Rating',
    'Review Count'
]
let sortDir = props.filters.sortDir;
const sortDirNames = [
    'Descending',
    'Ascending'
]
let filter = props.filters.filter;
const filterNames = [
    'All',
    'Reviewed',
    'Unreviewed'
]
function setSortBy(value) {
    sortBy = value;
    search();
}
function setSortDir(value) {
    sortDir = value;
    search();
}
function setFilter(value) {
    filter = value;
    search();
}

const search = () => {
    router.get(route('levels.index') + '?' + new URLSearchParams({
        sortBy: sortBy,
        sortDir: sortDir,
        filter: filter,
    }).toString())
}
const difficulties = [
    "Unrated",
    "Auto",
    "Easy",
    "Normal",
    "Hard",
    "Harder",
    "Insane",
    "Easy Demon",
    "Medium Demon",
    "Hard Demon",
    "Insane Demon",
    "Extreme Demon",
]

const face = (level) => {
    if (!level.difficulty) {
        return difficulties[0].toLowerCase()
    }

    let name = difficulties[level.difficulty].toLowerCase().split(' ').reverse().join('-')

    if(level.epic) {
        name += '-epic'
    } else if (level.featured) {
        name += '-featured'
    }

    return name;
}
</script>
<template>
    <app-layout title="Levels">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
        </template>
        <div class="y space-y-4 md:w-3/4">
            <div class="x justify-between items-center">
                <h2 class="font-bold text-2xl">Levels</h2>
                <div class="x space-x-4 items-center">
                    <div class="x space-x-2 items-center">
                        <Dropdown align="left">
                            <template #trigger>
                                <div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer">
                                    <span class="capitalize">{{ sortByNames[sortBy] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div @click="setSortBy(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t">ID</div>
                                <div @click="setSortBy(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Overall Rating</div>
                                <div @click="setSortBy(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Gameplay Rating</div>
                                <div @click="setSortBy(3)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Visual Rating</div>
                                <div @click="setSortBy(4)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Difficulty Rating</div>
                                <div @click="setSortBy(5)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b">Review Count</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div v-if="$page.props.auth" class="x space-x-2 items-center">
                        <Dropdown align="left">
                            <template #trigger>
                                <div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer">
                                    <span class="capitalize">{{ filterNames[filter] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div @click="setFilter(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t">All</div>
                                <div @click="setFilter(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Reviewed</div>
                                <div v-if="false" @click="setFilter(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b">Unreviewed</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="x space-x-2 items-center">
                        <Dropdown align="left">
                            <template #trigger>
                                <div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer">
                                    <span>{{ sortDirNames[sortDir] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div @click="setSortDir(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t">Descending</div>
                                <div @click="setSortDir(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b">Ascending</div>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <Pagination :list="levels"/>
            <transition-group enter-from-class="opacity-0 -translate-x-6" enter-to-class="opacity-100 translate-x-0" appear name="fade" tag="div" class="y space-y-4">
                <Link v-for="(level, index) in levels.data" :href="route('levels.show', level.id)" :key="level.id" :style="`transition-delay: ${index * 65}ms;`" class="pane overflow-hidden relative space-y-2 hover:shadow-lg transition-shadow">
                    <div class="y md:flex-row relative z-10 items-center md:space-x-4">
                        <div class="x items-center grow">
                            <img class="h-24 mr-4" :src="'https://browser.gdps.io/assets/difficulties/' + face(level) + '.png'" alt="difficulty"/>
                            <div>
                                <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                                <p class="text-lg">{{ level.creator }}</p>
                            </div>
                        </div>
                        <div class="x justify-end space-x-4 py-4" style="filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 1))">
                            <div class="y items-center">
                                <span class="text-2xl font-bold">{{ level.rating_difficulty ? Math.round((level.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">DIFFICULTY</span>
                            </div>
                            <div class="y items-center">
                                <span class="text-2xl font-bold">{{ level.rating_gameplay ? Math.round((level.rating_gameplay / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">GAMEPLAY</span>
                            </div>
                            <div class="y items-center">
                                <span class="text-2xl font-bold">{{ level.rating_visuals ? Math.round((level.rating_visuals / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">VISUALS</span>
                            </div>
                            <div class="y items-center">
                                <span class="text-2xl font-bold">{{ level.rating_overall ? Math.round((level.rating_overall / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">OVERALL</span>
                            </div>
                            <div class="y items-center">
                                <span class="text-2xl font-bold">{{ level.reviews_count }}</span>
                                <span class="text-xs">REVIEWS</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="level.banner_url" class="absolute top-1/2 -translate-y-1/2 right-0 w-3/4 opacity-80" style="mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.8) 75%);">
                        <img :src="level.banner_url" alt="Level Banner"/>
                    </div>
                </Link>
            </transition-group>
            <Pagination :list="levels"/>
        </div>
        <div class="y space-y-4 md:w-1/4">
            <h2 class="font-bold text-2xl">Add Level</h2>
            <div class="pane">
                <div class="space-y-2 my-2">
                    <Input type="text" v-model="level_id" placeholder="Level ID" class="w-full" required/>
                    <Button @click="router.get(level_id ? route('levels.show', level_id) : '#')">Add</Button>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<style>
.fade-enter-active {
    transition: opacity 300ms ease-out, transform 300ms ease-out;
}
</style>
