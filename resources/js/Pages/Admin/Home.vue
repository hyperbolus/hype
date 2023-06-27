<script setup>
import Input from "@/Jetstream/Input.vue"
import {router, useForm} from "@inertiajs/vue3"
import {ref} from "vue"
import Button from "@/Jetstream/Button.vue"
import AdminLayout from "@/Layouts/AdminLayout.vue"
import {MeiliSearch} from "meilisearch";
import route from "ziggy-js";

let message = ref(null);
let link = ref(null);

const announcementSend = (message, link) => {
    router.post('/system/' + '?' + new URLSearchParams({
        message: message,
        link: link,
        action: 'send announcement'
    }).toString());
}

const calcRatings = useForm({
    action: 'recalculate ratings'
})
</script>
<template>
    <admin-layout title="Home">
        <div class="y pane space-y-2">
            <p>This is the button that annoys the hoes</p>
            <Input type="text" v-model="message" placeholder="Message" required/>
            <Input type="text" v-model="link" placeholder="Link" required/>
            <Button @click="announcementSend(message, link)" class="w-fit">button</Button>
        </div>
        <div class="x items-center space-x-1">
            <Button @click="calcRatings.post(route('system.home'))" class="w-fit" :class="{ 'opacity-25': calcRatings.processing }" :disabled="calcRatings.processing">{{ calcRatings.processing ? 'Working...' : 'Recalculate Ratings' }}</Button>
            <div class="x ml-2 text-green-500 opacity-0 transition-all" :class="{'!opacity-100': !calcRatings.isDirty && calcRatings.recentlySuccessful}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-0.5">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                <span>Done!</span>
            </div>
        </div>
    </admin-layout>
</template>
