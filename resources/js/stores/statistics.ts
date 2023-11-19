import { defineStore } from 'pinia'
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";

export const useStatisticsStore = defineStore('statistics', () => {
    const counts = ref(usePage<StatisticsProps>().props.app.statistics.counts);

    return {counts};
})
