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

const props = defineProps({
    recent_posts: Object,
    recent_reviews: Object,
    recent_articles: Object,
    recent_videos: Object,
    newest_user: Object,
    frontpage_article: Object,
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
                    <div v-for="article in recent_articles" class="relative w-1/2 aspect-video rounded overflow-hidden">
                        <div class="absolute inset-0 hover:scale-105 transition-transform bg-contain" :style="`background-image: url(${banner});`"></div>
                        <div class="absolute bottom-0 p-2" style="text-shadow: black 1px 1px 5px">
                            <h2 class="font-bold text-lg">{{ article.title }}</h2>
                        </div>
                    </div>
                </div>
                <h2 class="font-bold text-2xl">Recent Forum Posts</h2>
                <div class="pane y !p-0 divide-y divide-ui-800">
                    <div v-for="post in recent_posts" class="x px-4 py-2 items-center justify-between">
                        <span class="y">
                            <span class="font-bold">{{ post.thread.title }}</span>
                            <Username class="text-sm" :user="post.thread.author"/>
                        </span>
                        <span class="y items-end">
                            <Username :user="post.author"/>
                            <span class="text-sm">{{ useTimeAgo(post.created_at).value }}</span>
                        </span>
                    </div>
                </div>
                <h2 class="font-bold text-2xl">Recent Videos</h2>
                <div class="grid grid-cols-3 gap-4">
                    <VideoLightbox v-for="video in recent_videos" :video="video" class="w-full"/>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/3">
            <h2 class="font-bold text-2xl">Recent Level Reviews</h2>
            <div class="pane y !p-0 divide-y divide-ui-800">
                <div v-for="review in recent_reviews" class="y text-sm px-4 py-2 justify-between">
                    <div class="x justify-between space-x-2">
                        <Link :href="route('levels.show', review.level.id)" class="font-bold">{{ review.level.name }}</Link>
                        <Tooltip :message="review.created_at"><span class="text-ui-500">{{ useTimeAgo(review.created_at).value }}</span></Tooltip>
                    </div>
                    <span class="text-ui-500">by {{ review.level.creator }}</span>
                    <Link :href="route('reviews.show', review.id)" class="italic">"{{ trimAtWord(review.review, 100) }}"</Link>
                    <div class="x items-center space-x-1 justify-end"><span>&#8212;</span><Username :user="review.author"/></div>
                </div>
            </div>
            <DiscordInvite code="JJc8nndmFE"/>
            <StatsPanel/>
            <div class="pane x justify-between items-center">
                <span>Newest User</span>
                <Username :user="newest_user"/>
            </div>
        </div>
    </app-layout>
</template>
