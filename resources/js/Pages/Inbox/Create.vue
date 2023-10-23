<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {Link, useForm, usePage} from "@inertiajs/vue3";
import route from "ziggy-js";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {ref} from "vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Textbox from "@/Components/Textbox.vue";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    recipient: Object
})

const dropdown = ref(null)
const username = ref(props.recipient ? props.recipient.name : null)
const users = ref([])
const latestResponse = ref(null)

const message = useForm({
    recipient_id: props.recipient ? props.recipient.id : null,
    body: null
})
const sendMessage = () => {
    message.post(route('inbox.store'), {
        errorBag: 'default'
    })
}

const searchName = async () => {
    let time = Date.now()
    message.recipient_id = null
    fetch('/api/mention?except=' + usePage().props.user.id + '&name=' + username.value)
        .then(res => res.json())
        .then(data => {
            if(latestResponse.value < time) {
                users.value = data
                dropdown.value.open = true;
            }
        })
}
</script>
<template>
    <app-layout title="Messages">
        <template #breadcrumbs>
            <Link :href="route('inbox.index')">Inbox</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>New Message</span>
        </template>
        <div class="y space-y-4 w-full">
            <h2 class="mx-2 font-bold text-2xl">Send a New Message</h2>
            <form @submit.prevent="sendMessage" class="y pane space-y-2 !pb-4">
                <label class="y">
                    <span class="my-1">Recipient</span>
                    <Input @input="searchName" v-model="username" type="text" placeholder="User"/>
                    <Dropdown align="left" ref="dropdown">
                        <template #content>
                            <ul>
                                <li class="px-2 py-1 opacity-75 italic" v-if="users.length === 0">No Results</li>
                                <li class="px-2 py-1 hover:bg-ui-700" v-for="user in users" @click="message.recipient_id = user.id; username = user.name">{{ user.name }}</li>
                            </ul>
                        </template>
                    </Dropdown>
                </label>
                <label class="y">
                    <span class="my-1">Message</span>
                    <textarea class="textbox" v-model="message.body" placeholder="Required"/>
                </label>
                <Errors/>
                <Button class="w-fit">Send Message</Button>
            </form>
        </div>
    </app-layout>
</template>
