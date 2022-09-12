<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import {Inertia} from "@inertiajs/inertia";

const props = defineProps({
    users: Array,
    filters: Object
})


let sortBy = props.filters.sortBy;
const sortByNames = [
    'ID',
    'Username',
    'Rating Count'
]
let sortDir = props.filters.sortDir;
const sortDirNames = [
    'Descending',
    'Ascending'
]
function setSortBy(value) {
    sortBy = value;
    search();
}
function setSortDir(value) {
    sortDir = value;
    search();
}

const search = () => {
    Inertia.get(route('users.index') + '?' + new URLSearchParams({
        sortBy: sortBy,
        sortDir: sortDir,
    }).toString())
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('users.index')">Users</Link>
        </template>
        <div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div class="flex justify-between items-center">
                    <h2 class="font-bold text-2xl">Users</h2>
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
                                    <div @click="setSortBy(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t">ID</div>
                                    <div @click="setSortBy(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800">Username</div>
                                    <div @click="setSortBy(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b">Review Count</div>
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
                                    <div @click="setSortDir(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-t">Descending</div>
                                    <div @click="setSortDir(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800 rounded-b">Ascending</div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <Link v-for="user in users" :href="route('users.show', user.id)" class="block flex justify-between items-center rounded px-4 py-2 bg-neutral-900 border border-neutral-700 shadow hover:shadow-lg transition-shadow">
                    <h2>{{ user.name }}</h2>
                    <span>{{ user.reviews_count }} Reviews</span>
                </Link>
            </div>
        </div>
    </app-layout>
</template>
