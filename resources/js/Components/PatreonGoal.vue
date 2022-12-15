<script setup>
import {usePage} from "@inertiajs/inertia-vue3";
import {ref} from "vue";

const goal = ref(usePage().props.value.app.stats.patreon.included[0].attributes);
</script>
<template>
    <div class="y text-sm rounded overflow-clip shadow">
        <div class="x justify-between px-2 py-2 bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60">
            <a class="font-bold px-2 text-neutral-100 rounded-full" style="background-color:#FF424D;" href="https://patreon.com/seebeyond" target="_blank">Patreon</a>
            <span>Monthly Funding Goal</span>
        </div>
        <div class="px-2 py-1 bg-white dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-40">
            <div class="bg-white px-1 dark:bg-neutral-900 bg-opacity-40 dark:bg-opacity-40 text-center font-bold text-lg py-1 rounded-full w-full">
                <div class="bg-cyan-400 text-center font-bold text-lg py-1 px-1 rounded-full" :style="`width: ${goal.completed_percentage}%;`"></div>
            </div>
            <div class="px-2 py-1 x text-xs justify-between">
                <span>0%</span>
                <span>$0 of ${{ goal.amount_cents / 100 }} per month</span>
            </div>
        </div>
        <p class="px-2 py-1 x bg-white dark:bg-neutral-900 bg-opacity-60 dark:bg-opacity-60">{{ goal.description }}</p>
    </div>
</template>
