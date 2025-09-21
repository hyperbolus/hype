<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {Link} from '@inertiajs/vue3';
import route from "ziggy-js";
import NewsArticle from "@/Components/NewsArticle.vue";

const props = defineProps({
    articles: Object,
    archive: Object,
    tags: Object
});

const intl = new Intl.DateTimeFormat('en-US', { month: 'long' });
</script>
<template>
    <AppLayout title="News">
        <div class="y space-y-4 w-full">
            <h1 class="text-center text-6xl font-bold border-b border-ui-700 pb-2">News</h1>
            <div class="y lg:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div class="y space-y-2 lg:w-3/4 rounded-lg">
                    <NewsArticle v-for="article in articles.data" :article="article"/>
                </div>
                <div class="y space-y-2 lg:w-1/4">
                    <h2 class="text-2xl font-bold">Tags</h2>
                    <div class="y pane space-y-1 !mt-1">
                        <span class="text-ui-500">No Tags</span>
                        <span class="font-bold" v-for="tag in tags">{{ tag }}</span>
                    </div>

                    <h2 class="text-2xl font-bold">Archive</h2>
                    <div class="y pane space-y-1 !mt-1">
                        <details v-for="(year, i) in archive" :open="Object.keys(archive).length === 1">
                            <summary>{{ i }}</summary>
                            <div class="y ml-4">
                                <details v-for="(month, j) in year">
                                    <summary>{{ intl.format(new Date(2000, j, 1)) }}</summary>
                                    <div class="y ml-4 font-bold">
                                        <Link v-for="article in month" :href="route('articles.show', article.slug)">{{ article.title }}</Link>
                                    </div>
                                </details>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
