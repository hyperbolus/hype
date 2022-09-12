<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import { Inertia } from '@inertiajs/inertia'

const props = defineProps({
    levels: Array,
    filters: Object
})

const form = useForm({
    level_id: null
})

let sortBy = props.filters.sortBy;
const sortByNames = [
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
    'Unreviewed',
    'Reviewed'
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
    Inertia.get(route('levels.index') + '?' + new URLSearchParams({
        sortBy: sortBy,
        sortDir: sortDir,
        //filter: filter,
    }).toString())
}

const submit = () => {
    form.post(route('levels.store'))
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div class="flex justify-between items-center">
                    <h2 class="font-bold text-2xl">Levels</h2>
                    <div class="flex space-x-4 items-center">
                        <div class="flex space-x-2 items-center">
                            <Dropdown align="left">
                                <template #trigger>
                                    <div class="flex items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer">
                                        <span class="capitalize">{{ sortByNames[sortBy] }}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </template>
                                <template #content>
                                    <div @click="setSortBy(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t">Overall Rating</div>
                                    <div @click="setSortBy(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Gameplay Rating</div>
                                    <div @click="setSortBy(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Visual Rating</div>
                                    <div @click="setSortBy(3)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Difficulty Rating</div>
                                    <div @click="setSortBy(4)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b">Review Count</div>
                                </template>
                            </Dropdown>
                        </div>
                        <div v-if="$page.props.auth && false" class="flex space-x-2 items-center">
                            <Dropdown align="left">
                                <template #trigger>
                                    <div class="flex items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer">
                                        <span class="capitalize">{{ filterNames[filter] }}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </template>
                                <template #content>
                                    <div @click="setFilter(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-t">All</div>
                                    <div @click="setFilter(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700">Reviewed</div>
                                    <div @click="setFilter(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-700 rounded-b">Unreviewed</div>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <Dropdown align="left">
                                <template #trigger>
                                    <div class="flex items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer">
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
                <Link v-for="level in levels" :href="route('levels.show', level.id)" class="rounded px-4 py-2 space-y-2 bg-neutral-900 border border-neutral-700 shadow hover:shadow-lg transition-shadow">
                    <div class="flex flex-col md:flex-row items-center md:space-x-4 justify-between">
                        <div>
                            <h2 class="text-xl">{{ level.name }}</h2>
                            <p>{{ level.description }}</p>
                        </div>
                        <div class="flex justify-end space-x-4">
                            <div class="flex flex-col items-center">
                                <span class="text-2xl font-bold">{{ level.rating_difficulty ? Math.round((level.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">DIFFICULTY</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-2xl font-bold">{{ level.rating_gameplay ? Math.round((level.rating_gameplay / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">GAMEPLAY</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-2xl font-bold">{{ level.rating_visuals ? Math.round((level.rating_visuals / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">VISUALS</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-2xl font-bold">{{ level.rating_overall ? Math.round((level.rating_overall / 2) * 100) / 100 : 'N/A' }}</span>
                                <span class="text-xs">OVERALL</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="text-2xl font-bold">{{ level.reviews_count }}</span>
                                <span class="text-xs">REVIEWS</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <h2 class="font-bold text-2xl">Add Level</h2>
                <div class="rounded bg-neutral-900 p-4 border border-neutral-700">
                    <form @submit.prevent="submit" class="space-y-2">
                        <Input v-model="form.level_id" placeholder="Level ID" class="w-full" required/>
                        <Button>Add</Button>
                    </form>
                </div>
                <div class="rounded bg-cyan-400 text-neutral-50 p-4 overflow-clip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="-z-10 h-6 w-6 -z-10 scale-[6] translate-y-3 opacity-75 float-right text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="relative">Levels must accrue 20 reviews before their average scores are calculated</p>
                </div>
            </div>
        </div>
    </app-layout>
</template>
