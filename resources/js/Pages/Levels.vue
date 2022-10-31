<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import { Link } from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Levels</span>
        </template>
        <div class="y md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="y space-y-4 md:w-3/4">
                <div class="space-y-2">
                    <h2 class="mx-2 font-bold text-2xl">Levels</h2>
                    <div class="box">
                        <Link class="underline" :href="route('levels.index')">Click here to visit the level reviews portal</Link>
                    </div>
                </div>
            </div>
            <div class="y space-y-4 md:w-1/4">
                <h2 class="mx-2 font-bold text-2xl">More</h2>
                <div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                    Join us on Discord
                </div>
                <StatsPanel/>
            </div>
        </div>
    </app-layout>
</template>
