<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import { Link } from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";
import Carousel from "@/Components/Carousel.vue";
import route from "ziggy-js";

const props = defineProps({
    featured: Object,
    magic: Object
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Levels</span>
        </template>
        <div class="y space-y-2 md:w-3/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">Levels</h2>
                <div class="pane">
                    <Link class="underline" :href="route('levels.index')">Click here to visit the level reviews portal</Link>
                </div>
                <h2 class="mx-2 font-bold text-xl">Featured</h2>
                <Carousel decorations="px-10">
                    <Link :href="route('levels.show', level.id)" class="x items-center bg-ui-800 rounded-lg px-4 py-2 shrink-0 min-w-[16rem]" v-for="level in featured">
                        <img alt="Difficulty" class="h-24 mr-4" :src="`https://browser.gdps.io/assets/difficulties/${level.difficultyFace}.png`"/>
                        <div class="y">
                            <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                            <span class="text-sm">{{ level.author }}</span>
                        </div>
                    </Link>
                </Carousel>
                <h2 class="mx-2 font-bold text-xl">Mod Queue</h2>
                <Carousel decorations="px-10">
                    <Link :href="route('levels.show', level.id)" class="x items-center bg-ui-800 rounded-lg px-4 py-2 shrink-0 min-w-[16rem]" v-for="level in magic">
                        <img alt="Difficulty" class="h-24 mr-4" :src="`https://browser.gdps.io/assets/difficulties/${level.difficultyFace}.png`"/>
                        <div class="y">
                            <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                            <span class="text-sm">{{ level.author }}</span>
                        </div>
                    </Link>
                </Carousel>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <DiscordInvite/>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
