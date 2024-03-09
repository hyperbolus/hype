<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import prettyBytes from "pretty-bytes";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import {computed, ref, toRaw} from "vue";

const props = defineProps({
    library: Object
})

// props.library.tags.sort((a, b) => {
//     if ( a.name < b.name ) return -1;
//     if ( a.name > b.name ) return 1;
//     return 0;
// })

const toHHMMSS = (n) => {
    n = n|0;
    let hours   = Math.floor(n / 3600);
    let minutes = Math.floor((n - (hours * 3600)) / 60);
    let seconds = n - (hours * 3600) - (minutes * 60);

    if (hours   < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ':' + minutes + ':' + seconds;
}

const filterTags = ref([]);

const filteredItems = computed(() => {

    let list = {};

    let i = 0;
    for (let song in props.library.songs) {
        if (i >= pageFrom.value && i <= pageTo.value) {
            if (filterTags.value.length === 0) list[song] = props.library.songs[song];
            if (filterTags.value.every(t => props.library.songs[song].tags.includes(t))) list[song] = props.library.songs[song];
        }
        i++;
    }

    return list;
});

const pageFrom = ref(0);
const pageTo = ref(24);
</script>
<template>
    <app-layout>
        <div class="y space-y-2 pane h-fit w-1/3">
            <h2 class="font-bold text-xl">Search</h2>
            <Input placeholder="Title"/>
            <Input placeholder="Artist"/>
            <div class="x items-center space-x-2">
                <select class="bg-ui-900 rounded-md border-ui-700 py-1">
                    <option>&lt;</option>
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
            <h1 class="text-4xl font-bold">Song Library</h1>
            <span>Version {{ library.version }}</span>
            <div class="x space-x-2 justify-between">
                <button @click="pageTo -= 25; pageFrom -= 25;" class="rounded border border-ui-700 bg-ui-900 px-3 py-0.5">Prev</button>
                <span>{{pageFrom}}/{{pageTo}}</span>
                <button @click="pageTo += 25; pageFrom += 25;" class="rounded border border-ui-700 bg-ui-900 px-3 py-0.5">Next</button>
            </div>
            <div class="y space-y-2">
                <div v-for="(song, id) in filteredItems" class="x items-center justify-between pane">
                    <div class="y">
                        <span class="font-bold text-2xl">{{ song.name }}</span>
                        <span>{{ library.artists[song.artist].name }}</span>
                        <div class="!hidden x space-x-2 items-center mt-1">
                            <span class="rounded-md bg-ui-800 px-2 py-0.5">Play</span>
                        </div>
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
