<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';

defineProps({
    users: Number,
    levels: Number,
    videos: Number,
    reviews: Number
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Home</span>
        </template>
        <div class="flex max-w-6xl w-full gap-4 py-4">
            <div class="flex flex-col space-y-4 w-3/4">
                <h2 class="font-bold text-2xl">Home</h2>
                <div class="rounded px-4 py-2 space-y-2 bg-gray-50 border border-gray-300">
                    <p>Home is where the homepage is!</p>
                </div>
            </div>
            <div class="flex flex-col space-y-4 w-1/4">
                <h2 class="font-bold text-2xl">More</h2>
                <Link href="https://discord.gg/7EBrDbCsyD" class="rounded bg-[#5865F2] px-4 py-2 text-gray-50 border border-gray-300">
                    Join us on Discord
                </Link>
                <h2 class="font-bold text-2xl">Statistics</h2>
                <div class="rounded px-4 py-2 bg-gray-50 border border-gray-300">
                    <div class="flex justify-between">
                        <span>Members</span>
                        <span>{{ users }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Levels</span>
                        <span>{{ levels }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Reviews</span>
                        <span>{{ reviews }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Videos</span>
                        <span>{{ videos }}</span>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
