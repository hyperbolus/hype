<script setup>
import {Link} from '@inertiajs/inertia-vue3';
import StatsPanel from "@/Components/StatsPanel.vue";
import {ref} from "vue";
import CommonLayout from "@/Layouts/CommonLayout.vue";
import PatreonGoal from "@/Components/PatreonGoal.vue";

const thing = ref({
    body: '',
    signature: false,
    rich: true
})
</script>
<template>
    <common-layout title="Home">
        <template #breadcrumbs>
            <Link :href="$page.props.url">Home</Link>
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
                    <p>Join our Discord to suggest new features, give feedback, and get help!</p>
                    <a class="underline" href="https://trello.com/b/JJOVCmbF/gdc" target="_blank">Track development</a>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <Link href="https://discord.gg/bWt5aks8jb" class="block rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                Join us on Discord
            </Link>
            <PatreonGoal/>
            <StatsPanel/>
        </div>
    </common-layout>
</template>
