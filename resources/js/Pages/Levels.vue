<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Link } from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Levels</span>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div class="space-y-2">
                    <h2 class="mx-2 font-bold text-2xl">Levels</h2>
                    <div class="md:rounded px-4 py-2 space-y-2 bg-neutral-900 border border-neutral-700">
                        <p>y'know</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <h2 class="font-bold text-2xl">More</h2>
                <div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                    Join us on Discord
                </div>
                <div class="rounded bg-neutral-900 border border-neutral-700">
                    <h3 class="px-4 font-bold text-xl py-2">Username</h3>
                    <div class="flex flex-col">
                        <div class="flex border-t border-t-neutral-700">
                            <div class="p-4 text-sm flex flex-col w-1/2 border-r border-r-neutral-700">
                                <span>9</span>
                                <span>Reputation</span>
                            </div>
                            <div class="p-4 w-1/2 ">9</div>
                        </div>
                        <div class="flex border-t border-t-neutral-700">
                            <div class="p-4 w-1/2 border-r border-r-neutral-700">9</div>
                            <div class="p-4 w-1/2">9</div>
                        </div>
                    </div>
                </div>
                <h2 class="font-bold text-2xl">Latest Tweets</h2>
                <div class="rounded px-4 py-2 bg-neutral-900 border border-neutral-700">
                    hello
                </div>
                <StatsPanel/>
            </div>
        </div>
    </app-layout>
</template>
