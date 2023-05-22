import { defineStore } from 'pinia'
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";

export const useStatisticsStore = defineStore('statistics', () => {
    const counts = ref(usePage<StatisticsProps>().props.app.statistics.counts);
    const patreon = ref(usePage<StatisticsProps>().props.app.statistics.patreon && usePage<StatisticsProps>().props.app.statistics.patreon.included ? usePage<StatisticsProps>().props.app.statistics.patreon.included[0].attributes : {
        completed_percentage: NaN,
        amount_cents: NaN,
        description: 'Could Not Connect to Patreon API'
    });



    return {counts, patreon};
})
