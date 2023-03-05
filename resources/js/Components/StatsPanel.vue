<script setup>
import {useStatisticsStore} from "@/stores/statistics.ts";

const stats = useStatisticsStore().counts
</script>
<template>
    <div class="space-y-2">
        <h2 class="mx-2 font-bold text-2xl">Statistics</h2>
        <div class="pane">
            <div v-for="(statistic, key) in stats" class="flex justify-between">
                <span class="capitalize">{{ key }}</span>
                <span>{{ statistic }}</span>
            </div>
        </div>
    </div>
</template>
