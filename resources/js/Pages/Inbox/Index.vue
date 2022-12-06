<script setup>
import CommonLayout from "@/Layouts/CommonLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import {Link, usePage} from "@inertiajs/inertia-vue3";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Timestamp from "@/Components/Timestamp.vue";

const props = defineProps({
    conversations: Object,
})

const other = (obj) => {
    return obj.sender_id === usePage().props.value.user.id ? obj.recipient : obj.sender
}
</script>
<template>
    <common-layout title="Messages">
        <template #breadcrumbs>
            <span>Inbox</span>
        </template>
        <div class="y space-y-4 w-full">
            <div class="x justify-between">
                <h2 class="mx-2 font-bold text-2xl">Conversations</h2>
                <Link :href="route('inbox.create')" class="button">Start Conversation</Link>
            </div>
            <Pagination :list="conversations"/>
            <div class="box !px-0 !py-0 divide-y dark:divide-neutral-700">
                <div class="x justify-between items-center px-4 py-2" v-for="conversation in conversations.data">
                    <div class="x items-center space-x-2">
                        <Avatar class="w-8" :user="other(conversation)"/>
                        <Username :href="route('inbox.show', other(conversation).id)" :user="other(conversation)"/>
                    </div>
                    <Timestamp :time="conversation.created_at"/>
                </div>
            </div>
        </div>
    </common-layout>
</template>
