<script setup>
import CommonLayout from "@/Layouts/CommonLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import {Link, useForm, usePage} from "@inertiajs/inertia-vue3";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Timestamp from "@/Components/Timestamp.vue";
import Button from "@/Jetstream/Button.vue";

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
    return obj.sender_id === usePage().props.value.user.id ? usePage().props.value.user : props.recipient
}
</script>
<template>
    <common-layout title="Messages">
        <template #breadcrumbs>
            <Link :href="route('inbox.index')">Inbox</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Conversation with {{ recipient.name }}</span>
        </template>
        <div class="y space-y-4 w-  full">
            <h2 class="mx-2 font-bold text-2xl">Conversation with {{ recipient.name }}</h2>
            <Pagination :list="messages"/>
            <div class="pane !px-0 !py-0 divide-y dark:divide-neutral-700">
                <div class="x items-center px-4 py-2" v-for="message in messages.data">
                    <Avatar class="w-8 mr-4" :user="sender(message)"/>
                    <div class="y w-full">
                        <div class="x justify-between text-sm">
                            <Username :user="sender(message)"/>
                            <span class="text-neutral-400 dark:text-neutral-600"><Timestamp :time="message.created_at"/></span>
                        </div>
                        <p>{{ message.body }}</p>
                    </div>
                </div>
            </div>
            <form @submit.prevent="sendMessage" class="y pane space-y-2 !pb-4">
                <label class="y">
                    <span class="my-1">Message</span>
                    <textarea v-model="message.body" placeholder="Required" class="resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-neutral-600 pane border-none"></textarea>
                </label>
                <Button class="w-fit">Send Message</Button>
            </form>
        </div>
    </common-layout>
</template>
