<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";
import Username from "@/Components/Username.vue";
import {getUser, trimAtWord} from "@/util.js";
import banner from "@/../images/Article22UpdateBanner.jpg"
import {ref} from "vue";
import {formatTimeAgo, useTimeAgo} from "@vueuse/core";
import Tooltip from "@/Components/Tooltip.vue";
import route from "ziggy-js";
import {Link} from "@inertiajs/vue3";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import ReviewSummary from "@/Components/ReviewSummary.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Input from "@/Jetstream/Input.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    recent_posts: Object,
    recent_reviews: Object,
    recent_articles: Object,
    recent_videos: Object,
    newest_user: Object,
    frontpage_article: Object,
    daily_chat: Object,
});
</script>
<template>
    <app-layout title="Home">
        <div class="y space-y-2 md:w-2/3">
            <div class="y space-y-2">
                <Link v-if="frontpage_article" :href="route('articles.show', frontpage_article.slug)" class="block relative aspect-video rounded overflow-hidden">
                    <div class="absolute inset-0 hover:scale-105 transition-transform bg-contain" :style="`background-image: url(${banner});`"></div>
                    <div class="absolute bottom-0 p-4" style="text-shadow: black 1px 1px 5px">
                        <h2 class="font-bold text-3xl">{{ frontpage_article.title }}</h2>
                        <p>{{ frontpage_article.blurb }}</p>
                    </div>
                </Link>
                <div v-if="recent_articles.length > 0" class="x space-x-2">
                    <Link v-for="article in recent_articles" :href="route('articles.show', article.slug)" class="relative w-1/2 aspect-video rounded overflow-hidden">
                        <div class="absolute inset-0 hover:scale-105 transition-transform bg-contain" :style="`background-image: url(${banner});`"></div>
                        <div class="absolute bottom-0 p-2" style="text-shadow: black 1px 1px 5px">
                            <h2 class="font-bold text-lg">{{ article.title }}</h2>
                        </div>
                    </Link>
                </div>
                <h2 class="font-bold text-2xl">Recent Forum Posts</h2>
                <div class="pane y !p-0 divide-y divide-ui-800">
                    <Link v-for="post in recent_posts" :href="route('threads.show', post.thread.slug)" class="x px-4 py-2 items-center justify-between">
                        <span class="y">
                            <span class="font-bold">{{ post.thread.title }}</span>
                            <Username class="text-sm" :user="post.thread.author"/>
                        </span>
                        <span class="y items-end">
                            <Username :user="post.author"/>
                            <span class="text-sm">{{ useTimeAgo(post.created_at).value }}</span>
                        </span>
                    </Link>
                </div>
                <h2 class="font-bold text-2xl">Recent Videos</h2>
                <div class="grid grid-cols-3 gap-4">
                    <VideoLightbox v-for="video in recent_videos" :video="video" class="w-full"/>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/3">
            <h2 v-if="false" class="font-bold text-2xl">Daily Chat</h2>
            <div v-if="false" class="y pane !px-0 !py-0 border border-ui-700">
                <div class="x space-x-2 items-center bg-ui-950 rounded-t-lg justify-between border-b border-ui-700 p-2">
                    <div class="x space-x-3 items-center px-2">
                        <span class="relative h-2 w-2 bg-red-500 rounded-full">
                            <span class="absolute -left-0.5 -top-0.5 h-3 w-3 animate-ping bg-red-500 rounded-full"></span>
                        </span>
                        <span class="font-bold text-xl">LIVE</span>
                    </div>
                    <Dropdown align="left">
                        <template #trigger>
                            <div class="x items-center space-x-2 bg-ui-900 px-2 py-1 rounded text-sm cursor-pointer">
                                <span class="capitalize">Daily</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </template>
                        <template #content>
                            <div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Daily</div>
                            <div class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">Weekly</div>
                        </template>
                    </Dropdown>
                </div>
                <div class="divide-y divide-ui-800 text-sm overflow-y-auto max-h-[20rem]">
                    <div class="px-2 py-1" v-for="message in daily_chat">
                        <p class="text-ui-400">{{message[6]}}</p>
                        <div class="text-ui-500 w-full text-right">&#8212; {{message[7][1]}}</div>
                    </div>
                </div>
                <div class="relative border-t border-ui-700">
                    <Icon name="paper-airplane" class="text-ui-400 absolute right-2 top-1/2 translate-y-[-50%] w-5"/>
                    <input class="rounded-b-lg border-0 bg-ui-950 w-full placeholder-ui-600" placeholder="Chat..."/>
                </div>
            </div>
            <h2 class="font-bold text-2xl">Recent Level Reviews</h2>
            <div class="pane y !p-0 divide-y divide-ui-800">
                <ReviewSummary v-for="review in recent_reviews" :review="review" :decorations="false"/>
            </div>
            <DiscordInvite code="JJc8nndmFE"/>
            <StatsPanel/>
            <div v-if="newest_user" class="pane x justify-between items-center">
                <span>Newest User</span>
                <Username :user="newest_user"/>
            </div>
        </div>
    </app-layout>
</template>
