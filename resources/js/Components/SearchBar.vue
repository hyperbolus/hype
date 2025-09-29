<script setup>
import {computed, nextTick, ref, watch} from 'vue'
import {MeiliSearch} from 'meilisearch'
import {Link} from '@inertiajs/vue3'
import route from 'ziggy-js'
import {face} from "@/util.js";
import Username from "@/Components/Username.vue";
import Icon from "@/Components/Icon.vue";
import {useMagicKeys, whenever} from "@vueuse/core";

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

/** @type {Intl.NumberFormat} */
const format = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
});

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

const tiny = n => format.format(n);

const results = computed(() => {
    return searches.value[lastQuery.value].results.map(r => r.totalHits).reduce((p, a) => p + a, 0)
})
</script>
<template>
    <div id="globalSearchBar">
        <div @click="open = !open; nextTick(() => searchInput.focus())">
            <Icon class="w-5" size="20" name="magnifying-glass"/>
        </div>
        <div v-show="open" @click="open = false" class="x items-center justify-end px-4 md:hidden absolute right-0 top-0 bg-ui-900 h-16 w-1/3">
            <Icon class="w-6" size="20" name="x-mark"/>
        </div>
        <div v-show="open" @click="open = false" class="y cursor-pointer items-center bg-ui-950 md:bg-black/50 absolute inset-0 mt-16 md:mt-[5.5rem] md:p-4 z-30">
            <div class="y md:space-y-4 cursor-auto w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-full">
                <div @click.stop class="flex items-center px-3 border-0 md:border border-ui-700 space-x-3 md:shadow-xl rounded-md md:bg-ui-950">
                    <Icon class="w-6 shrink-0" size="24" name="magnifying-glass"/>
                    <div v-if="false" class="bg-ui-900 px-2 py-1 border border-ui-700 rounded-md text-sm uppercase">Level</div>
                    <input ref="searchInput" placeholder="Search..." v-model="newQuery" type="text" class="w-full border-b border-ui-700 md:border-b-0 truncate shrink text-xl pl-0 py-2 border-0 focus-visible:ring-0 bg-transparent placeholder-ui-500"/>
                </div>
                <div @click.stop v-if="false" class="y space-y-2 pane">
                    <div class="x space-x-2 items-center">
                        <div class="px-2 py-1 rounded-md bg-red-500/25 text-white font-bold">type: User</div>
                        <span>Search for a user</span>
                    </div>
                </div>
                <div @click.stop class="y space-y-2 border-0 md:border border-ui-700 md:bg-ui-900 md:rounded-md overflow-y-auto" v-if="searches[lastQuery]">
                    <div class="px-2" v-if="results === 0">No results</div>
                    <div class="px-2 text-sm py-1" v-else>Found {{ results }} results in {{ Math.max(...searches[lastQuery].results.map(r => r.processingTimeMs)) }}ms</div>
                    <div class="y !mt-0 py-1 space-y-1" v-if="searches[lastQuery].results[0].hits.length > 0">
                        <span class="text-xs text-ui-500 font-bold uppercase px-2">Levels</span>
                        <Link v-for="(hit, i) in searches[lastQuery].results[0].hits" :class="{'bg-ui-950': index === i}" :key="i" :href="route('levels.show', hit.id)"
                              class="x space-x-2 items-center px-2 py-1">
                            <img class="w-12" alt="Difficulty" :src="face(hit)"/>
                            <div class="y leading-tight">
                                <h1 class="font-bold">{{ hit.name }}</h1>
                                <h2 class="text-xs text-ui-500">{{ hit.creator }}</h2>
                                <div class="text-xs text-ui-400 x items-center space-x-1">
                                    <Icon class="w-3" name="eye"/>
                                    <div class="mr-4">{{ tiny(hit.downloads) }}</div>
                                    <Icon class="w-3" name="hand-thumb-up" :class="{'rotate-180': hit.likes < 0}"/>
                                    <div>{{ tiny(hit.likes) }}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="y px-2" v-if="searches[lastQuery].results[1].hits.length > 0">
                        <span class="text-xs text-ui-500 font-bold uppercase">Users</span>
                        <Username v-for="hit in searches[lastQuery].results[1].hits" :card="false" :key="hit.id" :user="hit"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
