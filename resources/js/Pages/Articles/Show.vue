<script setup>
import AppLayout from "../../Layouts/Dash.vue";
import bg from "@/../images/soundparty.jpg"
import TipTap from "@/Components/TipTap.vue";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import {Link} from "@inertiajs/vue3";
import route from "ziggy-js";

const props = defineProps({
    article: Object,
    articles: Object,
})
</script>
<template>
    <AppLayout :decorations="false" :title="article.title">
        <div class="w-full x justify-center mb-4">
            <div class="w-full md:mx-4 mt-4 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
                <div class="y bg-ui-950 border border-ui-900 md:rounded-lg">
                    <div class="relative y space-y-4 p-4 justify-end items-center md:rounded-t-lg w-full bg-center bg-cover h-[24rem]" style="box-shadow: rgba(0, 0, 0, 0.85) 0 -75px 55px -25px inset;" :style="`background-image: url(${bg})`">
                        <h1 class="font-bold text-6xl" style="text-shadow: black 1px 1px 1px">{{ article.title }}</h1>
                        <div class="x space-x-2 items-center text-sm">
                            <span class="y bg-ui-900 border border-ui-700 rounded-md px-2 py-1">{{ new Date(article.created_at).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'}) }}</span>
                            <span class="y bg-ui-900 border border-ui-700 rounded-md px-2 py-1">{{ Math.ceil(article.post.body.split(/\s+/).length / 225) }} Minute Read</span>
                        </div>
                    </div>
                    <div class="x space-x-8 py-12 px-16">
                        <div class="sticky top-4 y w-1/3 h-fit space-y-4 items-center">
                            <div class="x items-center space-x-4 w-full bg-ui-900 p-4 rounded-lg">
                                <Avatar width="w-10" :user="article.author"/>
                                <div class="y">
                                    <Username class="!text-lg" :user="article.author"/>
                                    <span>Chief Editor</span>
                                </div>
                            </div>
                            <div v-if="article.tags" class="flex flex-wrap bg-ui-900 gap-2 rounded-lg p-2 w-full">
                                <span class="text-sm bg-ui-800 px-2 py-1 rounded">tag</span>
                            </div>
                            <Link v-for="rec in articles" :href="route('articles.show', rec.slug)" class="block relative w-full rounded-lg overflow-hidden">
                                <div class="h-40 bg-cover bg-center hover:scale-105 transition-transform" :style="`background-image:url(${bg});`" style="box-shadow: rgba(0, 0, 0, 0.85) 0 -100px 75px -25px inset;"></div>
                                <div class="absolute bottom-2 left-2 ">
                                    <h2 class="font-bold text-xl mt-2">{{ rec.title }}</h2>
                                    <span class="text-sm">{{ rec.author.name }} &bull; {{ new Date(rec.created_at).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'}) }}</span>
                                </div>
                            </Link>
                        </div>
                        <TipTap class="w-2/3" :editable="false" v-model="article.post.body"/>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
