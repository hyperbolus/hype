<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";
import Username from "@/Components/Username.vue";
import route from "ziggy-js";
import {Link} from "@inertiajs/vue3";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Input from "@/Jetstream/Input.vue";
import Icon from "@/Components/Icon.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import LevelReview from "@/Components/LevelReview.vue";
import Timestamp from "@/Components/Timestamp.vue";
import NewsArticle from "@/Components/NewsArticle.vue";
import ComboBox from "@/Components/ComboBox.vue";

const props = defineProps({
    recent_posts: Object,
    recent_reviews: Object,
    recent_articles: Object,
    recent_videos: Object,
    newest_user: Object,
    frontpage_article: Object,
    frontpage_level: Object,
    daily_chat: Object,
    online: Object
});
</script>
<template>
    <app-layout title="Home">
        <div class="y space-y-2 md:w-3/4">
            <div class="y space-y-2">
                <div v-if="frontpage_article" class="x justify-between space-x-2">
                    <h2 class="font-bold text-2xl">News</h2>
                    <Link :href="route('news')" class="button">More News</Link>
                </div>
                <NewsArticle v-if="frontpage_article" class="w-full" :article="frontpage_article"/>

                <h2 v-if="frontpage_level" class="font-bold text-2xl">Featured Level</h2>
                <div v-if="frontpage_level" class="rounded-lg bg-white border-2 border-white !mb-4 [box-shadow:#ffff_0_0_2px_0,#ffaf2b_0_0_15px_0px;]">
                    <LevelTicket :level="frontpage_level"/>
                </div>

                <div class="x justify-between items-center space-x-2">
                    <h2 class="font-bold text-2xl">Recent Level Reviews</h2>
                    <Link :href="route('reviews.index')" class="button">More</Link>
                </div>
                <div class="y space-y-2">
                    <LevelReview v-for="review in recent_reviews" :review="review"/>
                </div>

                <h2 class="font-bold text-2xl">Who's Online</h2>
                <div class="pane">
                    <span v-for="user in online"><Username :card="false" :badge="false" :user="user"/>, </span>
                    <span class="text-ui-600">Guests</span>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
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

            <div class="x justify-between items-center space-x-2">
                <h2 class="font-bold text-2xl">Forum Activity</h2>
                <Link :href="route('forums.index')" class="button">More</Link>
            </div>
            <div class="pane !p-0 divide-y divide-ui-700">
                <div class="px-4 py-2" v-if="recent_posts.length === 0">No activity</div>
                <div v-for="thread in recent_posts" class="y px-4 py-2 space-y-1">
                    <Link v-if="thread" :href="route('posts.show', thread.last_post)" class="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{{ thread.title }}</Link>
                    <span class="text-sm italic opacity-50" v-else>Deleted Post</span>
                    <div class="x items-center text-xs"><Username :user="thread.last_post.author"/><span class="px-1">&bull;</span><Timestamp :time="thread.last_post.created_at"/></div>
                </div>
            </div>

            <div class="x justify-between items-center space-x-2">
                <h2 class="font-bold text-2xl">Recent Videos</h2>
                <Link :href="route('videos.index')" class="button">More</Link>
            </div>
            <div class="grid grid-cols-1 gap-2">
                <VideoLightbox v-for="video in recent_videos" :video="video" class="w-full"/>
            </div>

            <StatsPanel/>

            <div v-if="newest_user" class="pane x justify-between items-center">
                <span>Newest User</span>
                <Username :user="newest_user"/>
            </div>

            <DiscordInvite code="JJc8nndmFE"/>
        </div>
    </app-layout>
</template>
