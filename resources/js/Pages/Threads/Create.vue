<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm, usePage} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import PostPad from "@/Components/PostPad.vue";
import {ref} from "vue";
import route from "ziggy-js";
import Button from "@/Jetstream/Button.vue";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    forum_id: [Number, String]
})

const form = useForm({
    title: '',
    forum_id: props.forum_id,
})

const postData = ref({
    body: '<p></p>',
    signature: null,
    watch: false,
    watch_email: false
})

const submit = () => {
    form.transform((data) => ({
        ...data,
        post: postData.value
    })).post(route('threads.create'))
}
</script>
<template>
    <app-layout title="Create Thread">
        <div class="y w-full space-y-4 p-4">
            <Errors/>
            <h2 class="mx-2 font-bold text-2xl">Create a New Thread</h2>
            <Input class="py-1 !bg-ui-800" type="text" v-model="form.title" placeholder="Title (Required)"/>
            <PostPad v-model="postData"/>
            <div class="x justify-center gap-2">
                <Button onclick="alert('wip feature')">Save Draft</Button>
                <Button :disabled="form.processing" @click="submit">Post Thread</Button>
            </div>
        </div>
    </app-layout>
</template>
