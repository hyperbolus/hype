<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";
</script>
<template>
    <app-layout title="About">
        <div class="y space-y-4 md:w-3/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">About</h2>
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
                <details class="pane">
                    <summary class="font-bold text-xl">About</summary>
                    <h2 class="font-bold">History</h2>
                    <p>Hyperbolus is a project that started in my mind palace around ~2016. Some very poorly though out
                        prototypes and a slightly better thought-out MyBB site later and here we are. Its current
                        iteration is what you are using right now!</p>
                    <h2 class="font-bold mt-2">Technology</h2>
                    <p>The site is powered by the Laravel PHP framework + various services that sync from boomlings. The
                        frontend is Vue + Tailwind. It is powered by the Hype CMS (made specifically for this and our
                        sister sites) and licensed under the AGPLv3 so with the exception of a few private modules, and
                        services free to take a peek at the source code :)</p>
                </details>
                <details class="pane">
                    <summary class="font-bold text-xl">Special Thanks</summary>
                    <ul class="list-inside list-disc">
                        <li>iAndy_HD3 and camila314 for using the API in their mods</li>
                        <li>Cvolton for help regarding interacting with gd servers</li>
                        <li>Nora for her inspirational work on MDL and being good at design in general</li>
                        <li>ninXout for being awesome and making a screenshot mod to help collect content for level pages</li>
                        <li>GD Colon for all of his awesome work with gd on web</li>
                        <li>The GD Replay Standards Committee for inviting me to their cartel and enforcing .gdr use on this site haha jk unless</li>
                        <li>matcool for replay conversion code</li>
                        <li>matcool again & npesta for inspiring roulette game</li>
                        <li>Geometry Dash Programming Discord</li>
                        <li>The other, more secret, gd programming discord</li>
                        <li>Country flags by freakflags</li>
                        <li>Tailwind heroicons</li>
                        <li>osu for having an oddly really good website that I could steal from</li>
                        <li>Durianhead for his amazing profile banner artwork (<a class="underline" href="https://twitter.com/real_durianhead/status/1462436726496890881?s=20">source</a>)</li>
                        <li>Users like you, thank you!</li>
                    </ul>
                </details>
                <details class="pane y space-y-2">
                    <summary class="font-bold text-xl">Software Licenses</summary>
                    <textarea class="w-full h-64 bg-ui-950 border-ui-700 rounded-md" readonly>Copyright ©2023 Michael P. Cohen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. </textarea>
                    <textarea class="w-full h-64 bg-ui-950 border-ui-700 rounded-md" readonly>MIT License

Copyright (c) 2020 Refactoring UI Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</textarea>
                </details>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <DiscordInvite code="bWt5aks8jb"/>
            <h2 class="mx-2 font-bold text-2xl">Staff</h2>
            <div class="pane">
                <p>Who knows? They're in the shadows...</p>
            </div>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
