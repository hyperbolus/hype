<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm, usePage} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import PostPad from "@/Components/PostPad.vue";
import {ref} from "vue";
import route from "ziggy-js";
import Button from "@/Jetstream/Button.vue";

const props = defineProps({
    forum_id: [Number, String]
})

const form = useForm({
    title: '',
    forum_id: props.forum_id,
})

const postData = ref({
    body: '<p></p>',
    signature: !(!usePage().props.auth || !usePage().props.user.signature),
    rich: false,
})

const submit = () => {
    form.transform((data) => ({
        ...data,
        post: postData.value
    })).post(route('threads.create'))
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Create Thread</span>
        </template>
        <div class="y lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <ul v-if="$page.props.errors.length > 0" class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors" :key="key">
                    {{ error }}
                </li>
            </ul>
            <h2 class="mx-2 font-bold text-2xl">Create a New Thread</h2>
            <Input class="p-2" type="text" v-model="form.title" placeholder="Title (Required)"/>
            <PostPad v-model="postData"/>
            <div class="x justify-center gap-2">
                <Button onclick="alert('wip feature')">Save Draft</Button>
                <Button :disabled="form.processing" @click="submit">Post Thread</Button>
            </div>
        </div>
    </app-layout>
</template>
