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
    router.get((props.url ?? usePage().url) + '?' + new URLSearchParams({
        sortBy: sortBy.value,
        sortDir: sortDir.value,
        filter: filter.value,
        perPage: props.sorting.perPage,
    }).toString())
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
                    <div v-for="(name, i) in sorting.sortable" @click="setSortBy(name)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-800 first:rounded-t last:rounded-b">{{ transformName(name) }}</div>
                </template>
            </Dropdown>
        </div>
        <div v-if="isAuthenticated() && sorting.filters.length" class="x space-x-2 items-center">
            <Dropdown align="left">
                <template #trigger>
                    <div class="x items-center space-x-2 pane !px-2 !py-1 rounded text-sm cursor-pointer">
                        <span class="capitalize">{{ filter }}</span>
                        <Icon class="w-4" name="chevron-down"/>
                    </div>
                </template>
                <template #content>
                    <div @click="setFilter('all')" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">all</div>
                    <div v-for="name in sorting.filters" @click="setFilter(name)" class="px-2 py-1 text-sm cursor-pointer hover:bg-ui-700">{{ name }}</div>
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
