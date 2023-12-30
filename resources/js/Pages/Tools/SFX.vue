<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import prettyBytes from "pretty-bytes";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import Icon from "@/Components/Icon.vue";
import Lightbox from "@/Components/Lightbox.vue";
import {useMediaQuery} from "@vueuse/core";

const props = defineProps({
    library: Object
})

const currentFile = ref(null);
const path = ref([1]);
const columns = ref([0, 1, 2]);

const md = useMediaQuery('(min-width: 768px)')
const lg = useMediaQuery('(min-width: 1024px)')

watch(md, (value) => {
    columns.value = value ? [0, 1] : [0]
})

watch(lg, (value) => {
    columns.value = value ? [0, 1, 2] : [0, 1]
})

const panels = computed(() => {
    let lists = [
        {folders: {}, files: {}},
        {folders: {}, files: {}},
        {folders: {}, files: {}},
    ];

    let bits = path.value.slice(-1 * columns.value.length)
    for (let list in lists) {
        if (list > bits.length - 1) continue;

        for (let folder in props.library.folders) {
            if (bits[list] === props.library.folders[folder].parent) {
                lists[list].folders[folder] = props.library.folders[folder];
            }
        }

        for (let file in props.library.files) {
            if (bits[list] === props.library.files[file].parent) {
                lists[list].files[file] = props.library.files[file];
            }
        }
    }

    return lists;
});

const pathFocus = ref(false);
const pathInput = ref(null);

const audio = ref(null);
const audioProgress = ref(0);
const audioLoaded = ref(false);

watch(currentFile, (value) => {
    const url = new URL(window.location.href);
    if (value) {
        url.searchParams.set('file', value);
    } else {
        url.searchParams.delete('file');
    }
    window.history.replaceState(null, '', url.toString());

    if (audio.value && value) {
        audioLoaded.value = false;
        audio.value.src = `https://geometrydashfiles.b-cdn.net/sfx/s${value}.ogg`;
    }
})

const selectFolder = (id) => {
    let _ = [];
    while (id !== 1) {
        _.push(id);
        id = props.library.folders[id].parent;
    }
    _.push(1);
    path.value = _.reverse();
}

const searchResults = ref([]);
const highlightedFolders = ref([]);
const searchQuery = ref('');

watch(searchQuery, (value) => {
    let results = [];
    let folders = [];
    for (let file in props.library.files) {
        if (props.library.files[file].name.toLowerCase().includes(value.toLowerCase())) {
            results.push(file|0);

            let current = props.library.files[file].parent;
            while (current !== 1) {
                folders.push(current|0);
                current = props.library.folders[current].parent
            }
        }
    }

    searchResults.value = results;
    highlightedFolders.value = folders;
})

watch(path, (value) => {
    if (currentFile.value === null) return;
    if (path.value[path.value.length - 1] !== props.library.files[currentFile.value].parent) currentFile.value = null;
})

onBeforeMount(() => {
    const params = new URLSearchParams(window.location.search);
    let _path = params.get('path');
    let file = params.get('file');
    if (_path) {
        _path = _path.split('/')
        _path.unshift(); // Might not be needed

        // while (_path.join('/') !== path.value.join()) {
        //
        // }

        let last = _path[_path.length - 1];
        for (let folder in props.library.folders) {
            if (props.library.folders[folder].name === last) {
                console.log(3)
                selectFolder(folder);
            }
        }
    }
    if (file && props.library.files.hasOwnProperty(file)) {
        file = file|0;
        currentFile.value = file;
        selectFolder(props.library.files[file].parent)
    }
})

