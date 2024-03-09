<script setup>
import Dash from "@/Layouts/Dash.vue";
import {Link, usePage} from "@inertiajs/vue3";
import route from "ziggy-js";

const props = defineProps({
    title: String
})

const links = [
    {
        'title': 'Modding',
        'url': route('guide.show', 'modding'),
    }
];
console.log(usePage().url.replace(/\/$/, ''))
</script>
<template>
    <Dash :title="title" :decorations="false">
        <div class="x grow w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl my-4 border border-ui-700 bg-ui-950 rounded-md">
            <aside class="y bg-ui-900 rounded-l-md w-32 p-2">
                <Link v-for="link in links" :class="{ 'bg-ui-800': $page.url.replace(/\/$/, '') === link.url.replace(/\/$/, '') }" class="rounded-lg px-2 py-1">{{ link.title }}</Link>
            </aside>
            <div class="y space-y-4 w-ful p-8">
                <h2 class="text-4xl font-bold">{{ title }}</h2>
            </div>
        </div>
    </Dash>
</template>
