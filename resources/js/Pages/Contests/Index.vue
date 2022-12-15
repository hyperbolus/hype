<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
</script>
<template>
    <app-layout title="Contests">
        <template #breadcrumbs>
            <Link :href="route('contests.index')">Contests</Link>
        </template>
        <div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div>ooh look a contest</div>
                <div>wow another</div>
                <div class="text-green-500 bg-red-50 w-fit px-4 rounded">
                    <p>&gt; mfw wip feature</p>
                    <p>&gt; picrel</p>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <h2 class="font-bold text-2xl mx-2">More</h2>
                <Link :href="route('contests.create')" class="rounded bg-cyan-400 font-bold px-4 py-2 text-neutral-50">
                    Create a Contest
                </Link>
                <StatsPanel/>
            </div>
        </div>
    </app-layout>
</template>
