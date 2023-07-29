<script setup>
import {Link, useForm, usePage} from '@inertiajs/vue3';
import route from "ziggy-js";
import Post from "@/Components/Post.vue";
import PostPad from "@/Components/PostPad.vue";
import AppLayout from "@/Layouts/Dash.vue";
import {ref} from "vue"
import Username from "@/Components/Username.vue";

const props = defineProps({
    review: Object
})

const displayRating = (rating) => {
    return rating ? rating.toFixed(1) : '-';
}
</script>
<template>
    <app-layout :title="review.id">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('levels.show', review.level.id)">{{ review.level.id }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="$page.props.url">Review by {{ review.author.name }}</Link>
        </template>
        <div class="y w-full space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-bold text-2xl">Review of {{ review.level.name }}</h2>
                    <span class="text-sm">by <Username :pop-under="true" :user="review.author"/>, {{ new Date(review.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, Level ID: {{ review.level_id }}</span>
                </div>
                <div class="space-x-2">
                    <Link class="button" :href="route('levels.show', review.level_id)">Back to Level</Link>
                </div>
            </div>
            <div class="px-4 grid grid-cols-4">
                <div class="y">
                    <span class="font-bold">OVERALL</span>
                    <span class="font-bold text-4xl">{{ displayRating(review.rating_overall) }}<span class="text-base text-ui-600">/10</span></span>
                </div>
                <div class="y">
                    <span class="font-bold">GAMEPLAY</span>
                    <span class="font-bold text-4xl">{{ displayRating(review.rating_gameplay) }}<span class="text-base text-ui-600">/10</span></span>
                </div>
                <div class="y">
                    <span class="font-bold">VISUALS</span>
                    <span class="font-bold text-4xl">{{ displayRating(review.rating_visuals) }}<span class="text-base text-ui-600">/10</span></span>
                </div>
                <div class="y">
                    <span class="font-bold">DIFFICULTY</span>
                    <span class="font-bold text-4xl">{{ displayRating(review.rating_difficulty) }}<span class="text-base text-ui-600">/100</span></span>
                </div>

            </div>
            <p class="pane" :class="{'italic text-ui-600 text-center': !review.review}">{{ review.review ? review.review : 'User has not left a written review' }}</p>
        </div>
    </app-layout>
</template>
