<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, router} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import {ref} from "vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import Username from "@/Components/Username.vue";
import {trimAtWord} from "@/util.js";
import {formatTimeAgo} from "@vueuse/core";
import Tooltip from "@/Components/Tooltip.vue";

const props = defineProps({
    levels: Object,
    filters: Object,
    recent_reviews: Object
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
    'Unreviewed',
    'Unapproved Records'
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
                                <div @click="setSortBy(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">ID</div>
                                <div @click="setSortBy(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Overall Rating</div>
                                <div @click="setSortBy(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Gameplay Rating</div>
                                <div @click="setSortBy(3)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Visual Rating</div>
                                <div @click="setSortBy(4)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Difficulty Rating</div>
                                <div @click="setSortBy(5)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Review Count</div>
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
                                <div @click="setFilter(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">All</div>
                                <div @click="setFilter(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Reviewed</div>
                                <div @click="setFilter(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Unreviewed</div>
                                <div @click="setFilter(3)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Unapproved Replays</div>
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
                                <div @click="setSortDir(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Descending</div>
                                <div @click="setSortDir(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Ascending</div>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <Pagination :list="levels"/>
            <!-- TODO: Add more (helpful) messages for other filters -->
            <div class="pane text-center italic text-ui-500" v-if="levels.data.length === 0 && levels.total === 0 && filters.filter === 1">"You haven't reviewed {{ Math.random() < 0.1 ? 'jack, shit' : 'shit, jack' }}!"</div>
            <div class="pane text-center italic text-ui-500" v-else-if="levels.data.length === 0 && levels.total > 0">"You just blow in from stupid town?"</div>
            <transition-group v-else enter-from-class="opacity-0 -translate-x-6" enter-to-class="opacity-100 translate-x-0" appear name="fade" tag="div" class="y relative space-y-4">
                <LevelTicket v-for="(level, index) in levels.data" :level="level" :key="level.id" :style="`transition-delay: ${index * 65}ms;`"/>
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
            <div class="rounded-lg bg-ui-700 p-4 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="-z-10 h-6 w-6 -z-10 scale-[6] translate-y-3 float-right text-ui-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="relative">Levels must have at least 5 reviews before their average scores are calculated</p>
            </div>
            <h2 class="font-bold text-2xl">Recent Reviews</h2>
            <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
                <div class="y px-4 py-2 text-sm" v-for="review in recent_reviews">
                    <div class="x justify-between space-x-2">
                        <Link :href="route('levels.show', review.level.id)" class="font-bold">{{ review.level.name }}</Link>
                        <Tooltip :message="review.created_at"><span class="text-ui-500">{{ formatTimeAgo(new Date(review.created_at)) }}</span></Tooltip>
                    </div>
                    <span class="text-ui-500">by {{ review.level.creator }}</span>
                    <Link :href="route('reviews.show', review.id)" class="italic">"{{ trimAtWord(review.review, 100) }}"</Link>
                    <div class="x items-center space-x-1 justify-end"><span>&#8212;</span><Username :user="review.author"/></div>
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
