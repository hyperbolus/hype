<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm, usePage} from '@inertiajs/inertia-vue3';
import route from "ziggy-js";
import Post from "@/Components/Post.vue";
import PostPad from "@/Components/PostPad.vue";
import CommonLayout from "@/Layouts/CommonLayout.vue";

const props = defineProps({
    thread: Object
})

const reply = useForm({
    body: '',
    thread_id: props.thread.id,
    signature: !(!usePage().props.auth || !usePage().props.user.signature),
    rich: false,
})

const sendReply = () => {
    reply.post(route('posts.create'), {
        data: reply,
        preserveScroll: true,
        onSuccess: () => reply.body = ''
    })
}
</script>
<template>
    <common-layout :title="thread.title">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ thread.title }}</span>
        </template>
        <div class="y w-full space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">{{ thread.title }}</h2>
                    <span class="text-sm">Posted by {{ thread.author.name }}, {{ new Date(thread.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Thread ID: {{ thread.id }}</span>
                </div>
                <div>
                    <a href="#reply" class="button">Reply</a>
                </div>
            </div>
            <Post v-for="(post, index) in thread.posts" :post="post" :key="index" :op="index === 0 ? null : thread.author.id"/>
            <template v-if="$page.props.auth">
                <h2 id="reply" class="font-bold text-2xl">Reply to This Thread</h2>
                <PostPad :submit="sendReply" v-model="reply"/>
            </template>
            <div v-else>
                Log in to post a reply
            </div>
        </div>
    </common-layout>
    <app-layout :title="thread.title">
        <div class="y lg:max-w-5xl xl:max-w-6xl w-full space-y-4 p-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">{{ thread.title }}</h2>
                    <span class="text-sm">Posted by {{ thread.author.name }}, {{ new Date(thread.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Thread ID: {{ thread.id }}</span>
                </div>
                <div>
                    <a href="#reply" class="button">Reply</a>
                </div>
            </div>
            <Post v-for="(post, index) in thread.posts" :post="post" :key="index" :op="index === 0 ? null : thread.author.id"/>
            <template v-if="$page.props.auth">
                <h2 id="reply" class="font-bold text-2xl">Reply to This Thread</h2>
                <PostPad :submit="sendReply" v-model="reply"/>
            </template>
            <div v-else>
                Log in to post a reply
            </div>
        </div>
    </app-layout>
</template>
