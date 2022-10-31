<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Link } from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import route from 'ziggy-js'

defineProps({
    forums: Array,
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Forums</span>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div v-if="forums.length === 0">
                    <div class="rounded px-4 py-2 space-y-2 bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
                        <p>No Fooms Have Been Created :(</p>
                    </div>
                </div>
                <div v-for="forum in forums" class="flex-col space-y-2">
                    <h2 class="mx-2 font-bold text-2xl">{{ forum.name }}</h2>
                    <div v-for="subforum in forum.children" class="flex justify-between items-center box !py-4">
                        <div class="flex items-center space-x-4">
                            <div class="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                            </div>
                            <div>
                                <Link :href="route('forums.show', subforum.slug)" class="text-xl">{{ subforum.name }}</Link>
                                <p class="text-sm">{{ subforum.description }}</p>
                            </div>
                        </div>
                        <div class="x items-center text-center gap-2">
                            <div class="y">
                                <h2>{{ subforum.posts_count }}</h2>
                                <p class="text-xs">Posts</p>
                            </div>
                            <div class="y">
                                <h2>{{ subforum.threads_count }}</h2>
                                <p class="text-xs">Threads</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="y space-y-4 md:w-1/4">
                <h2 class="mx-2 font-bold text-2xl">More</h2>
                <div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                    Join us on Discord
                </div>
                <div v-if="$page.props.auth" class="box !px-0 !py-0">
                    <h3 class="mx-3 font-bold text-xl py-2">{{ $page.props.user.name }}</h3>
                    <div class="y">
                        <div class="x border-t border-t-neutral-300 dark:border-t-neutral-700">
                            <div class="p-4 text-sm y w-1/2 border-r border-r-neutral-300 dark:border-r-neutral-700">
                                <span>{{ $page.props.user.reputation }}</span>
                                <span>Reputation</span>
                            </div>
                            <div class="p-4 text-sm y w-1/2 ">
                                <span>{{ $page.props.user.credits }}</span>
                                <span>Credits</span>
                            </div>
                        </div>
                        <div v-if="false" class="x border-t border-t-neutral-300 dark:border-t-neutral-700">
                            <div class="p-4 text-sm y w-1/2 border-r border-r-neutral-300 dark:border-r-neutral-700">
                                <span>{{ $page.props.user.reputation }}</span>
                                <span>Reputation</span>
                            </div>
                            <div class="p-4 text-sm y w-1/2">
                                <span>{{ $page.props.user.reputation }}</span>
                                <span>Reputation</span>
                            </div>
                        </div>
                    </div>
                </div>
                <StatsPanel/>
            </div>
        </div>
    </app-layout>
</template>
