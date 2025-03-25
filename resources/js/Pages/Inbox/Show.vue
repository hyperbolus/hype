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
</script>
<template>
    <app-layout title="Messages">
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
                    <p class="y px-4 py-2 rounded-3xl max-w-3/4 w-fit" :class="msgClasses(message, i)">{{ message.body }}</p>
                    <span v-if="message.sender_id !== messages.data[i + 1]?.sender_id" class="text-ui-400 text-ui-600"><Timestamp position="bottom" :time="message.created_at"/></span>
                </div>
            </div>
            <Pagination :list="messages"/>
            <form @submit.prevent="sendMessage" class="y pane space-y-2 !pb-4">
                <label class="y">
                    <span class="my-1">Message</span>
                    <textarea v-model="message.body" placeholder="Required" class="resize-none resize-y w-full placeholder-ui-600 pane border-none !bg-ui-950"></textarea>
                </label>
                <Button class="w-fit">Send Message</Button>
            </form>
        </div>
    </app-layout>
</template>
