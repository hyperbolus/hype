<script setup>
import { Link } from '@inertiajs/vue3';
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Avatar from "@/Components/Avatar.vue";
import AppLayout from "@/Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";
import ForumTicket from "@/Components/ForumTicket.vue";
import {isAuthenticated} from "@/util.js";

defineProps({
    forum: Object,
    threads: Object
})
</script>
<template>
    <app-layout>
        <div class="y w-full space-y-2">
            <div>
                <h2 class="mx-2 font-bold text-2xl">{{ forum.name }}</h2>
                <p class="text-sm mx-2">{{ forum.description }}</p>
            </div>
            <ForumTicket v-for="subforum in forum.children" :forum="subforum"/>
            <div class="flex justify-between">
                <div>
                    <Link v-if="forum.parent && !forum.parent.category" :href="route('forums.show', forum.parent.slug)" class="button">Back to {{ forum.parent.name }}</Link>
                </div>
                <Link v-if="isAuthenticated() && (!forum.group_id || forum.group_id === $page.props.user.primary_group_id)" :href="route('threads.create') + '?fid=' + forum.id" class="button">Create Thread</Link>
            </div>
            <div v-if="threads.data.length === 0">
                <span>no threads ;(</span>
            </div>
            <Pagination :list="threads"/>
            <div class="pane text-center italic text-ui-500" v-if="threads.data.length === 0 && threads.total > 0">"You just blow in from stupid town?"</div>
            <div v-for="thread in threads.data" class="x items-center justify-between pane">
                <div class="x items-center gap-4">
                    <Avatar class="w-8" :user="thread.author"/>
                    <div class="y">
                        <Link :href="route('threads.show', thread)" class="font-bold text-lg">{{ thread.title }}</Link>
                        <span class="text-xs text-ui-400">By <Username :user="thread.author"/>, {{ new Date(thread.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}</span>
                    </div>
                </div>
                <div class="x items-center gap-4">
                    <div class="y text-center">
                        <span>{{ thread.views }}</span>
                        <span class="text-xs uppercase">VIEWS</span>
                    </div>
                    <div class="y text-center">
                        <span>{{ Math.max(thread.posts_count - 1, 0) }}</span>
                        <span class="text-xs uppercase">REPLIES</span>
                    </div>
                </div>
            </div>
            <Pagination :list="threads"/>
        </div>
    </app-layout>
</template>
