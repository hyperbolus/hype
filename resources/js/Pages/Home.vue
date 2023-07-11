<script setup>
import {Link} from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import PatreonGoal from "@/Components/PatreonGoal.vue";
import route from 'ziggy-js'
import DiscordInvite from "@/Components/DiscordInvite.vue";
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
                    <div class="shadow z-20 bg-gradient-to-t from-black to-ui-900 rounded-l px-4 py-1 w-fit">Message</div>
                    <div class="z-10 bg-gradient-to-t from-black to-ui-900 -skew-x-[45deg] border-r-[2px] border-r-red-500 w-12 py-1 -ml-4 h-full bg-black">&#8203;</div>
                    <div class="shadow rounded -skew-x-[45deg] border-r-[8px] border-r-red-500 w-8 py-1 -ml-4 h-full bg-black">&#8203;</div>
                </div>
                <details class="pane" open>
                    <summary class="font-bold text-xl">What's Here</summary>
                    <p>This site currently has a forum for discussion and a system for rating, tagging, and adding videos and screenshots to levels. Also putting levels into playlists and playing level roulette.</p>
                    <p class="mt-2 font-bold text-red-400">NOTE: Mobile support is still in progress! If you notice any bugs they have probably been noticed already. Please only report bugs that are detrimental to your use of the site</p>
                </details>
                <details class="pane" open>
                    <summary class="font-bold text-xl">How Do I...</summary>
                    <p>You will need an account to make contributions or participate in discussion. If you need help with anything please visit our Discord.</p>
                </details>
                <div class="hidden glass pt-2 overflow-hidden">
                    <h2 class="font-bold text-xl mx-4 mb-2">Shoutbox</h2>
                    <div class="y bg-ui-900 h-64 overflow-y-auto text-sm divide-y divide-ui-700">
                        <span class="px-2 py-1">Chatter 1: hello!</span>
                        <span class="px-2 py-1">Chatter 2: hi!</span>
                        <span class="px-2 py-1">Chatter 192: hey!</span>
                    </div>
                    <input class="w-full bg-ui-900 outline-0 border-none focus:ring-0 placeholder-ui-600 " placeholder="Type your message..." type="text"/>
                </div>
                <details class="pane">
                    <summary class="font-bold text-xl">About</summary>
                    <h2 class="font-bold">History</h2>
                    <p>GD Forums is a project that started in my mind palace around ~2016. Some very poorly though out
                        prototypes and a slightly better thought-out MyBB site later and here we are. Its current
                        iteration is what you are using right now!</p>
                    <h2 class="font-bold mt-2">Technology</h2>
                    <p>The site is powered by the Laravel PHP framework + various services that sync from boomlings. The
                        frontend is Vue + Tailwind. This version (specifically the review system) was originally based
                        on the work of Spellslave's short-lived Grimoire software. Though it has since been essentially
                        rewritten. The site or at least parts of it may be open sourced in the future.</p>
                </details>
                <details class="pane">
                    <summary class="font-bold text-xl">Special Thanks</summary>
                    <ul class="list-inside list-disc">
                        <li>Cvolton for help regarding interacting with gd servers</li>
                        <li>Nora for her amazing work on MDL and being good at design in general</li>
                        <li>GD Colon for all of his awesome work with gd on web</li>
                        <li>matcool for replay conversion code</li>
                        <li>matcool again & npesta for inspiring roulette game</li>
                        <li>dogotrigger for providing a large cache of levels for research</li>
                        <li>Geometry Dash Programming Discord</li>
                        <li>Country flags by freakflags</li>
                        <li>osu for having an oddly really good website that I could steal from</li>
                        <li>Durianhead for his amazing profile banner artwork (<a class="underline" href="https://twitter.com/real_durianhead/status/1462436726496890881?s=20">source</a>)</li>
                        <li>Users like you, thank you!</li>
                    </ul>
                </details>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <DiscordInvite code="bWt5aks8jb"/>
            <PatreonGoal/>
            <h2 class="mx-2 font-bold text-2xl">Staff</h2>
            <div class="pane">
                <p>Who knows? They're in the shadows...</p>
            </div>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
