<script setup>
import {useStatisticsStore} from "@/stores/statistics.ts";

const goal = useStatisticsStore().patreon
</script>
<template>
    <div class="y text-sm rounded overflow-clip shadow">
        <div class="x transition-colors justify-between px-2 py-2 bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60">
            <a class="font-bold px-2 text-neutral-100 rounded-full" style="background-color:#FF424D;" href="https://patreon.com/seebeyond" target="_blank">Patreon</a>
            <span>Monthly Funding Goal</span>
        </div>
        <div v-if="goal" class="px-2 transition-colors py-1 bg-white dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-40">
            <div class="transition-colors bg-white px-1 dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-40 text-center font-bold text-lg py-1 rounded-full w-full">
                <div :class="goal.completed_percentage >= 100 ? 'bg-amber-50 shadow-[0_0px_6px_4px_rgba(200,120,40,0.75)]' : 'bg-cyan-400'" class="text-center font-bold text-lg py-1 px-1 rounded-full" :style="`width: ${Math.min(goal.completed_percentage, 100)}%;`"></div>
            </div>
            <div class="px-2 py-1 x text-xs justify-between">
                <span>{{goal.completed_percentage}}%</span>
                <span>${{ ((goal.amount_cents / 100) * (goal.completed_percentage / 100)).toFixed(2) }} of ${{ goal.amount_cents / 100 }} per month</span>
            </div>
        </div>
        <p class="px-2 py-1 transition-colors x bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60" :class="{'text-red-500': !goal}">{{ goal.description }}</p>
    </div>
</template>
