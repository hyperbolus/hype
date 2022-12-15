<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import ForumTicket from "@/Components/ForumTicket.vue";
import {Link} from '@inertiajs/inertia-vue3'
import CommonLayout from "@/Layouts/CommonLayout.vue";

defineProps({
    forums: Array,
})
</script>
<template>
    <common-layout title="Home">
        <template #breadcrumbs>
            <Link :href="$page.props.url">Forums</Link>
        </template>
        <div class="flex flex-col space-y-2 md:w-3/4">
            <div v-if="forums.length === 0">
                <p class="pane">No Fooms Have Been Created :(</p>
            </div>
            <div v-for="forum in forums" class="flex-col space-y-2">
                <h2 class="mx-2 font-bold text-2xl">{{ forum.name }}</h2>
                <ForumTicket v-for="subforum in forum.children" :forum="subforum"/>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <h2 class="mx-2 font-bold text-2xl">More</h2>
            <div class="rounded bg-[#5865F2] px-4 py-2 text-neutral-50">
                Join us on Discord
            </div>
            <StatsPanel/>
        </div>
    </common-layout>
</template>
