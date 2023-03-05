<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import { Link } from '@inertiajs/vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
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
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                Join us on Discord
            </div>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
