<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import LevelTicket from "@/Components/LevelTicket.vue";

const props = defineProps({
    tag: Object,
    levels: Object
})

</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('tags.index')">Tags</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ tag.name }}</span>
        </template>
        <div class="y space-y-4 w-full">
            <h2 class="font-bold text-2xl capitalize">Levels Tagged <span class="pane !px-2 !py-0.5 ">{{ tag.name }}</span></h2>
            <span class="pane" v-if="levels.data.length === 0">There are no levels with this tag</span>
            <Pagination :list="levels"/>
            <LevelTicket v-for="level in levels.data" :level="level"/>
        </div>
    </app-layout>
</template>
