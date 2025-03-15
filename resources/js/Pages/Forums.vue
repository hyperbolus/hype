<script setup>
import ForumTicket from "@/Components/ForumTicket.vue";
import {Link} from '@inertiajs/vue3'
import AppLayout from "@/Layouts/Dash.vue";
import Username from "@/Components/Username.vue";
import Timestamp from "@/Components/Timestamp.vue";
import route from 'ziggy-js'
import DiscordInvite from "@/Components/DiscordInvite.vue";

defineProps({
    forums: Array,
    latestPosts: Array,
})
</script>
<template>
    <app-layout title="Forums">
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
            <DiscordInvite code="bWt5aks8jb"/>
            <h2 class="mx-2 font-bold text-2xl">Latest Activity</h2>
            <div class="pane !p-0 divide-y divide-ui-700">
                <div class="px-4 py-2" v-if="latestPosts.length === 0">No activity</div>
                <div v-for="thread in latestPosts" class="y px-4 py-3">
                    <Link v-if="thread" :href="route('threads.show', thread)" class="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{{ thread.title }}</Link>
                    <span class="text-sm italic opacity-50" v-else>Deleted Post</span>
                    <div class="x items-center text-xs"><Username :user="thread.last_post.author"/><span class="px-1">&bull;</span><Timestamp :time="thread.last_post.created_at"/></div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
