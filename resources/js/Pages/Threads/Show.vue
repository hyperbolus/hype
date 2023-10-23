<script setup>
import {Link, useForm, usePage} from '@inertiajs/vue3';
import route from "ziggy-js";
import Post from "@/Components/Post.vue";
import PostPad from "@/Components/PostPad.vue";
import AppLayout from "@/Layouts/Dash.vue";
import {ref} from "vue"
import Pagination from "@/Components/Pagination.vue";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    thread: Object,
    posts: Object,
    subscription: Object
})

const reply = useForm({
    body: '<p></p>',
    thread_id: props.thread.id,
    signature: null,
    watch: !!props.subscription,
    watch_email: props.subscription ? props.subscription.email : false
})

// This will force update the post pad
const postKey = ref(0)

const sendReply = () => {
    reply.post(route('posts.create'), {
        data: reply,
        preserveScroll: true,
        /*
        TODO:
         okay this doesn't actually work because of the same reason as preview.
         it seems external mutation does not affect a nested tiptap editor
        */
        onSuccess: () => {
            reply.body = ''
            postKey.value++
        }
    })
}
</script>
<template>
    <app-layout :title="thread.title">
        <template #breadcrumbs>
            <Link :href="route('forums.index')">Forums</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('forums.show', thread.forum.slug)">{{ thread.forum.name }}</Link>
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
                <div class="space-x-2">
                    <Link v-if="$page.props.auth && $page.props.user.id === thread.author_id" class="button" :href="route('threads.edit', thread.slug)">Edit Thread</Link>
                    <a href="#reply" class="button">Reply</a>
                </div>
            </div>
            <Pagination :list="posts"/>
            <div class="pane text-center italic text-ui-500" v-if="posts.data.length === 0 && posts.total === 0">Strangely, this thread doesn't have a post...</div>
            <div class="pane text-center italic text-ui-500" v-else-if="posts.data.length === 0 && posts.total > 0">"You just blow in from stupid town?"</div>
            <template v-for="(post, index) in posts.data" :key="index">
                <Post :post="post" :op="thread.author.id"/>
                <a v-if="index === 0" class="text-center hidden"><img class="inline" src="https://via.placeholder.com/970x90" alt="Advertisement"/></a>
            </template>
            <Pagination :list="posts"/>
            <template v-if="$page.props.auth">
                <h2 id="reply" class="font-bold text-2xl">Reply to This Thread</h2>
                <Errors/>
                <PostPad :key="postKey" :submit="sendReply" v-model="reply"/>
            </template>
            <div id="reply" v-else>
                Log in to post a reply
            </div>
        </div>
    </app-layout>
</template>
