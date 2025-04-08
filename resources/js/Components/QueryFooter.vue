<script setup>
import {router} from "@inertiajs/vue3";

const props = defineProps({
    results: Object,
    sorting: Object,
    url: String
});

const promptPerPage = () => {
    let perPage = prompt(`How many results would like like to load per page? (max: ${props.sorting.paginator.max})`)
    if (!perPage) return;

    let params = {
        sortBy: props.sorting.sortBy,
        sortDir: props.sorting.sortDir,
        filter: props.sorting.filter,
    };

    if (!isNaN(parseInt(perPage))) {
        params.perPage = Math.min(props.sorting.paginator.max, Math.max(props.sorting.paginator.min, parseInt(perPage)));
        router.get(props.url + '?' + new URLSearchParams(params).toString());
    }
}
</script>
<template>
    <div class="x justify-between items-center text-sm px-2">
        <div>{{ results.from }}-{{ results.to }} of {{ results.total }}</div>
        <div v-if="sorting" class="x items-center space-x-1">
            <span @click="promptPerPage" class="text-sm rounded-md border border-ui-700 px-1 py-0.5">{{ results.per_page }}</span>
            <span class="pb-0.5">results per page</span>
        </div>
        <span v-else class="pb-0.5">{{ results.per_page }} results per page</span>
    </div>
</template>
