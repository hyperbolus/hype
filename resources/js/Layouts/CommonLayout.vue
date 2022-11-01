<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import TipTap from "@/Components/TipTap.vue";
import Post from "@/Components/Post.vue";
import {ref} from "vue";

const props = defineProps({
    title: String
})
</script>
<template>
    <app-layout :title="title">
        <template #breadcrumbs>
            <span>Home</span>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div class="space-y-2">
                    <h2 class="mx-2 font-bold text-2xl">Home</h2>
                    <div class="box">
                        <p>Join our Discord to suggest new features, give feedback, and get help!</p>
                        <a class="underline" href="https://trello.com/b/JJOVCmbF/gdc" target="_blank">Track development</a>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <div class="space-y-2">
                    <h2 class="mx-2 font-bold text-2xl">More</h2>
                    <Link href="https://discord.gg/bWt5aks8jb" class="block rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                        Join us on Discord
                    </Link>
                </div>
                <StatsPanel/>
            </div>
        </div>
    </app-layout>
</template>
