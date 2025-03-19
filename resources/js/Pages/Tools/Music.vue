<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import prettyBytes from "pretty-bytes";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import {computed, ref} from "vue";
import {toHHMMSS} from "@/util.js";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    library: Object
})

// props.library.tags.sort((a, b) => {
//     if ( a.name < b.name ) return -1;
//     if ( a.name > b.name ) return 1;
//     return 0;
// })

const filterTags = ref([]);

const filteredItems = computed(() => {

    let list = {};
    let out = {};

    let i = 0;
    for (let song in props.library.songs) {
        if (filterTags.value.length === 0) {
            list[song] = props.library.songs[song];
        } else if (filterTags.value.every(t => props.library.songs[song].tags.includes(t))) {
            list[song] = props.library.songs[song];
        }
        i++;
    }

    i = 0;
    for (let song in props.library.songs) {
        if (i >= pageFrom.value && i <= pageTo.value) out[song] = props.library.songs[song];
        i++;
    }

    return out;
});

const pageFrom = ref(0);
const pageTo = ref(24);
</script>
<template>
    <app-layout>
        <div class="!hidden y space-y-2 pane h-fit w-1/3">
            <h2 class="font-bold text-xl">Search</h2>
            <Input placeholder="Title"/>
            <Input placeholder="Artist"/>
            <div class="x items-center space-x-2">
                <select class="bg-ui-900 rounded-md border-ui-700 py-1">
                    <option>Any Length</option>
                    <option>Greater Than</option>
                    <option>Less Than</option>
                </select>
                <Input placeholder="60 seconds"/>
            </div>
            <details>
                <summary>Filter Tags</summary>
                <div class="flex flex-wrap gap-2">
                    <button v-for="(tag, id) in library.tags" @click="filterTags.includes(id|0) ? filterTags.splice(filterTags.indexOf(id|0), 1) : filterTags.push(id|0)" class="rounded-md bg-ui-800 px-2 py-0.5 text-sm" :class="{'text-ui-500 bg-ui-950': !filterTags.includes(id|0)}">{{ tag.name }}</button>
                </div>
            </details>
        </div>
        <div class="y space-y-2 grow">
            <div class="x justify-between">
                <h1 class="text-4xl font-bold">Song Library</h1>
                <span class="pane">Version {{ library.version }}</span>
            </div>
            <div class="x space-x-2 justify-between">
                <button :disabled="pageFrom === 0" @click="pageTo -= 25; pageFrom -= 25;" class="rounded border border-ui-700 bg-ui-900 px-3 py-0.5" :class="{'opacity-0': pageFrom === 0}">Prev</button>
                <span>{{ pageFrom }} to {{ pageTo }} of {{ Object.keys(props.library.songs).length }}</span>
                <button :disabled="pageTo === Object.keys(props.library.songs).length" @click="pageTo += 25; pageFrom += 25;" class="rounded border border-ui-700 bg-ui-900 px-3 py-0.5">Next</button>
            </div>
            <div class="y space-y-2">
                <div v-for="(song, id) in filteredItems" class="x space-x-4 items-center justify-between pane">
                    <div v-if="false" class="rounded-full border border-ui-700 bg-ui-950 p-4">
                        <Icon class="w-6" name="play"/>
                    </div>
                    <div class="y grow">
                        <span class="font-bold text-2xl">{{ song.name }}</span>
                        <span>{{ library.artists[song.artist].name }}</span>
                    </div>
                    <div class="y items-end justify-start h-full">
                        <span class="text-sm font-mono text-ui-600"><Tooltip class="inline-flex" :message="song.bytes" position="left">{{ prettyBytes(song.bytes) }}</Tooltip> &bull; {{ id }}</span>
                        <span>{{ toHHMMSS(song.seconds) }}</span>
                        <div class="x space-x-2 items-center mt-1">
                            <Tooltip v-for="(tag, id) in song.tags" :message="`Tag ID ${tag}`" class="px-2 py-0.5 text-sm bg-ui-800 rounded-md">{{ library.tags[tag].name }}</Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
