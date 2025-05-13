<script setup>
import {onBeforeMount} from 'vue';
import {Head, Link} from '@inertiajs/vue3';
import NetworkNav from "@/Components/NetworkNav.vue";
import SiteNav from "@/Components/SiteNav.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import Footer from "@/Components/Footer.vue";
import patternBGSD from "@/../images/soundshine.svg"
import patternBG from "@/../images/card_background_outline.svg"
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import route from "ziggy-js";
import {getGame, isAuthenticated} from "@/util.js";

const props = defineProps({
    title: String,
    decorations: {
        type: Boolean,
        default: true
    },
    background: {
        type: Boolean,
        default: true,
    },
    fullwidth: {
        type: Boolean,
        default: false
    },
    slotClasses: {
        type: String,
        default: ''
    },
});

onBeforeMount(() => {
    // Required for global cache on first load
    useSettingsStore()
    useStatisticsStore()

});

</script>
<template>
    <div ref="base" class="y relative items-center text-ui-300 min-h-screen grow overflow-x-hidden" :class="getGame() === 'soundodger' ? 'theme-soundodger' : ''">
        <Head v-if="title"><title>{{ title }}</title></Head>
        <NetworkNav/>
        <SiteNav/>
        <div class="y relative grow items-center w-full">
            <Breadcrumbs :fullwidth="fullwidth"><slot name="breadcrumbs"/></Breadcrumbs>
            <div v-if="background" class="absolute -z-10 h-full w-full bg-ui-900" style="mask-size: 8rem;" :style="`mask-image: url('${getGame() === 'soundodger' ? patternBGSD : patternBG}?');`"></div>
            <div class="absolute -z-20 h-full w-full bg-ui-1000"></div>
            <div v-if="decorations" class="x justify-center w-full my-4">
                <div class="flex flex-col flex-grow shadow-xl bg-ui-950 border-y md:border-x border-ui-900/75 md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full gap-4 p-2 md:p-4 md:mx-4 md:rounded-lg">
                    <slot/>
                </div>
            </div>
            <slot v-else/>
            <div v-if="false && isAuthenticated()" class="mb-2">
                <div class="w-[728px] h-[90px] bg-blue-500"></div>
                <span class="text-sm">Don't want to see ads? <Link class="underline" :href="route('auth::login')">Sign in.</Link></span>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<style>
#nprogress div.bar {
    background: linear-gradient(#67e8f9, #34d399) !important;
}
</style>
