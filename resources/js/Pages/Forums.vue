<script setup>
import ForumTicket from "@/Components/ForumTicket.vue";
import {Link} from '@inertiajs/vue3'
import AppLayout from "@/Layouts/Dash.vue";
import Username from "@/Components/Username.vue";
import Timestamp from "@/Components/Timestamp.vue";
import route from 'ziggy-js'

defineProps({
    forums: Array,
    latestPosts: Array,
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="$page.props.url">Forums</Link>
        </template>
        <div class="y space-y-2 md:w-3/4">
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
            <h2 class="mx-2 font-bold text-2xl">Latest Activity</h2>
            <div class="pane !p-0 divide-y divide-neutral-700">
                <div class="px-4 py-2" v-if="latestPosts.length === 0">No activity</div>
                <div v-for="post in latestPosts" class="y px-4 py-3">
                    <Link :href="route('threads.show', post.thread)" class="z-10 font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{{ post.thread.title }}</Link>
                    <span class="z-10 text-xs"><Username :user="post.author"/> &bull; <Timestamp :time="post.created_at"/></span>
                </div>
            </div>
        </div>
    </app-layout>
</template>
