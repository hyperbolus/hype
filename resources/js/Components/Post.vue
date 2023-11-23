<script setup>
import {Link, useForm, usePage} from "@inertiajs/vue3";
import Username from "@/Components/Username.vue";
import route from "ziggy-js";
import Avatar from "@/Components/Avatar.vue";
import TipTap from "@/Components/TipTap.vue";
import Timestamp from "@/Components/Timestamp.vue";
import {onBeforeMount, onUpdated, ref} from "vue";
import prettyBytes from "pretty-bytes";
import UserFlag from "@/Components/UserFlag.vue";
import Lightbox from "@/Components/Lightbox.vue";
import ReportModal from "@/Components/ReportModal.vue";
import {isAuthenticated, readonly} from "@/util.js";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import UserTitle from "@/Components/UserTitle.vue";

const props = defineProps({
    post: {
        reactions: Array
    },
    preview: Boolean,
    postbit: {
        type: Boolean,
        default: true
    },
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

const searchLikes = () => {
    let found = false
    if (usePage().props.auth && props.post.reactions) {
        props.post.reactions.forEach((l) => {
            if (l.reacter_id === usePage().props.user.id) {
                found = true
            }
        })
    }
    liked.value = found
}

onBeforeMount(searchLikes)
onUpdated(searchLikes)

const liked = ref(false)

const like = useForm({})

const sendLike = () => {
    like.post(route('likes.store', props.post), {
        preserveScroll: true
    })
}

</script>
<template>
    <div :id="`~post/${post.id}`" class="y pane !p-0 border border-ui-700">
        <div class="flex flex-col md:flex-row">
            <div v-if="postbit" class="relative rounded-tl-lg bg-ui-800 !bg-opacity-50 shrink-0 items-center md:border-r border-r-ui-700">
                <div class="flex md:flex-col relative z-10 gap-4 p-4">
                    <div v-if="user.postbit_url" class="absolute rounded-tl-lg -z-10 top-0 left-0 w-full h-full opacity-50" :style="'-webkit-mask:linear-gradient(rgba(255, 255, 255, 0.65) 50%, transparent 100%);background-image: url(\'' + user.postbit_url + '\');background-size:cover;background-position:top;'"></div>
                    <div class="hidden md:flex flex-col gap-1 text-center items-center py-1">
                        <span class="x items-center gap-2"><UserFlag :user="user"/><Username :class="{'glass px-2 backdrop-blur-sm': user.postbit_url}" :user="user"/></span>
                        <UserTitle class="text-sm" :class="{'glass px-2 py-0.5 backdrop-blur-sm': user.postbit_url}" :user="user"/>
                    </div>
                    <div class="flex place-center px-2">
                        <Avatar width="w-32 md:w-40" :user="user"/>
                    </div>
                    <div class="y grow gap-4 items-start">
                        <div class="flex flex-col md:hidden gap-1 text-center items-center py-1">
                            <span class="x items-center gap-2"><UserFlag :user="user"/><Username :class="{'glass px-2 backdrop-blur-sm': user.postbit_url}" :user="user"/></span>
                            <UserTitle class="text-sm" :class="{'glass px-2 py-0.5 backdrop-blur-sm': user.postbit_url}" :user="user"/>
                        </div>
                        <div class="pane !px-3 space-y-1 w-full h-fit text-xs backdrop-blur-sm">
                            <div class="flex justify-between">
                                <span>Reputation:</span>
                                <span :class="repColor(user.reputation)">{{ user.reputation }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Posts:</span>
                                <span>{{ user.posts_count }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Credits:</span>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="y w-full min-w-0">
                <div class="y h-full w-full justify-between p-4 gap-2">
                    <div class="x justify-between items-center text-xs">
                        <div class="x gap-1 items-center " :class="preview ? 'text-amber-500' : 'text-ui-400'">
                            <template v-if="!preview">
                                <span v-if="user.id === op" class="text-xs bg-ui-800 rounded px-2 py-0.5 font-bold">OP</span>
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
                        <div v-if="!preview && postbit" class="x items-center space-x-1">
                            <Tooltip :caret="false" container-class="!right-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-ui-500 w-4 h-4">
                                    <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                                </svg>
                                <template #content>
                                    <div class="p-2 w-fit">
                                        Permalink
                                        <input @input="e => readonly(e, route('posts.show', post))" type="text" class="bg-ui-800 rounded !py-1 !px-2 border-0" :value="route('posts.show', post)"/>
                                    </div>
                                </template>
                            </Tooltip>
                            <span v-if="post.ip">(IP: {{ post.ip }})</span>
                            <span class="opacity-50">ID: {{ post.id }}</span>
                            <input v-if="$page.props.auth && $page.props.user.roles.includes('admin')" type="checkbox" class="rounded bg-ui-800"/>
                        </div>
                    </div>
                    <p v-if="!post.body" class="text-ui-800 text-3xl text-center h-1/2">This post is empty... Like your soul...</p>
                    <div v-else class="h-full w-full">
                        <div class="y justify-between">
                            <TipTap :editable="false" v-model="post.body"/>
                            <details class="text-xs" v-if="$page.props.auth && $page.props.user.roles.includes('admin')">
                                <summary class="opacity-50 cursor-pointer">Raw Message</summary>
                                <pre class="w-full overflow-x-auto">{{ post.body }}</pre>
                            </details>
                        </div>
                    </div>
                    <template v-if="post.media && post.media.length > 0">
                        <span class="text-sm tracking-widest uppercase opacity-50 mt-2">Attachments</span>
                        <span v-if="!$page.props.auth" class="text-sm">(You must log in to download)</span>
                        <div v-for="(media, index) in post.media" :key="index" class="y gap-2 my-2">
                            <div class="x justify-between items-center rounded box !px-2 !py-1">
                                <div class="x gap-2 items-center">
                                    <!--
                                    Proposed Types:
                                    - File/Paperclip
                                    - Archive
                                    - Image
                                    - Gif
                                    - Film
                                    -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                        <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
                                    </svg>
                                    <a class="text-sm text-blue-500 hover:underline" href="/download/X3D76GqO">{{ media.filename }}</a>
                                    <span class="text-xs">({{ prettyBytes(media.bytes) }})</span>
                                </div>
                                <div class="x gap-2">
                                    <span class="text-xs">{{ media.downloads }} Downloads</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-if="!preview && (post.created_at !== post.updated_at)" class="x mb-2 items-center space-x-1 text-xs text-ui-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
                        <span>This post last modified <Timestamp :time="post.updated_at"/>, by <Username :user="user"/></span>
                    </div>
                    <div v-if="!preview" class="x justify-between">
                        <Lightbox v-if="isAuthenticated()">
                            <div class="p-1.5 cursor-pointer bg-ui-800 text-ui-400 hover:text-white hover:bg-red-500 transition rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                    <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                                </svg>
                            </div>
                            <template #content>
                                <ReportModal :reportable_id="post.id" :reportable_type="21" @click.stop class="cursor-auto"/>
                            </template>
                        </Lightbox>
                        <div class="x space-x-2">
                            <div @click="sendLike" class="p-1.5 cursor-pointer bg-ui-800 hover:bg-green-500 hover:text-white transition rounded" :class="liked ? 'text-red-500' : 'text-green-500'">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                                </svg>
                            </div>
                            <Link v-if="$page.props.auth && $page.props.user.id === post.author_id" :href="route('posts.edit', post.id)" class="p-1.5 uppercase tracking-widest text-xs cursor-pointer bg-ui-800 rounded">
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
                <div v-if="user.signature ? post.signature ?? user.signature_visibility : false" class="px-4 py-2 border-t border-t-ui-700">
                    <p class="whitespace-pre-wrap">{{ user.signature }}</p>
                </div>
            </div>
        </div>
        <div v-if="!preview && post.reactions.length > 0" class="x items-center border-t p-2 space-x-2 border-t-ui-700">
            <div class="x items-center space-x-1 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
                <span>{{ post.reactions.length }}</span>
            </div>
            <Username class="!text-sm" v-for="(reaction, index) in post.reactions" :user="reaction.reacter"/>
        </div>
    </div>
</template>
