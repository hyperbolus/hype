<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";
import {Link, useForm, usePage} from "@inertiajs/vue3";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Timestamp from "@/Components/Timestamp.vue";
import Button from "@/Jetstream/Button.vue";
import {getUser} from "@/util.js";

const props = defineProps({
    messages: Object,
    recipient: Object,
})

const message = useForm({
    recipient_id: props.recipient.id,
    body: null
})

const sendMessage = () => {
    if (!message.body || message.processing) return;

    message.post(route('inbox.store'), {
        errorBag: 'default',
        preserveScroll: true,
        onSuccess: () => {
            message.body = null
        }
    })
}

const sender = (obj) => {
    return obj.sender_id === usePage().props.user.id ? usePage().props.user : props.recipient
}

const msgClasses = (msg, i) => {
    let classes = '';
    let other = msg.sender_id === props.recipient.id;

    if (msg.sender_id === props.messages.data[i - 1]?.sender_id) {
        classes += other ? 'rounded-tl' : 'rounded-tr';
    }

    if (other) {
        classes += ' bg-ui-700 rounded-bl';
    } else {
        classes += ' text-white bg-blue-500 rounded-br'
    }

    return classes;
}

const keypress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
}
</script>
<template>
    <app-layout title="Messages" slot-classes="!px-0">
        <template #breadcrumbs>
            <Link :href="route('inbox.index')">Inbox</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Conversation with {{ recipient.name }}</span>
        </template>
        <div class="y space-y-4 w-full">
            <div class="x justify-between">
                <div class="x space-x-2 items-center pane">
                    <Avatar class="w-8" :user="recipient"/>
                    <Username :user="recipient"/>
                </div>
                <div class="x space-x-2 items-center pane">
                    <Username :user="getUser()"/>
                    <Avatar class="w-8" :user="getUser()"/>
                </div>
            </div>
            <Pagination :list="messages"/>
            <div class="y space-y-1">
                <div class="y" :class="{'items-end': message.recipient_id === recipient.id}" v-for="(message, i) in messages.data">
                    <p class="y px-4 py-2 rounded-3xl max-w-[80%] break-all w-fit" :class="msgClasses(message, i)">{{ message.body }}</p>
                    <span v-if="message.sender_id !== messages.data[i + 1]?.sender_id" class="text-ui-400 text-ui-600"><Timestamp position="bottom" :time="message.created_at"/></span>
                </div>
            </div>
            <Pagination :list="messages"/>
            <div class="x pane space-x-2 !px-3">
                <div class="grow relative">
                    <textarea @keydown="keypress" rows="1" v-model="message.body" placeholder="Start writing" class="px-1 py-1 resize-none break-all absolute overflow-hidden inset-0 border-none placeholder-ui-600 bg-transparent focus-visible:ring-0"></textarea>
                    <div aria-hidden="true" class="invisible whitespace-pre-wrap break-all px-1 py-1">{{ message.body }}&ZeroWidthSpace;</div>
                </div>
                <button :disabled="message.processing" @click="sendMessage" class="w-fit transition-colors" :class="{'text-ui-600': message.processing}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    </app-layout>
</template>
