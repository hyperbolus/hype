<script setup>
import {onBeforeMount} from 'vue';
import {Head, Link, usePage} from '@inertiajs/vue3';
import NetworkNav from "@/Components/NetworkNav.vue";
import SiteNav from "@/Components/SiteNav.vue";
import Breadcrumbs from "../Components/Breadcrumbs.vue";
import Footer from "@/Components/Footer.vue";
import patternBGSD from "@/../images/soundshine.svg"
import patternBG from "@/../images/card_background_outline.svg"
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import {getGame, isAuthenticated} from "@/util.js";
import CookieConsent from "@/Components/CookieConsent.vue";
import AdUnit from "../Components/AdUnit.vue";
import ABPlea from "../Components/ABPlea.vue";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import {isPremium} from "@/util";

const props = defineProps({
    title: {
        type: String,
        default: usePage().props?.__meta_title ?? ''
    },
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
    <div ref="base" class="y relative items-center text-ui-200 min-h-screen grow overflow-x-clip" :class="getGame() === 'soundodger' ? 'theme-soundodger' : ''">
        <Head v-if="title"><title>{{ title }}</title></Head>
        <SiteNav/>
        <div class="y relative grow items-center w-full">
            <div v-if="isAuthenticated() && !isPremium() && $page.props.app.patron" class="flex flex-wrap py-1 justify-center items-center text-center space-x-2 w-full px-8 text-sm" :class="fullwidth ? 'bg-ui-950' : 'mt-2 bg-ui-900 rounded-lg border border-ui-700 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl'">
                <span>Hyperbolus is supported by</span>
                <div class="x items-center space-x-2">
                    <Avatar :user="$page.props.app.patron"/>
                    <Username :user="$page.props.app.patron"/>
                </div>
                <span>on <a target="_blank" href="https://patreon.com/hyperbolus" class="font-bold underline text-[#FF424D]">Patreon</a>!</span>
            </div>
            <AdUnit v-else-if="!isAuthenticated() && !fullwidth" :cta="false" type="banner" slot-key="2978602886" ad-style="height:90px;min-width:400px;width:100%;" class="mt-2 w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8"/>
            <ABPlea v-if="!isPremium()" :fullwidth="fullwidth"/>
            <Breadcrumbs :fullwidth="fullwidth"><slot name="breadcrumbs"/></Breadcrumbs>
            <div v-if="background" class="absolute -z-10 h-full w-full bg-ui-900" style="mask-size: 8rem;" :style="`mask-image: url('${getGame() === 'soundodger' ? patternBGSD : patternBG}?');`"></div>
            <div class="absolute -z-20 h-full w-full bg-ui-1000"></div>
            <div v-if="decorations" class="x justify-center w-full my-2">
                <AdUnit v-if="!true" type="skyscraper" slot-key="idk" class="hidden 2xl:block sticky top-2"/>
                <div class="flex flex-col flex-grow shadow-xl bg-ui-950 border-y md:border-x border-ui-900/75 md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full gap-4 p-2 md:p-4 md:mx-4 md:rounded-lg">
                    <slot/>
                </div>
                <AdUnit v-if="!true" type="skyscraper" slot-key="idk"  class="hidden 2xl:block sticky top-2"/>
            </div>
            <slot v-else/>
            <AdUnit v-if="!isPremium()" :cta="true" type="banner" slot-key="4229314886" ad-style="min-height:50px;min-width:400px;width:100%;" class="mb-2 w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-8"/>
        </div>
        <Footer/>
        <CookieConsent/>
    </div>
</template>
