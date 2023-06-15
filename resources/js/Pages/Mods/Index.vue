<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, router} from '@inertiajs/vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import {ref} from "vue";
import ResourceTicket from "@/Components/ResourceTicket.vue";

const props = defineProps({
    mods: Object,
    filters: Object
})

const mod_id = ref(null)

let sortBy = props.filters.sortBy;
const sortByNames = [
    'ID',
    'Rating',
    'Download Count',
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
    'Purchased'
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
    router.get(route('mods.index') + '?' + new URLSearchParams({
        sortBy: sortBy,
        sortDir: sortDir,
        filter: filter,
    }).toString())
}
</script>
<template>
    <app-layout title="Mods">
        <template #breadcrumbs>
            <Link :href="route('mods.index')">Mods</Link>
        </template>
        <div class="y space-y-4 w-full">
            <div class="x justify-between items-center">
                <h2 class="font-bold text-2xl">Mods</h2>
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
                                <div @click="setSortBy(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700 rounded-t">ID</div>
                                <div @click="setSortBy(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Rating</div>
                                <div @click="setSortBy(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Downloads</div>
                                <div @click="setSortBy(5)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700 rounded-b">Review Count</div>
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
                                <div @click="setFilter(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700 rounded-t">All</div>
                                <div @click="setFilter(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Reviewed</div>
                                <div @click="setFilter(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700 rounded-b">Unreviewed</div>
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
                                <div @click="setSortDir(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700 rounded-t">Descending</div>
                                <div @click="setSortDir(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700 rounded-b">Ascending</div>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <Pagination :list="mods"/>
            <div class="pane italic" v-if="mods.total === 0"><span class="opacity-50">No mods here, chief.</span></div>
            <transition-group enter-from-class="opacity-0 -translate-x-6" enter-to-class="opacity-100 translate-x-0" appear name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResourceTicket v-for="(mod, index) in mods.data" :mod="mod" class="col-span-1" :key="mod.id" :style="`transition-delay: ${index * 65}ms;`"/>
            </transition-group>
            <Pagination :list="mods"/>
        </div>
    </app-layout>
</template>
<style>
.fade-enter-active {
    transition: opacity 300ms ease-out, transform 300ms ease-out;
}
</style>
