<script setup>
import Dropdown from "@/Jetstream/Dropdown.vue";
import {router, usePage} from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import {ref} from "vue";
import {isAuthenticated} from "@/util.js";

const props = defineProps({
    sorting: Object,
    url: String
});


const sortDir = ref(props.sorting.sortDir);
const sortBy = ref(props.sorting.sortBy);
const filter = ref(props.sorting.filter);

function setSortBy(value) {
    sortBy.value = value;
    search();
}
function setSortDir(value) {
    sortDir.value = value;
    search();
}

function setFilter(value) {
    filter.value = value;
    search();
}

const search = () => {
    let url = new URL('https://penis.com' + usePage().url);
    let query = new URLSearchParams(url.search);

    query.set('sortBy', sortBy.value);
    query.set('sortDir', sortDir.value);
    query.set('filter', filter.value);
    query.set('perPage', props.sorting.perPage);

    // TODO: add sortby default pruning (theres another todo in filter builder)
    if (query.get('sortDir') === 'desc') query.delete('sortDir');
    if (query.get('filter') === 'all') query.delete('filter');
    if (query.get('perPage') === props.sorting.paginator.default) query.delete('perPage');

    router.get(url.pathname + '?' + query.toString())
}

const transformName = (str) => str.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replaceAll(' At', ' Date').replaceAll('Id', 'ID')
</script>
<template>
    <div class="flex flex-wrap gap-2 items-center justify-center md:justify-end">
        <div class="flex space-x-2 items-center">
            <Dropdown align="left">
                <template #trigger>
                    <div class="flex items-center space-x-2 bg-ui-900 px-2 py-1 rounded-md text-sm cursor-pointer">
                        <span>{{ transformName(sortBy) }}</span>
                        <Icon class="w-4" name="chevron-down"/>
                    </div>
                </template>
                <template #content>
                    <div v-for="name in sorting.sortable" @click="setSortBy(name)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 first:rounded-t last:rounded-b">{{ transformName(name) }}</div>
                </template>
            </Dropdown>
        </div>
        <div v-if="isAuthenticated() && sorting.filters.length" class="x space-x-2 items-center">
            <Dropdown align="left">
                <template #trigger>
                    <div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer">
                        <span class="capitalize">{{ transformName(filter) }}</span>
                        <Icon class="w-4" name="chevron-down"/>
                    </div>
                </template>
                <template #content>
                    <div @click="setFilter('all')" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">All</div>
                    <div v-for="name in sorting.filters" @click="setFilter(name)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">{{ transformName(name) }}</div>
                </template>
            </Dropdown>
        </div>
        <div class="flex space-x-2 items-center">
            <Dropdown align="left">
                <template #trigger>
                    <div class="flex items-center space-x-2 bg-ui-900 px-2 py-1 rounded-md text-sm cursor-pointer">
                        <span class="capitalize">{{ sortDir }}ending</span>
                        <Icon class="w-4" name="chevron-down"/>
                    </div>
                </template>
                <template #content>
                    <div @click="setSortDir('desc')" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-t">Descending</div>
                    <div @click="setSortDir('asc')" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 rounded-b">Ascending</div>
                </template>
            </Dropdown>
        </div>
    </div>
</template>
