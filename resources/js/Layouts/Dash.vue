<script setup>
import {onBeforeMount} from 'vue';
import {Head} from '@inertiajs/vue3';
import NetworkNav from "@/Components/NetworkNav.vue";
import SiteNav from "@/Components/SiteNav.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import Footer from "@/Components/Footer.vue";
import patternBG from "@/../images/card_background_outline.svg"
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";

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
    <div ref="base" class="y relative items-center text-ui-300 min-h-screen grow">
        <Head v-if="title"><title>{{ title }}</title></Head>
        <NetworkNav/>
        <SiteNav/>
        <div class="y relative grow items-center w-full">
            <Breadcrumbs :fullwidth="fullwidth"><slot name="breadcrumbs"/></Breadcrumbs>
            <div v-if="background" class="absolute -z-10 h-full w-full bg-ui-900" style="mask-size: 8rem;" :style="`mask-image: url('${patternBG}?');`"></div>
            <div class="absolute -z-20 h-full w-full bg-ui-1000"></div>
            <div v-if="decorations" class="flex flex-col flex-grow shadow-xl bg-ui-950 border border-ui-900/75 md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full gap-4 p-4 my-4 rounded-lg">
                <slot/>
            </div>
            <slot v-else/>
        </div>
        <Footer/>
    </div>
</template>
<style>
.bg-rainbow {
    /*animation: hue 20s linear infinite;*/
    background-image: repeating-linear-gradient(110deg, cyan, magenta, yellow);
}

@keyframes hue {
    0% { filter: hue-rotate(0deg) }
    50% { filter: hue-rotate(180deg) }
    100% { filter: hue-rotate(360deg) }
}
.rotate-hue {
    /*animation: hue 10s linear infinite;*/
}

#nprogress div.bar {
    background: linear-gradient(#67e8f9, #34d399) !important;
}
</style>
