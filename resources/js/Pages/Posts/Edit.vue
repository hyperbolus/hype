<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm, usePage} from '@inertiajs/vue3';
import PostPad from "@/Components/PostPad.vue";
import route from "ziggy-js";
import Button from "@/Jetstream/Button.vue";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    post: Object
})

const form = useForm({
    body: props.post.body,
    signature: !(!usePage().props.auth || !usePage().props.user.signature),
})

const submit = () => {
    form.post(route('posts.update', props.post.id))
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Edit Post</span>
        </template>
        <div class="y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <h2 class="mx-2 font-bold text-2xl">Edit Post</h2>
            <Errors/>
            <PostPad v-model="form"/>
            <div class="x justify-center gap-2">
                <Button :disabled="form.processing" @click="submit">Edit Post</Button>
            </div>
        </div>
    </app-layout>
</template>