onMounted(() => {
    if (currentFile.value && audio.value) {
        audioLoaded.value = false;
        audio.value.src = `https://geometrydashfiles.b-cdn.net/sfx/s${currentFile.value}.ogg`;
    }
})
</script>
<template>
    <app-layout title="SFX Browser">
        <audio @timeupdate="e => audioProgress = e.target.currentTime" @canplay="audioLoaded = true;" ref="audio" class="hidden"></audio>
        <div class="y rounded-lg border border-ui-700 w-full bg-ui-900">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2 p-2 rounded-t-lg">
                <div class="x space-x-2">
                    <div @click="path = [1]" class="cursor-pointer border border-ui-700 rounded bg-ui-800 shadow text-sm p-1">
                        <Icon class="w-4" name="home"/>
                    </div>
                    <div @click="path.length === 1 ? void(0) : path.pop()" class="cursor-pointer border border-ui-700 rounded bg-ui-800 shadow text-sm p-1">
                        <Icon class="w-4" name="arrow-up"/>
                    </div>
                    <div v-if="false" @click="path.length === 1 ? void(0) : path.pop()" class="cursor-pointer border border-ui-700 rounded bg-ui-800 shadow text-sm p-1">
                        <Icon class="w-4" name="arrow-uturn-left"/>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 grow w-full">
                    <div @click="pathFocus = true; pathInput.focus()" class="x items-center grow rounded-md bg-ui-950 text-sm px-1 py-1 w-full">
                        <button @click="path = [1]" class="rounded px-1 hover:bg-ui-900">Root</button>
                        <template v-for="(bit, key) in path.slice(1, path.length)">
                            <button class="rounded py-0.5 px-1 hover:bg-ui-900">
                                <Icon class="w-4" name="chevron-right"/>
                            </button>
                            <button @click="path = path.slice(0, path.indexOf(bit) + 1)" class="rounded px-1 hover:bg-ui-900">{{ typeof library.folders[bit] === 'undefined' ? bit : library.folders[bit].name}}</button>
                        </template>
                        <input ref="pathInput" @focusout="pathFocus = false" type="text" placeholder="Path" class="!hidden shadow border-0 grow rounded-md bg-ui-950 text-sm py-0.5 px-2 w-full"/>
                    </div>
                    <input v-model="searchQuery" type="text" placeholder="🔍 Search" class="shadow border-0 grow rounded-md bg-ui-950 text-sm py-0.5 px-2"/>
                </div>
                <div class="x space-x-2">
                    <div v-if="false" class="x divide-x divide-ui-700 border border-ui-700 rounded bg-ui-800 shadow text-sm">
                        <div class="p-1 rounded-l bg-ui-900">
                            <Icon class="w-4" name="table-cells" type="solid" size="20"/>
                        </div>
                        <div class="p-1">
                            <Icon class="w-4" name="queue-list" type="solid" size="20"/>
                        </div>
                    </div>
                    <div v-if="false" class="x space-x-1 items-center border border-ui-700 rounded bg-ui-800 shadow text-sm p-1">
                        <Icon class="w-4" name="funnel" type="solid" size="20"/>
                        <Icon class="w-4" name="chevron-down" type="solid" size="20"/>
                    </div>
                    <Lightbox>
                        <span class="border border-ui-700 rounded bg-ui-800 shadow text-sm px-1 py-0.5">Credits</span>
                        <template #content>
                            <div class="y space-y-2 items-center">
                                <div @click.stop class="rounded-lg y space-y-2 cursor-auto bg-ui-900 text-ui-200 p-4 shadow-xl w-full md:w-[32rem] lg:w-[48rem]">
                                    <h2 class="font-bold text-2xl">SFX Library Credits</h2>
                                    <p>This SFX browser is provided as a utility to the community.</p>
                                    <p>Hyperbolus neither stores or redistributes any copyrighted content on it's servers. Only the metadata provided by Geometry Dash. File playback is streamed directly from Geometry Dash's official CDN client-side.</p>
                                    <p>These sound effects are owned by the following parties and are licensed (I hope) to Robtop Games AB for use in Geometry Dash.</p>
                                    <a target="_blank" v-for="credit in library.credits" :href="credit.website" class="x items-center space-x-1 rounded-md bg-ui-800 px-2 py-0.5">
                                        <span>{{ credit.name }}</span>
                                        <Icon class="w-4" name="arrow-top-right-on-square"/>
                                    </a>
                                    <p class="text-center text-sm text-ui-600">SFX Library Version {{ library.version }} &bull; {{ Object.keys(library.files).length }} Files</p>
                                </div>
                                <div class="px-2 py-1 rounded border border-ui-700 text-ui-200 bg-ui-900">Close</div>
                            </div>
                        </template>
                    </Lightbox>
                </div>
            </div>
            <div class="gap-0 grid grow" :style="`grid-template-columns: repeat(${columns.length}, minmax(0, 1fr));`">
                <div v-for="i in columns" class="y bg-ui-950 border-t border-ui-700 first:rounded-bl-lg last:rounded-br-lg h-[calc(100vh-19rem)] overflow-y-auto">
                    <template v-if="i === columns.length - 1">
                        <div v-if="currentFile" class="y items-center space-y-4 p-8" :class="{'border-l border-ui-700': columns.length === 2}">
                            <div class="rounded-full bg-ui-800 p-8">
                                <Icon class="w-16" name="speaker-wave" type="solid" size="24"/>
                            </div>
                            <div class="y items-center">
                                <span class="text-center font-bold text-2xl">{{ library.files[currentFile].name }}</span>
                                <div class="y items-end justify-start h-full">
                                    <span class="text-sm font-mono text-ui-500"><Tooltip class="inline-flex" :message="library.files[currentFile].bytes" position="left">{{ prettyBytes(library.files[currentFile].bytes) }}</Tooltip> &bull; {{ currentFile }} &bull; {{ (library.files[currentFile].milliseconds / 100).toFixed(2) }}s</span>
                                </div>
                            </div>
                            <!-- <iframe src="https://geometrydashfiles.b-cdn.net/sfx/s2962.ogg"></iframe> -->
                            <div v-if="audioLoaded" class="bg-ui-800 rounded-full w-full">
                                <div class="p-0.5 bg-ui-300 rounded-full transition-[width]" :style="`width: ${audioProgress/audio.duration * 100}%;`"></div>
                            </div>
                            <div class="x space-x-2 justify-center" v-if="audioLoaded">
                                <button @click="audio.play()" class="rounded bg-ui-800 border border-ui-700 px-2 py-1">
                                    <Icon class="w-5" name="play"/>
                                </button>
                                <Tooltip message="Right Click &#10141; Save Link As">
                                    <a target="_blank" :href="`https://geometrydashfiles.b-cdn.net/sfx/s${currentFile}.ogg`" class="block rounded bg-ui-800 border border-ui-700 px-2 py-1" :download="library.files[currentFile].name">
                                        <Icon class="w-5" name="document-arrow-down"/>
                                    </a>
                                </Tooltip>
                            </div>
                            <p v-else>Loading...</p>
                        </div>
                        <p v-else class="p-2 text-center" :class="{'border-l border-ui-700': columns.length === 2}">Select a file to play</p>
                        <div class="border-t border-ui-700 bg-ui-900 w-full"></div>
                    </template>
                    <div class="y" :class="{'border-x border-ui-700': i === 1}">
                        <div v-for="(file, id) in panels[i].folders" @click="selectFolder(id|0)" class="x px-2 py-0.5 items-center justify-between cursor-pointer" :class="{'bg-blue-600 text-white': path.includes(id|0), 'text-ui-600 [&>*:nth-child(even)]:hidden cursor-normal': (searchQuery !== '' && !highlightedFolders.includes(id|0))}">
                            <div class="x items-center space-x-2">
                                <Icon v-if="path.includes(id|0)" class="w-4" name="folder-open" type="solid" size="20"/>
                                <Icon v-else class="w-4" name="folder" type="solid" size="20"/>
                                <span class="text-sm">{{ file.name }}</span>
                            </div>
                            <Icon class="w-4" name="chevron-right" type="solid" size="20"/>
                        </div>
                    </div>
                    <div v-if="Object.keys(panels[i].folders).length > 0 && Object.keys(panels[i].files).length > 0" class="border-t border-ui-700 bg-ui-900"></div>
                    <div class="y grow border-ui-700"  :class="{'border-x': i === 1, 'border-r-0': columns.length === 2}">
                        <div v-for="(song, id) in panels[i].files" class="y cursor-pointer text-sm px-2 py-1" @click="currentFile = id|0" :class="{'bg-blue-600 text-white': (id|0) === currentFile}">
                            <div class="x items-center justify-between" :class="{'text-ui-600': searchQuery !== '' && !searchResults.includes(id|0)}">
                                <span>{{ song.name }}</span>
                                <span>{{ (song.milliseconds / 100).toFixed(2) }}s</span>
                            </div>
                            <span class="text-sm font-mono text-ui-600" :class="{'!text-white': (id|0) === currentFile}"><Tooltip class="inline-flex" :message="song.bytes" position="left">{{ prettyBytes(song.bytes) }}</Tooltip> &bull; ID: {{ id }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<style>
/*a[target="_blank"]::after {
    filter: invert(100%);
    content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
    margin: 0 3px 0 5px;
}*/
</style>
