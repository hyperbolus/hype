<script setup>
import {onBeforeMount} from "vue";
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import {isDark} from '../util.js'

onBeforeMount(() => {
    // Required for global cache on first load
    useSettingsStore()
    useStatisticsStore()

});

const dark = isDark;
</script>
<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-ui-900 text-ui-200">
        <div>
            <slot name="logo" />
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-ui-800 shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
