<script setup>
import {onBeforeMount} from 'vue';
import {Head, Link, usePage} from '@inertiajs/vue3';
import NetworkNav from "@/Components/NetworkNav.vue";
import SiteNav from "@/Components/SiteNav.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import patternBGSD from "@/../images/soundshine.svg"
import patternBG from "@/../images/card_background_outline.svg"
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import route from "ziggy-js";
import {getGame, getUser} from "@/util.js";
import logo from "@/../images/gdwiki.png";

const props = defineProps({
    title: String,
    namespace: String,
    language: String,
    edited_at: [Number, String],
});

const links = [
    {
        title: 'GD Wiki',
        links: {
            'Home Page': route('wiki', props.language + '/Home'),
            'Random Article': route('wiki', 'random') + `?lang=${props.language}`,
            'About the Wiki': route('wiki', props.language + '/Wiki:About'),
        },
    },
    {
        title: 'Hyperbolus',
        links: {
            'Home': route('home'),
            'News': route('news'),
            'Forums': route('forums.index'),
            'Levels': route('levels.index'),
            'Reviews': route('reviews.index'),
            // 'Workshop': route('home'),
        },
    },
    {
        title: 'More',
        links: {
            'About': route('about'),
            'Contact': route('contact'),
        },
    }
];
console.log(usePage().url.replace(/\/$/, ''))

onBeforeMount(() => {
    // Required for global cache on first load
    useSettingsStore()
    useStatisticsStore()
});

</script>
<template>
    <div ref="base" class="y relative items-center text-ui-200 min-h-screen grow overflow-x-clip">
        <Head v-if="title || $page.props?.__meta_title"><title>{{ title ?? $page.props?.__meta_title }}</title></Head>
        <NetworkNav/>
        <SiteNav/>
        <div class="y relative grow items-center w-full">
            <Breadcrumbs :fullwidth="true"><slot name="breadcrumbs"/></Breadcrumbs>
            <div class="absolute -z-10 h-full w-full bg-ui-900" style="mask-size: 8rem;" :style="`mask-image: url('${getGame() === 'soundodger' ? patternBGSD : patternBG}?');`"></div>
            <div class="absolute -z-20 h-full w-full bg-ui-1000"></div>
            <div class="y md:flex-row grow w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl my-4 border-y md:border-x border-ui-700 bg-ui-950 md:rounded-md">
                <aside class="x md:flex-col items-center bg-ui-900 rounded-l-md md:w-1/4 xl:w-1/5 px-2 py-1 md:p-6 border-r border-ui-700 shrink-0">
                    <img :src="logo" alt="" class="h-24 md:h-auto md:w-5/6">
                    <h2 class="font-bold text-2xl">GD Wiki</h2>
                    <div class="hidden md:flex flex-col w-full">
                        <div v-for="section in links" class="y w-full mt-2 links">
                            <span class="font-bold border-b border-ui-700 pb-1">{{ section.title }}</span>
                            <Link v-for="(link, key) in section.links" :href="link" class="py-1">{{ key }}</Link>
                        </div>
                    </div>
                </aside>
                <div class="y grow space-y-2">
                    <article class="y space-y-2 p-6 grow">
                        <div class="border-b border-ui-700 pb-1">
                            <h1 class="text-3xl font-serif">{{ namespace === 'Page' ? '' : (namespace + ':') }}{{ title ?? $page.props?.__meta_title }}</h1>
                        </div>
                        <slot/>
                    </article>
                    <div class="y space-y-2 px-4 py-2 text-sm text-ui-500 border-t border-ui-700 links">
                        <span v-if="edited_at">This page was last edited {{ new Date(edited_at).toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}) }}</span>
                        <span>Page content falls under <a class="text-blue-500" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0</a> unless noted otherwise</span>
                        <div class="x space-x-4">
                            <Link :href="route('about')">About</Link>
                            <Link :href="route('contact')">Contact</Link>
                            <Link :href="route('bans.index')">Bans</Link>
                            <Link :href="route('legal.terms')">Terms of Service</Link>
                            <Link :href="route('legal.privacy')">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.links a {
    @apply text-blue-500 hover:underline dark:hover:text-white
}
</style>
