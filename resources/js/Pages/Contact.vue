<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";
</script>
<template>
    <app-layout title="Contact">
        <div class="y space-y-4 md:w-3/4">
            <div class="space-y-2">
                <h2 class="mx-2 font-bold text-2xl">Contact</h2>
                <p class="pane">Contact the staff team for support, business, or legal inquiries.</p>
                <p class="pane"><a class="underline text-white" href="mailto:contact@hyperbolus.net">contact@hyperbolus.net</a></p>
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
