<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
</script>
<template>
    <app-layout title="Forge">
        <template #breadcrumbs>
            <span>Forge</span>
        </template>
        <div class="y space-y-2 md:w-3/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">Forge</h2>
                <div class="pane">
                    <p>wip coming soon [UPCOMING TOP 1]</p>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="font-bold text-2xl">More</h2>
            <div class="rounded bg-[#5865F2] px-4 py-2 text-ui-50">
                Join us on Discord
            </div>
            <StatsPanel/>
        </div>
    </app-layout>
</template>
