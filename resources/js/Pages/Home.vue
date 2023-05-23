<script setup>
import {Link} from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import PatreonGoal from "@/Components/PatreonGoal.vue";
import route from 'ziggy-js'
import DiscordInvite from "@/Components/DiscordInvite.vue";
import hyper1 from '@/../images/sd2_girl_base.png'
import hyper2 from '@/../images/sd2_girl_mask.png'
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
                    <p>GD Forums is currently in beta. Join our Discord to suggest new features, give feedback, and get help!</p>
                </div>
                <div class="pane">
                    <h2 class="font-bold text-xl">What</h2>
                    <p>This site currently has a forum for discussion and a system for rating, tagging, and adding videos to levels. Also putting levels into playlists and playing level roulette.</p>
                </div>
                <div class="pane">
                    <h2 class="font-bold text-xl">How</h2>
                    <p>Create an account to contribute content. Go to the level reviews page to fetch a level and on the level page you can leave a review or suggest a tag and vote on other tags.</p>
                </div>
                <div class="pane">
                    <div class="x space-x-4 h-[50vh]">
                        <div class="y space-y-2 w-1/3 overflow-y-auto">
                            <h2 class="font-bold">Planned</h2>
                            <div class="y rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p>GD Profiles</p>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Pages
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Account Linking
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Add Extra Customization
                                </label>
                            </div>
                        </div>
                        <div class="y space-y-2 w-1/3 overflow-y-auto">
                            <h2 class="font-bold">In-Progress</h2>
                            <div class="rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p>Forums <span class="bg-ui-600 px-2 rounded-full text-xs uppercase">functional</span></p>
                            </div>
                            <div class="y rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p>Level Database <span class="bg-ui-600 px-2 rounded-full text-xs uppercase">functional</span></p>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent checked/> Reviews
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent checked/> Crowdsourced Tags
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Crowdsourced Screenshots
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Crowdsourced Replays
                                </label>
                            </div>
                            <div class="rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p>Profiles <span class="bg-ui-600 px-2 rounded-full text-xs uppercase">functional</span></p>
                            </div>
                            <div class="y rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p>Social Features <span class="bg-ui-600 px-2 rounded-full text-xs uppercase">functional</span></p>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent checked/> Messages
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Reputation
                                </label>
                                <label>
                                    <input type="checkbox" class="rounded" @click.prevent/> Earned Credits / XP
                                </label>
                            </div>
                            <div class="rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p>Mods & texture pack marketplace</p>
                            </div>
                        </div>
                        <div class="y space-y-2 w-1/3 overflow-y-auto">
                            <h2 class="font-bold">Finished</h2>
                            <div class="rounded-lg dark:bg-ui-800 px-4 py-2">
                                <p class="opacity-50">Nothing... ;v;</p>
                            </div>
                        </div>
                    </div>
                    <hr class="border-ui-700 mt-4 mb-1"/>
                    <p>Current roadmap. The "Done" milestone is for v1 release. We are currently in beta!</p>
                </div>
                <div class="relative hidden">
                    <img class="w-64" :src="hyper1"/>
                    <img class="absolute top-0 left-0 rotate-hue w-64" :src="hyper2"/>
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
                        <li>GD Colon for all of his awesome work with gd on web</li>
                        <li>matcool for replay conversion code</li>
                        <li>matcool again & npesta for inspiring roulette game</li>
                        <li>dogotrigger for providing a large cache of levels for research</li>
                        <li>Geometry Dash Programming Discord</li>
                        <li>Country flags by freakflags</li>
                        <li>Durianhead for his amazing profile banner artwork (<a class="underline" href="https://twitter.com/real_durianhead/status/1462436726496890881?s=20">source</a>)</li>
                        <li>Users like you, thank you!</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <DiscordInvite code="bWt5aks8jb"/>
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
