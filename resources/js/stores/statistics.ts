import { defineStore } from 'pinia'
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";

export const useStatisticsStore = defineStore('statistics', () => {
    const counts = ref(usePage<StatisticsProps>().props.app.statistics.counts);
    const patreon = ref(usePage<StatisticsProps>().props.app.statistics.patreon ? usePage<StatisticsProps>().props.app.statistics.patreon.data.attributes : {
        patron_count: NaN,
        error: 'Could Not Connect to Patreon API'
    });

    return {counts, patreon};
})
