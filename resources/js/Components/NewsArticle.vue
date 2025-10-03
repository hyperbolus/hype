<script setup>
import {Link} from '@inertiajs/vue3';
import route from "ziggy-js";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import {readingTime} from "../util.js";
import banner from "@/../images/wellrestedbg.jpg"
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    article: Object,
    card: Boolean,
    small: Boolean
})
</script>
<template>
    <div class="bg-ui-900 rounded-lg relative" :class="{'p-2 y md:flex-row': !card, 'text-white x': card}" :style="card ? 'text-shadow:black 0 0 4px,black 0 1px 2px' : ''">
        <Link :href="route('articles.show', article.slug)" class="aspect-video overflow-hidden shrink-0 relative" :class="card ? 'w-full rounded-lg' : 'md:w-1/2 rounded'">
            <div class="absolute inset-0 hover:scale-105 transition-transform bg-cover bg-center" :style="`background-image: url(${article.banner ?? banner});`"></div>
        </Link>
        <div class="y px-2 py-2" :class="{'absolute z-10 backdrop-blur-sm bg-ui-1000/50': card, 'bottom-0 h-fit w-full rounded-b-lg pt-1': small, 'rounded m-2 inset-0': !small && card, 'justify-between space-y-2': !small, 'md:pl-4 grow': !card}">
            <div class="y">
                <span v-if="article.tagline && !small" class="tracking-widest uppercase text-xs mt-1 md:mt-0" :class="card ? 'text-ui-100' : 'text-ui-400'">{{ article.tagline }}</span>
                <Link :href="route('articles.show', article.slug)" class="font-bold" :class="small ? 'px-1' : 'text-2xl'">{{ article.title }}</Link>
                <Link :href="route('articles.show', article.slug)" v-if="article.blurb && !small" class="mt-2">{{ article.blurb }} <u>read more...</u></Link>
            </div>
            <div class="x space-x-2 items-end justify-between">
                <div class="x space-x-2 items-center shrink-0 -mb-1">
                    <Avatar v-if="!small" :user="article.author"/>
                    <Username :user="article.author"/>
                </div>
                <div class="x items-center space-x-1 text-sm text-right shrink-0" :class="card ? 'text-ui-200' : 'text-ui-500'">
                    <Icon name="clock" class="size-4"/>
                    <span>{{ readingTime(article.content) }}m</span>
                    <span v-if="!small">&middot; {{ new Date(article.created_at).toLocaleDateString() }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
