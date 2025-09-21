<script setup>
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";
import Input from "@/Jetstream/Input.vue";
import PostPad from "@/Components/PostPad.vue";
import {ref} from "vue";
import Errors from "@/Components/Errors.vue";
import Button from "@/Jetstream/Button.vue";

const form = useForm({
    title: '',
    slug: '',
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
        content: postData.value.body
    })).post(route('articles.create'))
}
</script>
<template>
    <app-layout title="Create Article">
        <div class="y w-full space-y-4 p-4">
            <Errors/>
            <h2 class="mx-2 font-bold text-2xl">Create a New Article</h2>
            <Input class="py-1 !bg-ui-800" type="text" v-model="form.title" placeholder="Title (Required)"/>
            <Input class="!bg-ui-900" type="text" v-model="form.slug" placeholder="URL Slug (Required)"/>
            <PostPad v-model="postData"/>
            <div class="x justify-center gap-2">
                <Button onclick="alert('wip feature')">Save Draft</Button>
                <Button :disabled="form.processing" @click="submit">Post Thread</Button>
            </div>
        </div>
    </app-layout>
</template>
