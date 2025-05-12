<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, router} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import {ref} from "vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import Sorting from "@/Components/Sorting.vue";
import QueryFooter from "@/Components/QueryFooter.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    levels: Object,
    sorting: Object,
    recent_reviews: Object
})

const level_id = ref(null)
</script>
<template>
    <app-layout title="Levels">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
        </template>
        <div class="y space-y-2 md:w-3/4">
            <div class="y sm:flex-row space-y-2 sm:space-y-0 justify-between items-center">
                <h2 class="font-bold text-2xl">Levels</h2>
                <Sorting :sorting="sorting" :url="route('levels.index')"/>
            </div>
            <Pagination :list="levels"/>
            <!-- TODO: Add more (helpful) messages for other filters -->
            <div class="pane text-center italic text-ui-500" v-if="levels.data.length === 0 && levels.total === 0 && sorting.filter === 1">"You haven't reviewed {{ Math.random() < 0.1 ? 'jack, shit' : 'shit, jack' }}!"</div>
            <div class="pane text-center italic text-ui-500" v-else-if="levels.data.length === 0 && levels.total > 0">"You just blow in from stupid town?"</div>
            <transition-group v-else enter-from-class="opacity-0 -translate-x-6" enter-to-class="opacity-100 translate-x-0" appear name="fade" tag="div" class="y relative space-y-4">
                <LevelTicket v-for="(level, index) in levels.data" :level="level" :key="level.id" :style="`transition-delay: ${index * 65}ms;`"/>
            </transition-group>
            <QueryFooter :results="levels" :sorting="sorting" :url="route('levels.index')"/>
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
        </div>
    </app-layout>
</template>
<style>
.fade-enter-active {
    transition: opacity 300ms ease-out, transform 300ms ease-out;
}
</style>
