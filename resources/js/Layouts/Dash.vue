<script setup>
import {onBeforeMount, ref} from 'vue';
import {Head} from '@inertiajs/vue3';
import NetworkNav from "@/Components/NetworkNav.vue";
import SiteNav from "@/Components/SiteNav.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import Footer from "@/Components/Footer.vue";
import {invisiblePixel} from "@/util";
import dashBG from "@/../images/wellrestedbg.jpg"
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";

const props = defineProps({
    title: String,
    background: {
        type: [String, Boolean],
        default: null
    },
    decorations: {
        type: Boolean,
        default: true
    }
});

onBeforeMount(() => {
    setBG()
    // Required for global cache on first load
    useSettingsStore()
    useStatisticsStore()
});

const bgsrc = ref(null);

const setBG = () => {
    bgsrc.value = props.background === false ? invisiblePixel : (props.background ?? dashBG)
}
</script>
<template>
    <div ref="base" class="y transition-colors items-center text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800 min-h-screen overflow-hidden">
        <Head><title>{{ title }}</title></Head>
        <NetworkNav/>
        <SiteNav/>
        <Breadcrumbs>
            <slot name="breadcrumbs"/>
        </Breadcrumbs>
        <slot class="z-10" name="header"/>
        <div class="y z-0 overflow-clip relative flex-grow w-full">
            <div class="absolute top-0 w-full h-fit" :style="'-webkit-mask:linear-gradient(white 0%, transparent);background-image: url(\'' + bgsrc + '\');background-size:cover;background-position:top;' + ('' === 'impossible' ? 'image-rendering:crisp-edges;' : '')">
                <img class="h-full w-full m-auto invisible" :src="bgsrc" alt="Featured Background"/>
            </div>
            <div class="y flex-grow relative h-full items-center w-full">
                <div v-if="decorations" class="flex flex-col flex-grow transition-colors shadow-xl backdrop-blur-lg bg-neutral-200 dark:bg-neutral-900 bg-opacity-75 dark:bg-opacity-75 md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
                    <slot/>
                </div>
                <slot v-else/>
            </div>
        </div>
        <Footer/>
    </div>
</template>
