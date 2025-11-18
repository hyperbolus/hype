<script setup>
import {onBeforeMount} from 'vue';
import {Head, Link} from '@inertiajs/vue3';
import patternBGSD from "@/../images/soundshine.svg"
import patternBG from "@/../images/card_background_outline.svg"
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import route from "ziggy-js";
import {getGame} from "@/util.js";
import logo from "@/../images/gdwiki.png";
import {isAuthenticated, settings, wiki} from "../util";
import {useDateFormat} from "@vueuse/core/index";
import Icon from "../Components/Icon.vue";
import ControlBar from "../Components/ControlBar.vue";
import AutoLink from "../Components/AutoLink.vue";

const props = defineProps({
    title: String,
    namespace: String,
    outdated: Boolean,
    permalink: Boolean,
    action: String,
    language: String,
    edited_at: [Number, String],
});

const links = [
    {
        title: 'GD Wiki',
        links: {
            'Home Page': wiki('Home'),
            'Random Article': wiki('random') + `?lang=${props.language}`,
            'About the Wiki': wiki('Wiki:About'),
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

onBeforeMount(() => {
    // Required for global cache on first load
    useSettingsStore()
    useStatisticsStore()
});

</script>
<template>
    <div ref="base" class="y relative items-center text-ui-200 min-h-screen grow overflow-x-clip 2theme-wiki">
        <Head v-if="title || $page.props?.__meta_title"><title>{{ title ?? $page.props?.__meta_title }}</title></Head>
        <div class="y relative grow items-center w-full">
<!--            <div class="absolute -z-10 h-full w-full bg-ui-800" style="mask-size: 8rem;" :style="`mask-image: url('${getGame() === 'soundodger' ? patternBGSD : patternBG}?');`"></div>-->
            <div class="absolute -z-20 h-full w-full bg-ui-900"></div>
            <div class="x relative z-0 items-center justify-between w-full max-w-7xl px-4 py-2 mt-4 mb-2 border border-ui-800">
                <div class="x items-center">
                    <img :src="logo" alt="" class="h-24 mr-2">
                    <h2 class="hidden md:inline font-serif text-3xl whitespace-nowrap">Geometry Dash Wiki</h2>
                    <h2 class="md:hidden font-serif text-2xl whitespace-nowrap">GD Wiki</h2>
                </div>
                <div class="hidden md:flag grow">
                    <div class="x items-center bg-ui-900 border border-ui-700 w-fit pl-2 focus-within:ring-1 ring-blue-500">
                        <Icon class="size-4 " name="magnifying-glass"/>
                        <input placeholder="Search" class="bg-ui-900 py-1 border-0 placeholder:text-ui-500 focus:ring-0"/>
                    </div>
                </div>
                <div class="bg-ui-900 px-4 py-2 border border-ui-700 mr-2">
                    <ControlBar v-if="isAuthenticated()" class="!w-fit"/>
                    <span v-else><a class="underline" :href="route('home') + '/auth/migrate'">Login</a> with Hyperbolus</span>
                </div>
                <div class="absolute inset-0 -z-10 h-full w-full bg-ui-800" style="mask-size: 5rem;" :style="`mask-image: url('${getGame() === 'soundodger' ? patternBGSD : patternBG}?');`"></div>
                <div class="absolute inset-0 -z-20 h-full w-full bg-ui-950"></div>
            </div>
            <div class="y md:flex-row grow w-full max-w-7xl bg-ui-950 border border-ui-800 p-4">
                <aside class="hidden md:flex md:flex-col items-center px-2 shrink-0 !w-56">
<!--                    <img :src="logo" alt="" class="h-40">-->
                    <div class="y w-full">
                        <div v-for="section in links" class="y w-full mt-2 links">
                            <span class="font-bold border-b border-ui-700 pb-1">{{ section.title }}</span>
                            <AutoLink v-for="(link, key) in section.links" :href="link" class="py-1">{{ key }}</AutoLink>
                        </div>
                    </div>
                </aside>
                <div class="y grow space-y-2">
                    <article class="y space-y-2 px-2 grow">
                        <div v-if="settings('_subsite') !== 'wiki'" class="x space-x-2 items-center text-sm rounded-md p-2 pr-4 border bg-blue-500/10 border-blue-500 links">
                            <Icon class="w-8 ml-1 text-blue-500" name="information-circle"/>
                            <p>Hyperbolus is the proud host of the Geometry Dash Wiki! It's available here for convenience, but for a cleaner reading experience check out the dedicated site at <a href="https://geometrydash.wiki">geometrydash.wiki</a>!</p>
                        </div>
                        <div class="x space-x-1.5 items-center border-b border-ui-700 pb-1">
                            <span class="text-xl font-bold uppercase rounded px-2 py-0.5 bg-amber-500 text-white" v-if="permalink">Revision</span>
                            <span class="text-xl font-bold uppercase rounded px-2 py-0.5 bg-ui-800" v-if="namespace !== 'Article'">{{ namespace }}</span>
                            <h1 class="text-3xl font-serif">{{ title ?? $page.props?.__meta_title }}</h1>
                        </div>
                        <slot/>
                    </article>
                </div>
            </div>
            <div class="y space-y-2 px-6 pt-4 pb-16 mb-8 text-xs text-ui-500 links border border-t-0 border-ui-800 bg-ui-1000 w-full max-w-7xl leading-none">
                <span v-if="edited_at && action === 'read'">This page was last edited {{ new Date(edited_at).toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}) }}</span>
                <span v-if="action === 'read'">Page content falls under <a class="text-blue-500" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0</a> unless noted otherwise</span>
                <div class="x space-x-4">
                    <AutoLink :href="route('about')">About</AutoLink>
                    <AutoLink :href="route('contact')">Contact</AutoLink>
                    <AutoLink :href="route('bans.index')">Bans</AutoLink>
                    <AutoLink :href="route('legal.terms')">Terms of Service</AutoLink>
                    <AutoLink :href="route('legal.privacy')">Privacy</AutoLink>
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
