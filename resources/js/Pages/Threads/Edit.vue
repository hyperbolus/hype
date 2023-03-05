<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import route from "ziggy-js";
import Button from "@/Jetstream/Button.vue";

const props = defineProps({
    thread: Object
})

const form = useForm({
    title: props.thread.title
})

const submit = () => {
    form.post(route('threads.update', props.thread.slug))
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Edit Thread</span>
        </template>
        <div class="y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <h2 class="mx-2 font-bold text-2xl">Edit Thread</h2>
            <ul class="list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Input class="p-2" type="text" v-model="form.title" placeholder="Title (Required)"/>
            <p>Trying to edit your post? Click the <span class="p-1.5 uppercase tracking-widest select-none text-xs bg-neutral-200 dark:bg-neutral-800 rounded">Edit</span> button on the post itself.</p>
            <div class="x justify-center gap-2">
                <Button :disabled="form.processing" @click="submit">Post Thread</Button>
            </div>
        </div>
    </app-layout>
</template>
