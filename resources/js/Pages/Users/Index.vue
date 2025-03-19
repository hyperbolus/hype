<script setup>
import {Link, router} from '@inertiajs/vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Pagination from "@/Components/Pagination.vue";
import AppLayout from "@/Layouts/Dash.vue";
import Avatar from "@/Components/Avatar.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";

const props = defineProps({
    users: Object,
    filters: Object
})


let sortBy = props.filters.sortBy;
const sortByNames = [
    'ID',
    'Username',
    'Reputation',
    'Credits',
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
    router.get(route('users.index') + '?' + new URLSearchParams({
        sortBy: sortBy,
        sortDir: sortDir,
    }).toString())
}
</script>
<template>
    <app-layout title="Users">
        <template #breadcrumbs>
            <Link :href="route('users.index')">Users</Link>
        </template>
        <div class="flex flex-col space-y-2 w-full">
            <div class="x justify-between items-center">
                <h2 class="font-bold text-2xl">Users</h2>
                <div class="flex space-x-4 items-center justify-end">
                    <div class="flex space-x-2 items-center">
                        <Dropdown align="left">
                            <template #trigger>
                                <div class="flex items-center space-x-2 bg-ui-900 px-2 py-1 rounded text-sm cursor-pointer">
                                    <span class="capitalize">{{ sortByNames[sortBy] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div @click="setSortBy(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-t">ID</div>
                                <div @click="setSortBy(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800">Username</div>
                                <div @click="setSortBy(2)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-b">Reputation</div>
                                <div @click="setSortBy(3)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-b">Credits</div>
                                <div @click="setSortBy(4)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-b">Review Count</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <Dropdown align="left">
                            <template #trigger>
                                <div class="flex items-center space-x-2 bg-ui-900 px-2 py-1 rounded text-sm cursor-pointer">
                                    <span>{{ sortDirNames[sortDir] }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div @click="setSortDir(0)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-t">Descending</div>
                                <div @click="setSortDir(1)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-b">Ascending</div>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <Pagination :list="users"/>
            <div class="flex flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="user in users.data" class="x pane transition shadow hover:shadow-lg hover:bg-opacity-75 justify-between items-center px-4 py-2">
                    <div class="x items-center">
                        <Avatar width="w-12" class="mr-4" :user="user"/>
                        <div class="y space-y-1">
                            <span><Username class="font-bold text-lg" :user="user"/> <span class="hidden text-ui-400 text-sm">({{ user.pronouns }})</span></span>
                            <div class="x space-x-3">
                                <Tooltip message="Reviews" container-class="x items-center space-x-1">
                                    <div class="x items-center space-x-1">
                                        <Icon class="w-5" name="pencil-square"/>
                                        <span class="text-sm">{{ user.reviews_count }}</span>
                                    </div>
                                </Tooltip>
                                <Tooltip message="Reputation" container-class="x items-center space-x-1">
                                    <div class="x items-center space-x-1">
                                        <Icon class="w-5" name="scale"/>
                                        <span class="text-sm">{{ user.reputation }}</span>
                                    </div>
                                </Tooltip>
                                <Tooltip message="Credits" container-class="x items-center space-x-1">
                                    <div class="x items-center space-x-1">
                                        <Icon class="w-5" name="currency-dollar"/>
                                        <span class="text-sm">{{ user.credits }}</span>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :list="users"/>
        </div>
    </app-layout>
</template>
