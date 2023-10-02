<script setup>
import {ref, watch} from 'vue'
import { MeiliSearch } from 'meilisearch'
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import {face} from "@/util.js";
import Username from "@/Components/Username.vue";

const focused = ref(true);

const client = new MeiliSearch({
    host: 'https://search.gdps.io',
    apiKey: 'fade7e646417e810b3dbe8ed2458df226059cd6d8986f534b10a2df3d6133a2e',
})

const newQuery = ref(null);
const lastQuery = ref(null);
const searches = ref({});

watch(newQuery, async () => {
    if (!searches.value.hasOwnProperty(newQuery.value)) {
        searches.value[newQuery.value] = await client.multiSearch({
            queries: [
                {
                    indexUid: 'hype_gdf_levels',
                    q: newQuery.value,
                    hitsPerPage: 5,
                    attributesToSearchOn: ['name']
                },
                {
                    indexUid: 'hype_gdf_users',
                    q: newQuery.value,
                    hitsPerPage: 10,
                    attributesToSearchOn: ['name']
                },
            ]
        });
    }
    lastQuery.value = newQuery.value;
})

const focusEvent = (e) => {
    if (!document.getElementById('globalSearchBar').contains(e.target)) {
        focused.value = false;
        document.removeEventListener('mousedown', focusEvent)
    }
};
const handleFocus = () => {
    focused.value = true;
    document.addEventListener('mousedown', focusEvent);
}

const format = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
});

const tiny = (n) => {
    return format.format(n);
}
</script>
<template>
    <div id="globalSearchBar" @focusin="handleFocus" class="x h-fit relative items-center rounded-lg bg-ui-800">
        <input placeholder="Search..." v-model="newQuery" type="text" class="pl-3 w-full truncate shrink text-sm py-1.5 border-none focus-visible:ring-0 bg-transparent placeholder-ui-500"/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shrink-0 w-4 h-4 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <!-- Changing this to v-show breaks because lastQuery (null) is undefined on searches cache -->
        <div v-if="focused && searches[lastQuery]" class="absolute border border-ui-700 bg-ui-900 rounded-md py-1 space-y-2 shadow-xl top-12 z-30 min-w-full">
            <div class="px-2" v-if="searches[lastQuery].results[0].hits.length === 0 && searches[lastQuery].results[1].hits.length === 0">No results</div>
            <div class="px-2 text-sm text-ui-500" v-else>{{ searches[lastQuery].results[0].totalHits + searches[lastQuery].results[1].totalHits }} hits in {{ Math.max(searches[lastQuery].results[0].processingTimeMs, searches[lastQuery].results[1].processingTimeMs) }}ms</div>
            <div class="y px-2 !mt-0 py-1 space-y-1" v-if="searches[lastQuery].results[0].hits.length > 0">
                <span class="text-xs text-ui-500 font-bold uppercase">Levels</span>
                <Link v-for="hit in searches[lastQuery].results[0].hits" :href="route('levels.show', hit.id)" class="x space-x-2 items-center">
                    <img class="w-10" alt="Difficulty" :src="face(hit)"/>
                    <div class="y leading-tight">
                        <div>{{ hit.name }}</div>
                        <div class="text-xs text-ui-500">{{ hit.creator }}</div>
                        <div class="text-xs text-ui-400 x items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                            </svg>
                            <div class="mr-4">{{ tiny(hit.downloads) }}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3" :class="{'rotate-180': hit.likes < 0}">
                                <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                            </svg>
                            <div>{{ tiny(hit.likes) }}</div>
                        </div>
                    </div>
                </Link>
            </div>
            <div class="y px-2" v-if="searches[lastQuery].results[1].hits.length > 0">
                <span class="text-xs text-ui-500 font-bold uppercase">Users</span>
                <Username v-for="hit in searches[lastQuery].results[1].hits" :user="hit"/>
            </div>
        </div>
    </div>
</template>
