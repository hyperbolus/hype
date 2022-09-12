<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';

const props = defineProps({
    userProfile: Object
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('users.index')">Users</Link>
            <span>&raquo;</span>
            <span>{{ userProfile.id }}</span>
        </template>
        <div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <h2 class="font-bold text-2xl">{{ userProfile.name }}'s Reviews</h2>
                <div v-if="userProfile.reviews.length === 0" class="rounded px-4 py-2 bg-neutral-900 border border-neutral-700">
                    User has not written any reviews
                </div>
                <Link v-else v-for="review in userProfile.reviews" :href="route('levels.show', review.level.id)" class="rounded flex flex-col md:flex-row items-center md:space-x-4 justify-between px-2 py-2 space-y-2 bg-neutral-900 border border-neutral-700 shadow hover:shadow-lg transition-shadow">
                    <div>
                        <div class="flex items-center space-x-2">
                            <h2 class="text-xl font-bold">{{ review.level.name }}</h2>
                            <span>by <span class="font-bold">{{ review.level.creator }}</span></span>
                        </div>
                        <p>{{ review.review }}</p>
                    </div>
                    <div class="flex md:flex-row justify-center md:justify-end space-x-4">
                        <div class="flex flex-col items-center">
                            <span class="text-2xl font-bold">{{ review.rating_difficulty ? Math.round((review.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">DIFFICULTY</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-2xl font-bold">{{ review.rating_gameplay ? Math.round((review.rating_gameplay / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">GAMEPLAY</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-2xl font-bold">{{ review.rating_visuals ? Math.round((review.rating_visuals / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">VISUALS</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-2xl font-bold">{{ review.rating_overall ? Math.round((review.rating_overall / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">OVERALL</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </app-layout>
</template>
