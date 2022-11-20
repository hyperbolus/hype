<script setup>
import {Link, useForm} from "@inertiajs/inertia-vue3";
import RichText from "@/Components/RichText.vue";
import Username from "@/Components/Username.vue";
import route from "ziggy-js";
import Avatar from "@/Components/Avatar.vue";

const props = defineProps({
    post: Object,
    preview: Boolean,
    user: Object,
    op: Number
})

const user = props.post.author ?? props.user

const repColor = (rep) => {
    if (rep > 0) {
        return 'text-green-500'
    } else if (rep < 0) {
        return 'text-red-500'
    }
}

const fromText = (json) => {
    try {
        let obj = JSON.parse(json);

        if (obj && typeof obj === "object") {
            return obj
        }
    } catch(e) {
        return false
    }
}

const like = useForm({})

const sendLike = () => {
    like.post(route('likes.store', props.post))
}
</script>
<template>
    <div class="y pane !p-0 border border-neutral-200 dark:border-neutral-700">
        <div class="x">
            <div class="y space-y-4 items-center p-4 border-r border-r-neutral-300 dark:border-r-neutral-700">
                <div class="y text-center items-center">
                    <Username :user="user"/>
                    <span class="text-xs">Junior Member</span>
                </div>
                <Avatar class="w-44" :user="user"/>
                <div class="border border-neutral-300 dark:border-neutral-700 space-y-1 w-full rounded py-1 px-2 text-xs">
                    <div class="flex justify-between">
                        <span>Reputation:</span>
                        <span :class="repColor(user.reputation)">{{ user.reputation }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Posts:</span>
                        <span>0</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Likes:</span>
                        <span>0</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Credits:</span>
                        <span>0</span>
                    </div>
                </div>
            </div>
            <div class="y w-full">
                <div class="y h-full justify-between p-4">
                    <div class="x items-center space-x-1 text-xs" :class="preview ? 'text-amber-500' : 'text-neutral-400'">
                        <template v-if="!preview">
                            <span v-if="user.id === op" class="text-xs rounded bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 font-bold">OP</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-shrink-0 w-3 h-3">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
                            </svg>
                        </template>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-shrink-0 w-3 h-3">
                            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                        <span v-if="!preview">{{ new Date(post.created_at).toLocaleString([], {day: '2-digit', month: '2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit'}) }}</span>
                        <span v-else>THIS JUST A PREVIEW, YOU STILL NEED TO POST YOUR MESSAGE</span>
                    </div>
                    <p v-if="!post.body" class="text-neutral-100 dark:text-neutral-800 text-3xl text-center h-1/2">This post is empty... Like your soul...</p>
                    <template v-else>
                        <div class="mt-4 h-full" v-if="post.rich">
                            <div class="y justify-between" v-if="fromText(post.body)">
                                <RichText :json="fromText(post.body)"/>
                                <details v-if="false">
                                    <summary>Raw Message</summary>
                                    <pre class="text-xs overflow-x-scroll">{{ JSON.stringify(fromText(post.body), null, 2) }}</pre>
                                </details>
                            </div>
                            <template v-else-if="post.body.length !== 0">
                                <span class="font-bold text-red-500">Malformed content cannot be displayed! Contact a site administrator.</span>
                                <p class="mt-4">{{ post.body }}</p>
                            </template>
                        </div>
                        <p v-else class="mt-4 h-full" style="hyphens: auto;">{{ post.body }}</p>
                    </template>
                    <div v-if="!preview" class="x justify-between">
                        <div onclick="alert('cry about it')" class="p-1.5 cursor-pointer bg-neutral-200 dark:bg-neutral-800 text-neutral-400 hover:text-white hover:bg-red-500 transition rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                            </svg>
                        </div>
                        <div @click="sendLike" class="p-1.5 cursor-pointer bg-neutral-200 dark:bg-neutral-800 text-green-500 hover:bg-green-500 hover:text-white transition rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="post.signature && user.signature" class="px-4 py-2 border-t border-t-neutral-300 dark:border-t-neutral-700">
                    {{ user.signature }}
                </div>
            </div>
        </div>
        <div v-if="!preview && post.likes.length > 0" class="x items-center border-t p-2 space-x-2 border-t-neutral-300 dark:border-t-neutral-700">
            <div class="text-green-500 x items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
                <span>{{ post.likes.length }}</span>
            </div>
            <Link class="text-sm" v-for="(like, index) in post.likes" :href="route('users.show', like.liker.id)" :title="new Date(like.created_at).toLocaleString([], {day: '2-digit', month: '2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit'})"><Username :user="like.liker"/>{{ index < post.likes.length - 1 ? ',' : '' }}</Link>
        </div>
    </div>
</template>
