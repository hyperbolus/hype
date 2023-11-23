<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {Link} from '@inertiajs/vue3';
import route from "ziggy-js";
import banner from "@/../images/Article22UpdateBanner.jpg"

const props = defineProps({
    articles: Object
})
</script>
<template>
    <AppLayout title="News">
        <div class="y space-y-4 w-full">
            <Link v-for="article in articles.data" :href="route('articles.show', article.slug)" class="block relative aspect-video rounded overflow-hidden">
                <div class="absolute inset-0 hover:scale-105 transition-transform bg-contain" :style="`background-image: url(${banner});`"></div>
                <div class="absolute bottom-0 p-4" style="text-shadow: black 1px 1px 5px">
                    <h2 class="font-bold text-3xl">{{ article.title }}</h2>
                    <p>{{ article.blurb }}</p>
                </div>
            </Link>
        </div>
    </AppLayout>
</template>
