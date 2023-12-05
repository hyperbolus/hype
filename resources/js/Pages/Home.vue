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
            <h2 class="font-bold text-2xl">Recent Level Reviews</h2>
            <div class="pane y !p-0 divide-y divide-ui-800">
                <ReviewSummary v-for="review in recent_reviews" :review="review" :decorations="false"/>
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
