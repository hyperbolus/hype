<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";
import {Link, usePage} from "@inertiajs/vue3";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Timestamp from "@/Components/Timestamp.vue";

const props = defineProps({
    conversations: Object,
})

const other = (obj) => {
    return obj.sender_id === usePage().props.user.id ? obj.recipient : obj.sender
}
</script>
<template>
    <app-layout title="Messages">
        <template #breadcrumbs>
            <span>Inbox</span>
        </template>
        <div class="y space-y-4 w-full">
            <div class="x justify-between">
                <h2 class="mx-2 font-bold text-2xl">Conversations</h2>
                <Link :href="route('inbox.create')" class="button">Start Conversation</Link>
            </div>
            <Pagination :list="conversations"/>
            <div v-if="conversations.total === 0" class="pane text-center italic text-ui-500">damn nobody wanna talk to u fr (0 messages)</div>
            <div class="y space-y-2">
                <div class="x pane justify-between items-center px-4 py-2" v-for="conversation in conversations.data">
                    <div class="x items-center space-x-2">
                        <span class="relative">
                            <span v-show="$page.props.user.messages > 0 && false" class="!hidden z-10 absolute flex -top-0.5 -right-0.5 h-3 w-3">
                                <span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"></span>
                                <span class="inline-flex bg-blue-500 rounded-full h-3 w-3"></span>
                            </span>
                            <Avatar width="w-8" :user="other(conversation)"/>
                        </span>
                        <Username :href="route('inbox.show', other(conversation).id)" :user="other(conversation)"/>
                    </div>
                    <Timestamp :time="conversation.created_at"/>
                </div>
            </div>
        </div>
    </app-layout>
</template>
