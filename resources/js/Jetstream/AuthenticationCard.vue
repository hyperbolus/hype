<script setup>
import {onBeforeMount} from "vue";
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import {isDark} from '../util.js'
import patternBG from "@/../images/card_background_outline.svg"

onBeforeMount(() => {
    // Required for global cache on first load
    useSettingsStore()
    useStatisticsStore()

});

const dark = isDark;
</script>
<template>
    <div class="min-h-screen relative flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-ui-1000 text-ui-200">
        <div class="static z-20">
            <slot name="logo" />
        </div>
        <div class="absolute z-0 h-full w-full bg-ui-900" style="mask-size: 8rem;" :style="`mask-image: url('${patternBG}');`"></div>
        <div class="z-20 static w-full sm:max-w-md mt-6 px-6 py-4 bg-ui-800 shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
