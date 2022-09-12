<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';

const props = defineProps({
    level: Object
})

const form = useForm({
    rating_gameplay: 5,
    rating_difficulty: 5,
    rating_visuals: 5,
    rating_overall: 5,
    body: '',
    level_id: props.level.id
});

const submit = () => {
    form.post(route('reviews.store'), {
        preserveScroll: true,
        onFinish: () => {
            form.reset()
        },
    });
};
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
            <span>&raquo;</span>
            <span>{{ level.id }}</span>
        </template>
        <div class="flex max-w-6xl w-full gap-4 py-4">
            <div class="flex flex-col space-y-4 w-3/4">
                <h2 class="font-bold text-2xl">{{ level.name }}</h2>
                <div class="rounded px-2 py-2 space-y-2 bg-neutral-900 border border-neutral-700">
                    <h2 class="text-xl">{{ level.creator }}</h2>
                    <p>{{ level.description }}</p>
                </div>
                <form v-if="$page.props.auth" @submit.prevent="submit" class="flex flex-col rounded px-2 py-2 space-y-2 bg-neutral-900 border border-neutral-500">
                    <h2 class="text-xl">Submit Rating</h2>
                    <div>
                        <h2>Gameplay Rating: {{ form.rating_gameplay / 2 }}</h2>
                        <input v-model="form.rating_gameplay" type="range" min="0" max="10" step="1"/>
                        <h2>Difficulty Rating: {{ form.rating_difficulty / 2 }}</h2>
                        <input v-model="form.rating_difficulty" type="range" min="0" max="10" step="1"/>
                        <h2>Visuals Rating: {{ form.rating_visuals / 2 }}</h2>
                        <input v-model="form.rating_visuals" type="range" min="0" max="10" step="1"/>
                        <h2>Overall Rating: {{ form.rating_overall / 2 }}</h2>
                        <input v-model="form.rating_overall" type="range" min="0" max="10" step="1"/>
                    </div>
                    <textarea v-model="form.body" class="rounded"></textarea>
                    <span @click="submit" class="w-fit rounded px-2 py-1 bg-neutral-200 hover:bg-neutral-300 cursor-pointer">Submit Rating</span>
                </form>
                <div v-else class="flex flex-col rounded px-2 py-2 space-y-2 bg-neutral-900 border border-neutral-700">
                    <h2 class="text-xl">Log in to submit a review</h2>
                </div>
                <h2 class="font-bold text-2xl">Reviews</h2>
                <div v-for="review in level.reviews" class="rounded px-2 py-2 space-y-2 bg-neutral-900 border border-neutral-700">
                    <div class="flex items-center space-x-2">
                        <h2 class="text-xl">{{ review.author.name }}</h2>
                        <span class="font-bold">{{ review.rating_overall/2 }}/5</span>
                    </div>
                    <p>{{ review.review }}</p>
                </div>
            </div>
            <div class="flex flex-col space-y-4 w-1/4">
                <h2 class="font-bold text-2xl">Videos</h2>
                <div v-if="level.videos.length === 0" class="rounded bg-neutral-900 px-4 py-2 border border-neutral-700">
                    No Videos :(
                </div>
                <div v-else v-for="video in level.videos" class="rounded bg-neutral-50 px-4 py-2 border border-neutral-300">
                    <iframe class="w-fit" :src="'https://www.youtube.com/embed/'+video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </app-layout>
</template>
