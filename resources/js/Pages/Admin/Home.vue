<script setup>
import Input from "@/Jetstream/Input.vue"
import {router} from "@inertiajs/vue3"
import {ref} from "vue"
import Button from "@/Jetstream/Button.vue"
import AdminLayout from "@/Layouts/AdminLayout.vue"
import {MeiliSearch} from "meilisearch";

let message = ref(null);
let link = ref(null);

const announcementSend = (message, link) => {
    router.post('/system/' + '?' + new URLSearchParams({
        message: message,
        link: link,
        action: 'send announcement'
    }).toString());
}
</script>
<template>
    <admin-layout title="Home">
        <div class="y pane space-y-2">
            <p>This is the button that annoys the hoes</p>
            <Input type="text" v-model="message" placeholder="Message" required/>
            <Input type="text" v-model="link" placeholder="Link" required/>
            <Button @click="announcementSend(message, link)" class="w-fit">button</Button>
        </div>
    </admin-layout>
</template>
