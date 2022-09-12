<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import Input from "@/Jetstream/Input.vue";
import {Inertia} from "@inertiajs/inertia";
import {ref} from "vue";
import StatsPanel from "@/Components/StatsPanel.vue";

let message = ref(null);
let link = ref(null);

const announcementSend = (message, link) => {
    Inertia.post('/admin' + '?' + new URLSearchParams({
        message: message,
        link: link,
        action: 'send announcement'
    }).toString());
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <span>Admin</span>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <div class="space-y-2">
                    <h2 class="mx-2 font-bold text-2xl">Admin</h2>
                    <div class="flex flex-col md:rounded p-4 space-y-4 bg-neutral-900 border border-neutral-700">
                        <p>This is the button that annoys the hoes</p>
                        <Input v-model="message" placeholder="Message" class="bg-neutral-800 p-2" required/>
                        <Input v-model="link" placeholder="Link" class="bg-neutral-800 p-2" required/>
                        <span @click="announcementSend(message, link)" class="block text-center px-2 py-1 rounded bg-neutral-800 cursor-pointer hover:opacity-50 transition">butt on</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <StatsPanel/>
            </div>
        </div>
    </app-layout>
</template>
