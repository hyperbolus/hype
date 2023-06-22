<script setup>
import {useStatisticsStore} from "@/stores/statistics.ts";

const goal = useStatisticsStore().patreon
const patronsGoal = 20;
</script>
<template>
    <div class="y text-sm rounded-lg overflow-hidden shadow">
        <template v-if="!goal.error">
            <div class="x justify-between px-2 py-2 bg-ui-900">
                <a class="font-bold px-2 text-ui-100 rounded-full" style="background-color:#FF424D;" href="https://patreon.com/hyperbolus" target="_blank">Patreon</a>
                <span>Monthly Goal</span>
            </div>
            <div class="px-2 py-1 bg-ui-900">
                <div class="bg-ui-800 text-center font-bold text-lg py-1 rounded-full w-full">
                    <div :class="goal.patron_count >= patronsGoal ? 'bg-amber-50 shadow-[0_0px_6px_4px_rgba(200,120,40,0.75)]' : 'bg-cyan-400'" class="text-center font-bold text-lg py-1 px-1 rounded-full" :style="`width: ${Math.min(goal.patron_count / patronsGoal * 100, 100)}%;`"></div>
                </div>
                <div class="px-2 py-1 x text-xs justify-between">
                    <span>{{ goal.patron_count / 20 * 100 }}%</span>
                    <span>{{ goal.patron_count }}/{{ patronsGoal }} patrons/mo</span>
                </div>
            </div>
        </template>
        <p v-else class="px-2 py-1 x bg-ui-900 text-red-500">{{ goal.error }}</p>
    </div>
</template>
