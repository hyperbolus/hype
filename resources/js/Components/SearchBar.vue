<script setup>
import {ref, watch} from 'vue'
import { MeiliSearch } from 'meilisearch'
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'

const focused = ref(true);

const client = new MeiliSearch({
    host: 'https://search.gdps.io',
    apiKey: 'Ywqrxd0V620a8702732c96928505a5689f8e7d117ad420bec4f765761470f909f9eaf060',
})
const index = client.index('levels_index')

const newQuery = ref(null);
const lastQuery = ref(null);
const searches = ref({});

watch(newQuery, async () => {
    if (!searches.value.hasOwnProperty(newQuery.value)) {
        searches.value[newQuery.value] = await index.search(newQuery.value);
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

</script>
<template>
    <div id="globalSearchBar" @focusin="handleFocus" class="x h-fit relative items-center rounded transition-colors bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-200">
        <input placeholder="Search Levels..." v-model="newQuery" type="text" class="pl-2 py-2 border-none focus-visible:ring-0 bg-transparent dark:placeholder-neutral-500"/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <!-- Changing this to v-show breaks because lastQuery (null) is undefined on searches cache -->
        <div v-if="focused && searches[lastQuery]" class="absolute box shadow-xl top-12 min-w-full">
            <div v-show="searches[lastQuery].hits.length === 0">No results</div>
            <div v-for="(hit, index) in searches[lastQuery].hits" :key="index" class="hover:opacity-50">
                <Link :href="route('levels.show', hit.level_id)">{{ hit.name }}</Link>
            </div>
        </div>
    </div>
</template>
