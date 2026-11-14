<script setup>
import {computed, nextTick, ref, watch} from 'vue'
import {MeiliSearch} from 'meilisearch'
import {Link} from '@inertiajs/vue3'
import route from 'ziggy-js'
import Username from "@/Components/Username.vue";
import Icon from "@/Components/Icon.vue";
import {useMagicKeys, whenever} from "@vueuse/core";
import LevelSearchResult from "@/Components/LevelSearchResult.vue";

const client = new MeiliSearch({
    host: 'https://search.gdps.io',
    apiKey: 'fade7e646417e810b3dbe8ed2458df226059cd6d8986f534b10a2df3d6133a2e',
})

const newQuery = ref(null);
const lastQuery = ref(null);
const searches = ref({});

const pageLevels = ref(1)

const search = async () => {
    index.value = -1;
    if (!searches.value.hasOwnProperty(newQuery.value)) {
        searches.value[newQuery.value] = await client.multiSearch({
            queries: [
                {
                    indexUid: 'hype_gdf_levels',
                    q: newQuery.value,
                    hitsPerPage: 15,
                    //sort: ['downloads:desc'], // TODO: sort by downloads
                    //page: pageLevels.value,
                    attributesToSearchOn: ['name']
                },
                {
                    indexUid: 'hype_gdf_users',
                    q: newQuery.value,
                    hitsPerPage: 20,
                    attributesToSearchOn: ['name']
                },
            ]
        });
    }
    lastQuery.value = newQuery.value;
}

watch(newQuery, search)
watch(pageLevels, search) // TODO: make search aware of pages

const searchInput = ref(null);
const trigger = ref(null);
const dropdown = ref(null);

// TODO: disable in input? https://vueuse.org/core/useMagicKeys/
const {ctrl_k, down, up, escape} = useMagicKeys({
    passive: false,
    onEventFired(e) {
        // TODO: docs say to use with caution. why?
        if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') {
            e.preventDefault()
            open.value = true;
            setTimeout(() => searchInput.value.focus(), 100) // lmao fuck off
        }
    },
});

const index = ref(-1);

// whenever(up, () => {
//     if (index.value > 0) index.value--;
// });
//
// whenever(down, () => {
//     if (index.value < searches.value[lastQuery.value].results[0].hits.length - 1) index.value++;
// });

whenever(escape, () => {
    open.value = false;
});

const open = ref(false);

const results = computed(() => {
    return searches.value[lastQuery.value]?.results.map(r => r.totalHits).reduce((p, a) => p + a, 0) ?? [];
})
</script>
<template>
    <div id="globalSearchBar">
        <div @click="open = !open; nextTick(() => searchInput.focus())">
            <Icon scale="size-5" size="20" name="magnifying-glass"/>
        </div>
        <div v-show="open" @click="open = false" class="x items-center justify-end px-4 md:hidden absolute right-0 top-0 bg-ui-900 h-16 w-1/3">
            <Icon scale="size-6" size="20" name="x-mark"/>
        </div>
        <div v-show="open" @click="open = false" class="y cursor-pointer items-center bg-ui-950 md:bg-black/50 absolute inset-0 mt-[4.5rem] md:mt-[4.5rem] md:p-2 z-30">
            <div class="y md:space-y-2 cursor-auto w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-full">
                <div @click.stop class="flex items-center px-3 border-0 md:border border-ui-700 space-x-3 md:shadow-xl rounded-lg md:bg-ui-950">
                    <Icon scale="size-6" class="shrink-0 text-ui-500" size="24" name="magnifying-glass"/>
                    <div v-if="false" class="bg-ui-900 px-2 py-1 border border-ui-700 rounded-lg text-sm uppercase">Level</div>
                    <input ref="searchInput" placeholder="Search..." v-model="newQuery" type="text" class="w-full border-b border-ui-700 md:border-b-0 truncate shrink text-xl pl-0 py-2 border-0 focus-visible:ring-0 bg-transparent placeholder-ui-500"/>
                    <span class="text-ui-600 text-sm px-2 py-1 whitespace-nowrap" v-if="results > 0">{{ results }} results in {{ Math.max(...searches[lastQuery].results.map(r => r.processingTimeMs)) }}ms</span>
                </div>
                <div @click.stop v-if="false" class="y space-y-2 pane">
                    <div class="x space-x-2 items-center">
                        <div class="px-2 py-1 rounded-lg bg-red-500/25 text-white font-bold">type: User</div>
                        <span>Search for a user</span>
                    </div>
                </div>
                <div @click.stop class="y space-y-2 border-0 md:border border-ui-700 md:bg-ui-950 md:rounded-md overflow-y-auto" v-if="searches[lastQuery]">
                    <p v-if="results === 0" class="text-center px-2 py-1 text-ui-500">No Results</p>
                    <div class="flex flex-col md:flex-row mt-2" v-if="results > 0">
                        <div class="flex flex-col gap-2 shrink-0" :class="{'md:w-1/2': searches[lastQuery].results[0].hits.length > 0}" v-if="searches[lastQuery].results[0].hits.length > 0">
                            <span class="text-xs text-ui-500 font-bold uppercase px-2">Levels</span>
                            <LevelSearchResult v-for="(hit, i) in searches[lastQuery].results[0].hits" :level="hit" :link="true" class="hover:bg-ui-900"/>
                        </div>
                        <div class="flex flex-col gap-2 grow" v-if="searches[lastQuery].results[1].hits.length > 0">
                            <span class="text-xs text-ui-500 font-bold uppercase px-2">Users</span>
                            <Link :href="route('users.show', hit.id)" class="flex gap-2 hover:bg-ui-900 px-2 py-1" v-for="hit in searches[lastQuery].results[1].hits">
                                <Icon name="user-circle" scale="size-8" class="p-0.5 bg-ui-700 text-ui-500 rounded-full"/>
                                <Username :card="false" :href="false" :key="hit.id" :user="hit"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
