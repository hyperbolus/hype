<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Forums</span>
        </template>
        <div class="flex max-w-6xl w-full gap-4 py-4">
            <div class="flex flex-col space-y-4 w-3/4">
                <h2 class="font-bold text-2xl">Forums</h2>
                <div class="rounded px-2 py-2 space-y-2 bg-gray-50 border border-gray-300">
                    <h2 class="text-xl">Announcements</h2>
                    <p>the forum for announcements</p>
                </div>
            </div>
            <div class="flex flex-col space-y-4 w-1/4">
                <h2 class="font-bold text-2xl">More</h2>
                <div class="rounded bg-[#5865F2] px-4 py-2 text-gray-50 border border-gray-300">
                    Join us on Discord
                </div>
                <div class="rounded bg-gray-100 border border-gray-300">
                    <h3 class="px-4 font-bold text-xl py-2">Username</h3>
                    <div class="flex flex-col">
                        <div class="flex border-t border-t-gray-300">
                            <div class="p-4 text-sm flex flex-col w-1/2 border-r border-r-gray-300">
                                <span>9</span>
                                <span>Reputation</span>
                            </div>
                            <div class="p-4 w-1/2 ">9</div>
                        </div>
                        <div class="flex border-t border-t-gray-300">
                            <div class="p-4 w-1/2 border-r border-r-gray-300">9</div>
                            <div class="p-4 w-1/2">9</div>
                        </div>
                    </div>
                </div>
                <h2 class="font-bold text-2xl">Latest Tweets</h2>
                <div class="rounded px-4 py-2 bg-gray-50 border border-gray-300">
                    hello
                </div>
                <h2 class="font-bold text-2xl">Statistics</h2>
                <div class="rounded px-4 py-2 bg-gray-50 border border-gray-300">
                    <div class="flex justify-between">
                        <span>Members</span>
                        <span>9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Threads</span>
                        <span>9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Posts</span>
                        <span>9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Mods</span>
                        <span>9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Texture Packs</span>
                        <span>9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Videos</span>
                        <span>9</span>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
