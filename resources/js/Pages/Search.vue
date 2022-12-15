<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import {Link} from'@inertiajs/inertia-vue3'
import Dropdown from "@/Jetstream/Dropdown.vue";
import {Inertia} from "@inertiajs/inertia";
import route from "ziggy-js";
import Button from "@/Jetstream/Button.vue";
import {ref} from "vue";
import Input from "@/Jetstream/Input.vue";

const props = defineProps({
    filters: Object
})

const searchType = ref(props.filters.searchType);
const searchTypeNames = [
    'Forum Posts',
    'Reviews',
    'Profile Comments',
    'User',
]

const sortBy = ref(props.filters.sortBy);
const sortByNames = [
    [
        'ID',
        'Title',
        'Content',
        'Date'
    ],
    [
        'ID',
        'Author',
        'Rating'
    ],
    [
        'ID',
        'Username',
        'Rating Count'
    ],
    [
        'ID',
        'Username',
        'Rating Count'
    ]
]

const sortDir = ref(props.filters.sortDir);
const sortDirNames = [
    'Descending',
    'Ascending'
]

const setSearchType = (value) => {
    searchType.value = value;
    sortBy.value = 0;
    //search();
}

const setSortBy = (value) => {
    sortBy.value = value;
    //search();
}

const setSortDir = (value) => {
    sortDir.value = value;
    //search();
}

const search = () => {
    Inertia.get(route('users.index') + '?' + new URLSearchParams({
        sortBy: sortBy,
        sortDir: sortDir,
    }).toString())
}
</script>
<template>
    <app-layout title="Search">
        <template #breadcrumbs>
            <span>Search</span>
        </template>
        <div class="flex flex-col space-y-4 md:w-1/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">Search</h2>
                <div class="y pane space-y-2">
                    <div class="y space-y-1">
                        <span class="text-sm">Search</span>
                        <Input type="text" placeholder="Search"/>
                    </div>
                    <div class="y space-y-1">
                        <span class="text-sm">Search Type</span>
                        <Dropdown align="left" class="w-full" container-classes="mt-0" content-classes="select-none rounded-t-none border-t-0 -mt-1" width="full">
                            <template #trigger>
                                <div class="flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer">
                                    <span class="capitalize select-none">{{ searchTypeNames[searchType] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div v-for="(option, index) in searchTypeNames" @click="setSearchType(index)" :key="index" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800">{{ searchTypeNames[index] }}</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="y space-y-1">
                        <span class="text-sm">Sort By</span>
                        <Dropdown align="left" class="w-full" :container-classes="['mt-0']" :content-classes="['select-none', 'rounded-t-none', 'border-t-0', '-mt-1']" width="full">
                            <template #trigger>
                                <div class="flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer">
                                    <span class="capitalize select-none">{{ sortByNames[searchType][sortBy] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div v-for="(option, index) in sortByNames[searchType]" @click="setSortBy(index)" :key="index" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800">{{ sortByNames[searchType][index] }}</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="y space-y-1">
                        <span class="text-sm">Sort Direction</span>
                        <Dropdown align="left" class="w-full" container-classes="mt-0" content-classes="select-none rounded-t-none border-t-0 -mt-1" width="full">
                            <template #trigger>
                                <div class="flex justify-between border border-neutral-200 dark:border-neutral-700 items-center space-x-2 bg-neutral-900 px-2 py-1 rounded text-sm cursor-pointer">
                                    <span class="capitalize select-none">{{ sortDirNames[sortDir] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div v-for="(option, index) in sortDirNames" @click="setSortDir(index)" :key="index" class="px-2 py-1 text-sm cursor-pointer hover:bg-neutral-800">{{ sortDirNames[index] }}</div>
                            </template>
                        </Dropdown>
                    </div>
                    <Button class="w-fit" @click="search">Search</Button>
                </div>
            </div>
        </div>
        <div class="flex flex-col space-y-4 md:w-3/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">Results</h2>
                <div class="pane">
                    <p class="opacity-50 italic">No Results</p>
                </div>
            </div>
        </div>
    </app-layout>
</template>
