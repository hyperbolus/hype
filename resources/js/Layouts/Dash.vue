<script setup>
import {onBeforeMount, onMounted, ref} from 'vue';
import {Head} from '@inertiajs/vue3';
import NetworkNav from "@/Components/NetworkNav.vue";
import SiteNav from "@/Components/SiteNav.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import Footer from "@/Components/Footer.vue";
import {invisiblePixel} from "@/util";
import dashBG from "@/../images/wellrestedbg.jpg"
import patternBG from "@/../images/card_background_outline.svg"
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
    },
    slotClasses: {
        type: String,
        default: ''
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
    <!-- TODO: Figure out the nesting so scrollbar is inside and colored and overscroll has the header/footer colors extend as the bg color -->
    <div ref="base" class="y relative transition-colors items-center text-neutral-700 dark:text-ui-300 bg-neutral-300 dark:bg-ui-1000 min-h-screen grow overflow-x-hidden">
        <Head><title>{{ title }}</title></Head>
        <NetworkNav/>
        <SiteNav/>
        <Breadcrumbs>
            <slot name="breadcrumbs"/>
        </Breadcrumbs>
        <div class="absolute z-0 h-full w-full bg-rainbow" style="mask-size: 8rem;" :style="`mask-image: url('${patternBG}?');`"></div>
        <div v-if="false" class="absolute overflow-hidden z-0 top-0 w-full h-full">
            <div v-if="false" class="scale-125 rotate-12 absolute z-10 h-full w-full mix-blend-lighten dark:mix-blend-darken dark:invert bg-white bg-cover" style="background-size: 5rem; background-position: center 20px" :style="`background-image: url(${patternBG});`"></div>
            <img v-if="false" class="absolute z-20 w-full m-auto" style="mask:linear-gradient(white 75%, transparent);" :src="bgsrc" alt="Featured Background"/>
        </div>
        <div class="y relative grow items-center w-full">
            <div v-if="decorations" class="flex flex-col flex-grow transition-colors shadow-xl backdrop-blur-lg dark:backdrop-blur-0 bg-neutral-200 dark:bg-ui-950 dark:border dark:border-ui-900 bg-opacity-75 md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4 my-4 rounded-lg">
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
</style>
