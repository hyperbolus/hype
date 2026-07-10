import {MeiliSearch} from "meilisearch";
import {ref, watch} from "vue";

const SEARCH_HOST = 'https://search.gdps.io';
const SEARCH_TOKEN = 'fade7e646417e810b3dbe8ed2458df226059cd6d8986f534b10a2df3d6133a2e';
const DEFAULT_INDEX = 'hype_gdf_levels';
const DEFAULT_HITS = 15;
const DEFAULT_ATTRIBUTES = ['name'];

export function useSearch(index = DEFAULT_INDEX) {
    const client = new MeiliSearch({host: SEARCH_HOST, apiKey: SEARCH_TOKEN});

    let returnArray = typeof index === 'object'; // TODO consider object request

    // you can provide just the index string and use the defaults
    if (typeof index === 'string') index = [index];

    // index should be an array or dict at this point
    if (typeof index !== 'object') throw new Error('Invalid index provided (type)');

    // index string 'hype_gdf_levels'
    // index {string -> attr} {'hype_gdf_levels': 'name'}
    // index array [string] ['hype_gdf_levels', 'hype_gdf_levels']
    // index array [{string -> attr}]

    const results = ref([]);
    const query = ref('');
    const hitCount = ref('');
    const queryTime = ref('');

    const cache = {};

    const searches = ref({});

    const search = async () => {
        // Check if query has already been searched, if so then it's been cached
        if (!cache.hasOwnProperty(query.value)) {
            let queries = [];

            for (const key in index) {
                if (typeof key === 'string')
                    queries.push({
                        indexUid: 'hype_gdf_levels',
                        q: query.value,
                        hitsPerPage: DEFAULT_HITS,
                        attributesToSearchOn: DEFAULT_ATTRIBUTES,
                    });
            }

            cache[query.value] = await client.multiSearch({queries});
        }

        // At this point we can grab the results from the searches cache
        let res = cache[query.value]?.results ?? [];

        // Total the number of hits for each query
        hitCount.value = res.map(r => r.totalHits).reduce((p, a) => p + a, 0);

        // Get the longest processing time in ms of each of this search's queries
        queryTime.value = Math.max(...res.map(r => r.processingTimeMs));

        results.value = [];

        for (const result in res) results.value[result] = res[result].hits;

        // if queries only one index return result instead of array of results
        if (!returnArray) results.value = results.value[0] ?? [];

        searches.value = Object.keys(cache);
    }

    // Attempt search when query changes
    watch(query, search);

    return {
        query,
        results,
        hitCount,
        queryTime,
        searches,
        search,
    };
}
