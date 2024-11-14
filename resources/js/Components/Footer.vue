<script setup>
import {Link} from '@inertiajs/vue3'
import route from "ziggy-js";
import Tooltip from "@/Components/Tooltip.vue";
</script>
<template>
    <div class="y z-10 items-center w-full bg-ui-1000">
        <div class="x justify-center bg-ui-900 p-2 w-full">
            <div class="x items-center justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full text-ui-600">
                <span class="text-sm">Hyperbolus is not affiliated with RobTopGames AB or Geometry Dash</span>
                <div class="space-x-4">
                    <Link :href="route('about')">About</Link>
                    <Link :href="route('legal.terms')">Terms of Service</Link>
                    <Link :href="route('legal.privacy')">Privacy</Link>
                </div>
            </div>
        </div>
        <div class="x justify-center bg-ui-950 p-2 w-full text-sm text-ui-600">
            <div class="x justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
                <span>Hyperbolus &copy; {{ new Date().getFullYear() }}</span>
                <div class="x items-center space-x-2">
                    <span class="relative inline-flex h-2 w-2">
                         <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                         <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Connected via <Tooltip message="I named my servers after different pokémon :P" inline>Alakazam</Tooltip></span>
                </div>
            </div>
        </div>
    </div>
</template>
