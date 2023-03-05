<script setup>
import {Link} from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import PatreonGoal from "@/Components/PatreonGoal.vue";
import route from 'ziggy-js'
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('home')">Home</Link>
        </template>
        <div class="y space-y-4 md:w-3/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">Home</h2>
                <div class="x items-center !hidden">
                    <div class="shadow z-20 bg-gradient-to-t from-black to-neutral-900 rounded-l px-4 py-1 w-fit">Message</div>
                    <div class="z-10 bg-gradient-to-t from-black to-neutral-900 -skew-x-[45deg] border-r-[2px] border-r-red-500 w-12 py-1 -ml-4 h-full bg-black">&#8203;</div>
                    <div class="shadow rounded -skew-x-[45deg] border-r-[8px] border-r-red-500 w-8 py-1 -ml-4 h-full bg-black">&#8203;</div>
                </div>
                <div class="pane">
                    <h2 class="font-bold text-xl">About</h2>
                    <p>DashNet is currently in beta. Join our Discord to suggest new features, give feedback, and get help!</p>
                    <a class="underline" href="https://trello.com/b/JJOVCmbF/gdc" target="_blank">Click here to visit our Trello</a>
                </div>
                <div class="hidden glass pt-2 overflow-clip">
                    <h2 class="font-bold text-xl mx-4 mb-2">Shoutbox</h2>
                    <div class="y transition-colors bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60 h-64 overflow-y-auto text-sm divide-y divide-neutral-200 dark:divide-neutral-700">
                        <span class="px-2 py-1">Chatter 1: hello!</span>
                        <span class="px-2 py-1 transition-colors">Chatter 2: hi!</span>
                        <span class="px-2 py-1 transition-colors">Chatter 192: hey!</span>
                    </div>
                    <input class="w-full transition-colors bg-neutral-200 dark:bg-neutral-900 outline-0 border-none focus:ring-0 placeholder-neutral-600 dark:placeholder-neutral-600 " placeholder="Type your message..." type="text"/>
                </div>
                <div class="pane">
                    <h2 class="font-bold text-xl">Special Thanks</h2>
                    <ul class="list-inside list-disc">
                        <li>Cvolton for help regarding interacting with gd servers</li>
                        <li>matcool for replay conversion code</li>
                        <li>matcool again & npesta for inspiring roulette game</li>
                        <li>dogotrigger for providing a large cache of levels for research</li>
                        <li>Geometry Dash Programming Discord</li>
                        <li>Durianhead for his amazing profile banner artwork (<a class="underline" href="https://twitter.com/real_durianhead/status/1462436726496890881?s=20">source</a>)</li>
                        <li>Users like you, thank you!</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <Link href="https://discord.gg/bWt5aks8jb" class="block rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                Join us on Discord
            </Link>
            <PatreonGoal/>
            <h2 class="mx-2 font-bold text-2xl">Staff</h2>
            <div class="pane">
                <ul class="list-inside list-disc">
                    <li><Link :href="route('users.show', 0)">System</Link></li>
                    <li><Link :href="route('users.show', 1)">Admin</Link></li>
                    <li>You?</li>
                </ul>
            </div>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
