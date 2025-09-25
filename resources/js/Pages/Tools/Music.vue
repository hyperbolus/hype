<script setup>
import prettyBytes from "pretty-bytes";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import {getGame, toHHMMSS} from "@/util.js";
import Icon from "@/Components/Icon.vue";
import ControlBar from "@/Components/ControlBar.vue";
import {Link, Head} from '@inertiajs/vue3'
import route from "ziggy-js";
import {useSettingsStore} from "@/stores/settings.ts";
import {useStatisticsStore} from "@/stores/statistics.ts";
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import {
    useClipboard,
    useMagicKeys,
    useMediaQuery,
    useStorage,
    whenever
} from "@vueuse/core";
import ComboBox from "@/Components/ComboBox.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";

const props = defineProps({ library: String });

const lg = useMediaQuery('(min-width: 1024px)');

const lib = ref({ version: null, artists: [], songs: [], tags: [] });

const getSong = (id) => {
    return lib.value.songs[id];
}

const filters = ref({});

const resetFilters = (open = false) => {
    filters.value = {
        allowlist: {
            artists: [],
            tags: []
        },
        blocklist: {
            artists: [],
            tags: []
        },
        filters: [],
        query: '',
        sortBy: 'id',
        sortDir: 1,
        open: open
    };
}

onBeforeMount(() => {
    config.value.urls.library = props.library + '.json';
    loadLibrary();
    resetFilters();

    useSettingsStore();
    useStatisticsStore();
});

const loadLibrary = async () => {
    let res = await fetch(config.value.urls.library)

    if (!res.ok) return;

    lib.value = await res.json();
    // GD library contains errors, so add this
    lib.value.artists[0] = {
        id: 0,
        name: '-',
        youtube: null,
        website: null
    };

    // Load state from URL after library is loaded
    const params = new URLSearchParams(window.location.search);
    let tab = params.get('tab');
    if (tab && tabs.hasOwnProperty(tab)) openTab(tab)

    let artist = params.get('artist');
    if (artist && lib.value.artists.hasOwnProperty(artist)) {
        openArtist(artist);
        if (!tab) openTab(2);
    }

    let song = params.get('song');
    if (song && lib.value.songs.hasOwnProperty(song)) {
        openSong(song);
        if (!artist) openArtist(lib.value.songs[song].artist);
    }

    // Pre-calculate alphabetical position and store it
    let alphabetical = Object.keys(lib.value.songs);
    alphabetical.sort((a, b) => lib.value.songs[a].name.localeCompare(lib.value.songs[b].name, undefined, { numeric: true }));
    for (let i in alphabetical) lib.value.songs[alphabetical[i]].alphabetical = i;

    libraryLoaded.value = true;
}

const filteredItems = computed(() => {
    let out = [];
    let f = filters.value;

    if (currentPlaylist.value !== null && tab.value === 2) {
        for (let list of config.value.playlists[currentPlaylist.value].songs) {
            out.push({
                id: out.length,
                song: getSong(list.song)
            });
        }
    } else if (currentArtist.value !== 0 && tab.value === 2) {
        for (let song in lib.value.songs) {
            let s = lib.value.songs[song];
            if (currentArtist.value === s.artist || s.additionalArtists.includes(currentArtist.value)) out.push({
                id: out.length,
                song: s
            });
        }
    } else if (filters.value.open) {
        song: for (let song in lib.value.songs) {
            let s = lib.value.songs[song];

            if (f.allowlist.artists.length > 0 && !f.allowlist.artists.some(a => [s.artist, ...s.additionalArtists].includes(a))) continue;
            if (f.blocklist.artists.length > 0 && f.blocklist.artists.some(a => [s.artist, ...s.additionalArtists].includes(a))) continue;
            if (f.allowlist.tags.length > 0 && !f.allowlist.tags.every(t => s.tags.includes(t))) continue;
            if (f.blocklist.tags.length > 0 && f.blocklist.tags.some(t => s.tags.includes(t))) continue;

            for (let filter in f.filters) {
                let ff = f.filters[filter]
                if (ff.key === '') continue;
                switch (ff.compare) {
                    case 1:
                        if (!(s[ff.key] > ff.target)) continue song;
                        break;
                    case -1:
                        if (!(s[ff.key] < ff.target)) continue song;
                        break;
                }
            }

            if (f.query !== '' && !s.name.toLowerCase().includes(f.query.toLowerCase())) continue;

            out.push({
                id: out.length,
                song: s
            });
        }

        out.sort((a, b) => (a.song[f.sortBy] - b.song[f.sortBy]) * f.sortDir)
    } else {
        for (let song in lib.value.songs) out.push({
            id: out.length,
            song: lib.value.songs[song]
        });
    }

    return out;
});

const filteredArtists = computed(() => {
    let out = [];
    for (let artist in lib.value.artists) out.push(lib.value.artists[artist]);
    return out;
});

const song = computed(() => {
    if (!libraryLoaded.value || currentSong.value === 0) return {};

    if (audio.value && currentSong.value && config.value.urls.files) {
        audioLoaded.value = false;
        audio.value.pause();
        audio.value.src = config.value.urls.files.replace('{id}', currentSong.value);
        audio.value.load();
    }

    return currentSong.value ? lib.value.songs[currentSong.value] : {};
});

const highlightedSong = computed(() => {
    return currentHighlightedSong.value ? lib.value.songs[currentHighlightedSong.value] : {};
});

const playlist = computed(() => {
    return currentPlaylist.value !== null ? config.value.playlists[currentPlaylist.value] : {};
});

const artist = computed(() => {
    return currentArtist.value ? lib.value.artists[currentArtist.value] : {};
});

//<editor-fold desc="Audio Element">
const audio = ref(null);
const audioProgress = ref(0);
const audioLoaded = ref(false);
const audioPlaying = ref(false);
const audioVolume = ref(1);
const scrubbing = ref(false);
const scrubPosition = ref(0);

const toggle = () => {
    if (audio.value.paused) {
        if (audioLoaded.value) play();
    } else {
        pause();
    }
}

const canPlay = () => {
    audioLoaded.value = true;
    if (audioPlaying.value) play();
}

const play = () => {
    audio.value.muted = false;
    if (audioLoaded.value) audio.value.play();
    audioPlaying.value = true;

    if (config.value.history.includes(song.value.artist)) {
        config.value.history.splice(config.value.history.indexOf(song.value.artist), 1)
    }
    if (song.value.artist !== 0) config.value.history.push(song.value.artist);
}

const pause = () => {
    audio.value.pause();
    audioPlaying.value = false;
}

const seek = (e) => {
    if (audioLoaded.value) audioProgress.value = audio.value.currentTime = e.target.value;
    scrubbing.value = false
}

const scrub = (e) => {
    scrubbing.value = true;
    scrubPosition.value = e.target.value;
}

const volume = level => audio.value.volume = level;

const updatePosition = (e) => {
    audioProgress.value = e.target.currentTime;
    if (!scrubbing.value) scrubPosition.value = e.target.currentTime;
}
//</editor-fold>

//<editor-fold desc="Searching">
const searchResultsOpen = ref(false);
const searchQuery = ref('');
const searchTags = ref([]);
const searchResults = ref({
    songs: [],
    artists: [],
    songs_count: 0,
    artists_count: 0,
});

const highlight = (needle, haystack) => {
    let frags = haystack.toLowerCase().split(needle.toLowerCase());

    return [
        haystack.substring(0, frags[0].length),
        haystack.substring(frags[0].length, frags[0].length + needle.length),
        haystack.substring(frags[0].length + needle.length, haystack.length),
    ];
}
//</editor-fold>

//<editor-fold desc="Template Refs">
const scrollerSongs = ref(null)
const scrollerArtists = ref(null)
const searchInput = ref(null);
//</editor-fold>

//<editor-fold desc="Navigation">
const libraryLoaded = ref(false);
const tab = ref(0);
const currentHighlightedSong = ref(0);
const currentSong = ref(0);
const currentArtist = ref(0);
const currentPlaylist = ref(null);

const openArtist = (id) => {
    id = id|0
    if (!lib.value.artists.hasOwnProperty(id)) return;
    currentPlaylist.value = null;
    currentArtist.value = id;
    editingPlaylist.value = false;
    tab.value = 2;
    searchResultsOpen.value = false;
    songInfoOpen.value = false;
    if (!config.value.history.includes(id) && id !== 0) config.value.history.push(id);
}

const openTab = (id, force = false) => {
    id = id|0
    if (id >= tabs.length) return;
    searchResultsOpen.value = false;
    songInfoOpen.value = false;

    //todo: idk which to do...
    currentPlaylist.value = null;
    currentArtist.value = 0;
    editingPlaylist.value = false;
    // if ((id === 2 && id === tab.value) || force) {
    //     currentPlaylist.value = null;
    //     currentArtist.value = 0;
    // }

    tab.value = id;
}

const openSong = (id, autoplay = false) => {
    id = id|0
    if (!lib.value.songs.hasOwnProperty(id)) return;
    currentHighlightedSong.value = id;
    if (currentSong.value === id) {
        play();
    } else {
        pause();
        currentSong.value = id;
        searchResultsOpen.value = false;
        if (autoplay) {
            audioPlaying.value = true;
        }
    }
}

const openPlaylist = (id) => {
    id = id|0
    openTab(2);
    currentPlaylist.value = id;
}
//</editor-fold>

const DEFAULT_CONFIG = {
    version: 0,
    urls: {
        library: '',
        files: ''
    },
    history: [],
    likes: [],
    playlists: [{ name: 'Liked Songs', description: 'Your likes will appear here', songs: [] }],
    following: [],
    queue: [],
    devMode: true,
    repeat: 0,
    shuffle: false,
    asideTab: 0,
    oggDisclaimer: false
};

const config = useStorage('tools::music.config', DEFAULT_CONFIG)

const settingsInput = ref({
    urls: {
        library: config.value.urls.library,
        files: config.value.urls.files
    }
});

//<editor-fold desc="Watchers">
watch(filteredItems, _ => scrollerSongs.value?.$el ? (scrollerSongs.value.$el.scrollTop = 0) : void(0))

watch(searchQuery, (value) => {
    searchResults.value.songs = [];
    searchResults.value.artists = [];
    searchResults.value.songs_count = 0;
    searchResults.value.artists_count = 0;
    searchTags.value = [];

    if (searchQuery.value === '') return;

    let i = 0;
    for (let song in lib.value.songs) {
        if (lib.value.songs[song].name.toLowerCase().includes(value.toString().toLowerCase())) {
            if (i++ < 25) searchResults.value.songs.push(song);
            searchResults.value.songs_count++;
        }
    }

    i = 0;
    for (let artist in lib.value.artists) {
        if (lib.value.artists[artist].name.toLowerCase().includes(value.toString().toLowerCase())) {
            if (i++ < 25) searchResults.value.artists.push(artist);
            searchResults.value.artists_count++;
        }
    }
})

watch(currentSong, (value) => {
    const url = new URL(window.location.href);
    value ? url.searchParams.set('song', value) : url.searchParams.delete('song');
    window.history.replaceState(null, '', url.toString());
})

watch(currentArtist, (value) => {
    const url = new URL(window.location.href);
    value ? url.searchParams.set('artist', value) : url.searchParams.delete('artist');
    window.history.replaceState(null, '', url.toString());
})

watch(tab, (value) => {
    const url = new URL(window.location.href);
    value ? url.searchParams.set('tab', value) : url.searchParams.delete('tab');
    window.history.replaceState(null, '', url.toString());
})

watch(() => config.value.urls.files, () => {
    if (!config.value.oggDisclaimer && document.createElement('audio').canPlayType("audio/ogg") !== 'probably') {
        alert('Your device may not support OGG playback. For best experience, view this page on desktop running a modern browser.');
        config.value.oggDisclaimer = true;
    }
})
//</editor-fold>

const {down, up, escape, space} = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') {
            e.preventDefault();
            setTimeout(() => {
                searchInput.value.focus();
                searchResultsOpen.value = true;
            }, 100)
        }
    },
});

whenever(escape, _ => {
    searchResultsOpen.value = contextMenu.value.open = false
    searchInput.value.blur();
});

whenever(space, _ => toggle());

const tabs = [
    { title: 'Home', icon: 'home', color: 'from-blue-500', gradient: 'to-blue-700' },
    { title: 'Artists', icon: 'users', color: 'from-fuchsia-500', gradient: 'to-fuchsia-700' },
    { title: 'Music', icon: 'musical-note', color: 'from-rose-500', gradient: 'to-rose-700' },
    { title: 'Settings', icon: 'cog', color: 'from-zinc-500', gradient: 'to-zinc-700' }
];

const base = ref(null);
const contextElement = ref(null);
const contextMenu = ref({
    x: 0,
    y: 0,
    open: false,
    subOpen: true,
    songFixed: 0,
    indexFixed: 0,
});

const openContextMenu = (e, id) => {
    contextMenu.value.songFixed = filteredItems.value[id].song.id;
    contextMenu.value.indexFixed = id;

    let el = contextElement.value;
    contextMenu.value.x = e.pageX + el.clientWidth > base.value.clientWidth ? e.pageX - el.clientWidth : e.pageX|0;
    contextMenu.value.y = e.pageY + el.clientHeight > base.value.clientHeight ? e.pageY - el.clientHeight : e.pageY|0;

    contextMenu.value.open = true;
    e.preventDefault();
};

const songInfoOpen = ref(true);

const { copy: toClipboard } = useClipboard({ source: '', legacy: true });

const addToPlaylist = (song, playlist = null) => {
    if (!lib.value.songs.hasOwnProperty(song)) return;

    if (playlist === null) {
        playlist = config.value.playlists.length;
        config.value.playlists.push({
            name: getSong(song).name,
            description: '',
            songs: []
        });
    }

    let list = config.value.playlists[playlist];

    if (playlistContains(playlist, song) && !confirm(`Playlist "${list.name}" already has the song "${getSong(song).name}" in it. Do you want to add it anyways?`)) return;

    list.songs.push({
        id: list.songs.length,
        song: song,
        added: Math.floor(new Date().getTime() / 1000)
    });
}

const removeFromPlaylist = (playlist, index) => {
    config.value.playlists[playlist].songs.splice(index, 1)
}

const playlistContains = (playlist, song) => {
    for (const item of config.value.playlists[playlist].songs) {
        if (item.song === song) return true;
    }

    return false;
}

const editingPlaylist = ref(false);

const getShareableURL = (song) => {
    let url = new URLSearchParams();
    url.set('song', song)
    return `${route('tools.music')}?${url.toString()}`;
}

const deletePlaylist = (i) => {
    i = i|0;
    editingPlaylist.value = false;
    if (!config.value.playlists.hasOwnProperty(i) || i === 0) return;

    config.value.playlists.splice(i, 1);
    if (currentPlaylist.value > config.value.playlists.length - 1) currentPlaylist.value = config.value.playlists.length - 1;
    if (config.value.playlists.length === 0) currentPlaylist.value = null;
}
</script>
<template>
    <div @click="contextMenu.open = false" ref="base" class="y relative items-center text-ui-200 min-h-[100dvh] grow overflow-x-clip" :class="getGame() === 'soundodger' ? 'theme-soundodger' : ''">
        <Head><title>{{ $page.props.__meta_title }}</title></Head>
        <audio @timeupdate="updatePosition" @canplay="canPlay" @ended="audioPlaying = false" ref="audio" class="hidden" :muted="true" :autoplay="false"></audio>
        <!-- Context Menu -->
        <div class="absolute inset-0 z-40 pointer-events-none" :class="{'invisible': !contextMenu.open}">
            <div ref="contextElement" class="y bg-ui-800 rounded-lg fixed w-64 m-2 pointer-events-auto" :style="`top:${contextMenu.y}px;left:${contextMenu.x}px;`">
                <div class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 rounded-t-lg cursor-pointer select-none relative group">
                    <Icon name="plus" class="size-5"/>
                    <span>Add to playlist</span>
                    <div class="bg-ui-800 absolute right-[calc(100%-0.25rem)] bottom-1 rounded-lg w-64 hidden group-hover:block [box-shadow:#000d_5px_5px_10px_-5px;] z-10">
                        <div @click="addToPlaylist(contextMenu.songFixed)" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 cursor-pointer select-none first:rounded-t-lg last:rounded-b-lg">
                            <Icon name="plus" class="size-5"/>
                            <span>New Playlist</span>
                        </div>
                        <div v-for="(list, i) in config.playlists" @click="addToPlaylist(contextMenu.songFixed, i)" class="px-2 py-2 hover:bg-ui-700 cursor-pointer select-none first:rounded-t-lg last:rounded-b-lg truncate" :class="{'hidden': !i}">{{ list.name }}</div>
                    </div>
                </div>
                <div v-if="currentPlaylist !== null" @click="removeFromPlaylist(currentPlaylist, contextMenu.indexFixed)" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 cursor-pointer select-none">
                    <Icon name="minus" class="size-5"/>
                    <span>Remove from this playlist</span>
                </div>
                <div v-if="playlistContains(0, contextMenu.songFixed)" @click="removeFromPlaylist(0, contextMenu.indexFixed)" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 cursor-pointer select-none">
                    <Icon name="heart" class="size-5"/>
                    <span>Remove from likes</span>
                </div>
                <div v-else @click="addToPlaylist(contextMenu.songFixed, 0)" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 cursor-pointer select-none">
                    <Icon name="heart" class="size-5"/>
                    <span>Add to likes</span>
                </div>
                <div class="border-t border-ui-700"></div>
                <div @click="openSong(contextMenu.songFixed)" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 cursor-pointer select-none">
                    <Icon name="information-circle" class="size-5"/>
                    <span>Open song info</span>
                </div>
                <div @click="openArtist(lib.songs[contextMenu.songFixed]?.artist)" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 cursor-pointer select-none">
                    <Icon name="user" class="size-5"/>
                    <span>Open artist page</span>
                </div>
                <div class="border-t border-ui-700"></div>
                <div @click="toClipboard(getShareableURL(contextMenu.songFixed))" class="x items-center space-x-1.5 px-2 py-2 hover:bg-ui-700 rounded-b-lg cursor-pointer select-none">
                    <Icon name="share" class="size-5"/>
                    <span>Copy link to song</span>
                </div>
            </div>
        </div>

        <div class="y bg-ui-1000 w-full grow">
            <!-- Header -->
            <div class="hidden lg:flex items-center justify-between p-2 z-10">
                <div class="w-1/3 px-2">
                    <Link :href="route('home')" class="x items-center space-x-2 w-fit">
                        <Icon name="arrow-left" size="24" class="size-4"/>
                        <span>back to Hyperbolus</span>
                    </Link>
                </div>
                <div class="x justify-center w-1/3 px-2 relative">
                    <label class="x items-center bg-ui-900 rounded-full px-4 py-1 w-full max-w-xl">
                        <Icon name="magnifying-glass" size="24" class="size-6"/>
                        <input ref="searchInput" @click="searchResultsOpen = true" type="text" v-model="searchQuery" class="grow border-none bg-transparent focus-visible:ring-0 placeholder-ui-600" placeholder="Search for anything"/>
                        <Icon @click="searchQuery = ''; searchResultsOpen = false;" name="x-mark" size="24" class="size-6 opacity-0 transition-opacity transition-colors cursor-pointer hover:text-ui-500" :class="{'opacity-100': searchQuery.length > 0}"/>
                    </label>
                </div>
                <div class="x justify-end w-1/3 px-2">
                    <ControlBar class="!w-fit"/>
                </div>
            </div>
            <div class="flex justify-between items-center lg:hidden p-4 z-10">
                <Link :href="route('home')" class="x items-center space-x-2 w-fit">
                    <Icon name="arrow-left" size="24" class="size-4"/>
                    <span>back to Hyperbolus</span>
                </Link>
                <div class="x items-center space-x-4">
                    <Icon v-if="!searchResultsOpen" @click="searchResultsOpen = true" name="magnifying-glass" class="size-5 cursor-pointer"/>
                    <Icon @click="searchResultsOpen = false" v-if="searchResultsOpen" name="x-mark" class="size-6 cursor-pointer"/>
                    <template v-else>
                        <Icon v-if="0" name="x-mark" class="size-6 cursor-pointer"/>
                        <Icon name="bars-3" class="size-6 cursor-pointer"/>
                    </template>
                </div>
            </div>

            <!-- Search Results -->
            <div class="x justify-center absolute bottom-[3.5rem] lg:bottom-0 top-14 lg:top-16 w-full z-20 lg:p-1 pointer-events-none">
                <div v-if="searchResultsOpen" class="lg:rounded-lg bg-ui-900 overflow-y-auto w-full lg:max-w-xl lg:h-max lg:max-h-[75vh] lg:shadow-xl scroller pointer-events-auto" :class="{'lg:hidden': !searchQuery}">
                    <div class="flex items-center px-3 py-1 space-x-3 lg:hidden">
                        <Icon name="magnifying-glass" class="size-6" size="24"/>
                        <input v-model="searchQuery" type="text" placeholder="Search" class="text-lg bg-transparent border-0 border-b-2 border-blue-500 focus-visible:ring-0 w-full"/>
                    </div>
                    <div class="x items-center justify-between px-2 py-1 text-sm">
                        <span class="text-ui-500">{{ searchResults.songs.length + searchResults.artists.length }} Total Results</span>
                        <button @click="filters.open = true; openTab(2, true);" class="hover:underline cursor-pointer">Advanced Search</button>
                    </div>
                    <h2 v-if="searchResults.songs.length > 0" class="text-xl font-bold px-4 py-1">Songs ({{ searchResults.songs_count }})</h2>
                    <div v-for="song in searchResults.songs" @click="openSong(song)" class="px-2 py-1 hover:bg-ui-800 cursor-pointer">
                        <div class="y leading-tight">
                            <span>
                                <span v-for="(frag, i) in highlight(searchQuery, lib.songs[song].name)" :class="{'bg-blue-500': i === 1}">{{ frag }}</span>
                            </span>
                            <span class="text-sm text-ui-500">{{ lib.artists[lib.songs[song].artist].name }}</span>
                        </div>
                    </div>
                    <h2 v-if="searchResults.artists.length > 0" class="text-xl font-bold px-4 py-1">Artists ({{ searchResults.artists_count }})</h2>
                    <div v-for="artist in searchResults.artists" @click="openArtist(artist)" class="px-2 py-1 hover:bg-ui-800 cursor-pointer">
                        <span>
                            <span v-for="(frag, i) in highlight(searchQuery, lib.artists[artist].name)" :class="{'bg-blue-500': i === 1}">{{ frag }}</span>
                        </span>
                    </div>
                    <p v-if="searchResults.songs.length + searchResults.artists.length === 0" class="text-center px-2 py-1 text-ui-500">No Results</p>
                </div>
            </div>

            <!-- Main Content -->
            <div class="x grow lg:px-2 gap-2 z-0 relative">
                <!-- Side Navigation -->
                <div class="flex-col hidden lg:flex lg:w-1/4 xl:w-1/5 2xl:w-1/6 bg-ui-950 rounded-lg p-2 shrink-0">
                    <div v-for="(tab, i) in tabs" @click="openTab(i)" class="x items-center space-x-3 font-bold text-lg hover:bg-ui-900 rounded-lg p-2 cursor-pointer select-none">
                        <div class="x items-center justify-center rounded-md bg-gradient-to-b text-white size-12" :class="[tab.color, tab.gradient]">
                            <Icon :name="tab.icon" size="24" class="size-7"/>
                        </div>
                        <span>{{ tab.title }}</span>
                    </div>
                    <div class="border-t border-ui-800 mx-4 my-2"></div>
                    <div class="x text-center gap-2 p-2">
                        <button @click="config.asideTab = 0" class="bg-ui-900 rounded-full text-sm px-3 py-1.5 grow" :class="{'!bg-blue-500 text-white': config.asideTab === 0}">Artists</button>
                        <button @click="config.asideTab = 1" class="bg-ui-900 rounded-full text-sm px-3 py-1.5 grow" :class="{'!bg-blue-500 text-white': config.asideTab === 1}">Playlists</button>
                    </div>
                    <div v-if="libraryLoaded && config.asideTab === 0" class="flex flex-col-reverse">
                        <div v-for="(artist, i) in config.history" @click="openArtist(artist)" class="x space-x-3 items-center justify-between hover:bg-ui-900 p-2 rounded-lg  cursor-pointer select-none group">
                            <div class="x items-center space-x-3">
                                <div class="x items-center justify-center rounded-full bg-ui-800 text-ui-500 size-12">
                                    <Icon class="size-6" name="user"/>
                                </div>
                                <span>{{ lib.artists[artist].name }}</span>
                            </div>
                            <div @click.stop="config.history.splice(i, 1)" class="px-3 py-2 hover:text-red-500 opacity-0 group-hover:opacity-100">
                                <Icon name="x-mark" class="size-5"/>
                            </div>
                        </div>
                    </div>
                    <div v-if="libraryLoaded && config.asideTab === 1" class="flex flex-col-reverse">
                        <div v-for="(list, i) in config.playlists" @click="openPlaylist(i)" class="x space-x-3 items-center hover:bg-ui-900 p-2 rounded-lg  cursor-pointer select-none group" :class="{'!bg-ui-700': currentPlaylist === i}">
                            <div class="x items-center justify-center rounded-lg bg-ui-800 text-ui-500 size-12 shrink-0" :class="{'bg-ui-900': currentPlaylist === i}">
                                <Icon v-show="currentPlaylist === i" class="size-6" name="folder-open"/>
                                <Icon v-show="currentPlaylist !== i" class="size-6" name="folder"/>
                            </div>
                            <span class="truncate">{{ list.name }}</span>
                        </div>
                    </div>
                </div>

                <!-- Preload -->
                <div v-if="!libraryLoaded && tab !== 3" class="y items-center z-0 grow bg-ui-950 rounded-lg p-4">
                    <Icon name="table-cells" size="24" type="outline" class="size-16"/>
                    <h1 class="text-xl font-bold">No Library Loaded</h1>
                    <button @click="tab = 3" class="text-white underline">Go to Settings</button>
                </div>

                <!-- Main View -->
                <div v-else class="y z-0 grow overflow-hidden lg:rounded-lg">
                    <!-- Hero Section -->
                    <div class="y relative p-4 pt-4 h-48 lg:h-72 text-white transition-[height] duration-300" :class="{'!h-[50%]': filters.open && currentArtist === 0 && tab === 2}">
                        <div class="y justify-between z-10 relative grow">
                            <!-- Hero Header Navigation -->
                            <div class="x w-full justify-between" :class="{'invisible': tab !== 2}">
                                <div @click="currentArtist = 0; currentPlaylist = null;" :class="{'invisible': (currentArtist === 0 && currentPlaylist === null) || editingPlaylist}" class="x items-center space-x-2 relative z-10 cursor-pointer w-fit font-bold py-1">
                                    <Icon name="arrow-left" class="size-6"/>
                                    <span>Back</span>
                                </div>
                                <div class="x space-x-2" v-if="currentArtist === 0 && currentPlaylist === null">
                                    <div v-show="filters.open" @click="resetFilters(true)" class="x space-x-2 items-center px-2 py-1 rounded-lg hover:bg-ui-1000/25 cursor-pointer bg-ui-1000/25">
                                        <span>Reset Filters</span>
                                    </div>
                                    <div @click="filters.open = !filters.open" class="x space-x-2 items-center px-2 py-1 rounded-lg hover:bg-ui-1000/25 cursor-pointer" :class="{'bg-ui-1000/25': filters.open}">
                                        <Icon name="funnel" class="size-4"/>
                                        <span>{{ filters.open ? 'Show All' : 'Advanced Search' }}</span>
                                    </div>
                                </div>
                                <div class="x space-x-2" v-else-if="currentPlaylist !== null && currentPlaylist !== 0">
                                    <div v-show="editingPlaylist" @click="deletePlaylist(currentPlaylist)" class="x space-x-2 items-center px-2 py-1 rounded-lg hover:bg-ui-1000/25 cursor-pointer bg-ui-1000/25">
                                        <span>Delete Playlist</span>
                                    </div>
                                    <div @click="editingPlaylist = !editingPlaylist" class="x space-x-2 items-center px-2 py-1 rounded-lg hover:bg-ui-1000/25 cursor-pointer" :class="{'bg-ui-1000/25': editingPlaylist}">
                                        <Icon name="pencil" class="size-4"/>
                                        <span>{{ editingPlaylist ? 'Done Editing' : 'Edit Playlist' }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Hero Title & Subtitle -->
                            <div v-if="tab !== 2 || (!filters.open && !editingPlaylist)" class="y z-10 relative">
                                <h1 class="font-bold text-3xl lg:text-6xl mt-2">{{ currentPlaylist !== null && tab === 2 ? playlist.name : (currentArtist === 0 ? tabs[tab].title : artist.name) }}</h1>
                                <p v-if="currentPlaylist !== null">{{ playlist.description }}</p>
                                <span v-if="tab === 2"><span v-if="currentPlaylist || currentArtist">#{{ currentPlaylist ?? currentArtist }} &middot; </span>{{ filteredItems.length }} Songs</span>
                            </div>

                            <!-- Edit Playlist -->
                            <div v-if="editingPlaylist && currentArtist === 0 && tab === 2" class="y bg-ui-1000/25 overflow-y-auto scroller grow rounded-lg w-full p-4 pt-2 relative z-10 mt-2">
                                <span>Name</span>
                                <input v-model="playlist.name" type="text" class="rounded-lg px-2 py-1 border-none bg-ui-950/50 shrink-0 placeholder-ui-400" placeholder="Playlist Name"/>
                                <span class="mt-2">Description</span>
                                <textarea v-model="playlist.description" class="rounded-lg px-2 py-1 border-none bg-ui-950/50 shrink-0 placeholder-ui-400 grow resize-none" placeholder="Playlist Description"></textarea>
                            </div>

                            <!-- Advanced Filters -->
                            <div v-if="filters.open && currentArtist === 0 && tab === 2" class="y space-y-2 bg-ui-1000/25 overflow-y-auto scroller grow rounded-lg w-full p-4 relative z-10 mt-2">
                                <div class="flex flex-col xl:flex-row justify-between lg:space-x-2">
                                    <div class="y xl:w-1/2">
                                        <span>Song Title</span>
                                        <input v-model="filters.query" type="text" class="rounded-lg px-2 py-1 border-none bg-ui-950/50 shrink-0 placeholder-ui-400" placeholder="Search"/>
                                        <span class="mt-2">Sort By</span>
                                        <div class="x space-x-2 !mt-0">
                                            <select v-model="filters.sortBy" class="px-2 py-1 bg-ui-1000/50 border-none rounded-lg pr-10">
                                                <option value="id" selected>ID</option>
                                                <option value="alphabetical">Name</option>
                                                <option value="bytes">Bytes</option>
                                                <option value="seconds">Length</option>
                                            </select>
                                            <select v-model="filters.sortDir" class="px-2 py-1 bg-ui-1000/50 border-none rounded-lg pr-10">
                                                <option :value="1" selected>{{ filters.sortBy === 'alphabetical' ? 'A-Z' : 'Ascending' }}</option>
                                                <option :value="-1">{{ filters.sortBy === 'alphabetical' ? 'Z-A' : 'Descending' }}</option>
                                            </select>
                                        </div>
                                        <div class="y space-y-1 mt-2">
                                            <span>Filters</span>
                                            <p v-if="filters.filters.length === 0" class="px-2 py-1 bg-ui-1000/25 rounded-lg">No Custom Filters</p>
                                            <div v-for="(filter, i) in filters.filters" class="x items-center space-x-2">
                                                <Icon @click="filters.filters.splice(i, 1)" name="x-mark" class="size-5 cursor-pointer hover:text-red-500"/>
                                                <select v-model="filters.filters[i].key" class="px-2 py-1 bg-ui-1000/50 border-none rounded w-24">
                                                    <option value="bytes">Bytes</option>
                                                    <option value="seconds">Length</option>
                                                </select>
                                                <select v-model="filters.filters[i].compare" class="px-2 py-1 bg-ui-1000/50 border-none rounded pr-10">
                                                    <option :value="-1" selected>&lt;</option>
                                                    <option :value="1">&gt;</option>
                                                </select>
                                                <Input v-model.number="filters.filters[i].target" type="number" class="bg-ui-950/50 w-32"/>
                                                <span v-if="filters.filters[i].key === 'bytes'">{{ prettyBytes(filters.filters[i].target) }}</span>
                                                <span v-if="filters.filters[i].key === 'seconds'">{{ toHHMMSS(filters.filters[i].target) }}</span>
                                            </div>
                                            <button class="text-white underline w-fit" @click="filters.filters.push({key: '', compare: 1, target: 1})">Add Custom Filter</button>
                                        </div>
                                    </div>
                                    <div class="y space-y-2 mt-2 xl:mt-0 xl:w-1/2">
                                        <details>
                                            <summary class="rounded-lg bg-ui-1000/25 px-2 py-1">Exclude Artists</summary>
                                            <div class="rounded-lg bg-ui-1000/25 border-none mt-1 p-2 grow-0 shrink">
                                                <ComboBox v-model="filters.blocklist.artists" :options="lib.artists" key-name="name" class="w-full"/>
                                            </div>
                                        </details>
                                        <details>
                                            <summary class="rounded-lg bg-ui-1000/25 px-2 py-1">Include Artists</summary>
                                            <div class="rounded-lg bg-ui-1000/25 border-none mt-1 p-2 grow-0 shrink">
                                                <ComboBox v-model="filters.allowlist.artists" :options="lib.artists" key-name="name" class="w-full"/>
                                            </div>
                                        </details>
                                        <details>
                                            <summary class="rounded-lg bg-ui-1000/25 px-2 py-1">Exclude Tags</summary>
                                            <div class="rounded-lg bg-ui-1000/25 border-none mt-1 p-2 grow-0 shrink">
                                                <ComboBox v-model="filters.blocklist.tags" :options="lib.tags" class="w-full"/>
                                            </div>
                                        </details>
                                        <details class="rounded-lg bg-ui-1000/25 border-none px-2 py-1 grow-0 shrink">
                                            <summary class="select-none">Include Tags</summary>
                                            <ComboBox v-model="filters.allowlist.tags" :options="lib.tags" class="w-full my-1"/>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Background Gradient -->
                        <div class="absolute inset-0 h-[200%] z-0 bg-gradient-to-b [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%);]" :class="[tabs[tab].color, tabs[tab].gradient]">
                            <div v-for="(t, i) in tabs" class="absolute inset-0 bg-gradient-to-b opacity-0 duration-500" :class="{'opacity-100': tab === i, [t.color]: true, [t.gradient]: true}"></div>
                        </div>
                    </div>

                    <!-- Tabs -->
                    <div v-if="tab === 0" class="grow relative bg-ui-950/75">
                        <div class="y space-y-2 absolute inset-0 overflow-y-auto p-8 scroller">
                            <div class="x justify-around">
                                <div class="y" v-for="key in ['songs', 'artists', 'tags']">
                                    <span class="font-bold text-6xl">{{ Object.keys(lib[key]).length }}</span>
                                    <span class="uppercase tracking-widest text-ui-500">{{ key }}</span>
                                </div>
                            </div>
                            <div class="border-t border-ui-700"></div>
                            <p class="text-center">Welcome to the Hyperbolus music library browser for Geometry Dash! If you have any suggestions or spot any bugs please let us know in our Discord!</p>
                            <DiscordInvite code="JJc8nndmFE"/>
                            <p class="text-center"><b>DISCLAIMER:</b> Hyperbolus does NOT store or redistribute copyrighted content. This is a metadata browser for Geometry Dash's music library. If you wish to use this library browser as a music player, you must provide <u>your own</u> external source URL in the <button class="text-white underline" @click="openTab(3)">settings</button> page.</p>
                            <div class="border-t border-ui-700"></div>
                            <h2 class="font-bold text-2xl">Tags</h2>
                            <div class="flex flex-wrap gap-2 mt-1">
                                <span v-for="(tag, i) in lib.tags" class="text-sm rounded-full bg-ui-800 px-2 py-0.5">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="tab === 1" class="grow relative">
                        <RecycleScroller
                            class="overflow-y-auto inset-0 !absolute p-4 bg-ui-950/75 rounded-b-lg scroller"
                            :items="filteredArtists"
                            :item-size="40"
                            v-slot="{ item, index }">
                            <div @click="openArtist(item.id)" class="x space-x-3 items-center justify-between hover:bg-ui-600/25 rounded-lg pl-2 pr-4 py-2 group cursor-pointer">
                                <div class="x items-center space-x-2">
                                    <span class="text-sm font-mono text-ui-500 text-right w-20">{{ item.id }}</span>
                                    <span>{{item.name}}</span>
                                </div>
                                <div class="x items-center space-x-2">
                                    <a :href="item.youtube ? ('https://youtube.com/channel/' + item.youtube) : null" target="_blank" rel="noreferrer nofollow noopener" :class="{'text-ui-600': !item.youtube}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597c-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821c11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305m-317.51 213.508V175.185l142.739 81.205z"/>
                                        </svg>
                                    </a>
                                    <a :href="item.website ? decodeURIComponent(item.website) : null" target="_blank" rel="noreferrer nofollow noopener" :class="{'text-ui-600': !item.website}">
                                        <Icon name="globe-alt" class="size-5"/>
                                    </a>
                                </div>
                            </div>
                        </RecycleScroller>
                    </div>
                    <div v-if="tab === 2" class="grow relative">
                        <p v-if="filteredItems.length === 0" class="relative z-10 p-2 text-center">No Results</p>
                        <RecycleScroller
                            ref="scrollerSongs"
                            class="overflow-y-auto inset-0 !absolute p-2 lg:p-4 bg-ui-950/75 rounded-b-lg scroller"
                            :items="filteredItems"
                            :item-size="50"
                            v-slot="{ item, index }">
                            <div @dblclick="openSong(item.song.id)" @click="lg ? currentHighlightedSong = item.song.id : openSong(item.song.id, true)" @contextmenu="openContextMenu($event, item.id)" class="x space-x-3 items-center justify-between hover:bg-ui-600/25 rounded-lg px-2 py-1 group relative z-0" :class="{'!bg-ui-400/25': item.song.id === currentHighlightedSong}">
                                <div class="hidden lg:flex items-center relative h-full cursor-pointer invisible group-hover:visible">
                                    <Icon v-if="config.urls.files && (!audioPlaying || currentSong !== item.song.id)" @click.stop="openSong(item.song.id, true)" class="w-4 ml-2 mr-1" name="play"/>
                                    <Icon v-else-if="config.urls.files" @click="pause" class="w-4 ml-2 mr-1" name="pause"/>
                                    <Icon v-else class="w-4 ml-2 mr-1" name="information-circle"/>
                                    <div class="x items-center justify-end absolute inset-0 visible group-hover:invisible">
                                        <span class="text-xs text-ui-500 pr-2">{{ item.id + 1 }}</span>
                                    </div>
                                </div>
                                <div class="hidden lg:flex items-center justify-center size-9 bg-ui-700 rounded">
                                    <Icon name="musical-note" class="size-4 text-ui-500"/>
                                </div>
                                <div class="y grow leading-tight !ml-0 lg:!ml-3">
                                    <div class="x items-center space-x-2 text-sm">
                                        <span v-if="filters.query === ''" class="line-clamp-1" :class="{'text-blue-500': currentSong === item.song.id}">{{ item.song.name }}</span>
                                        <span v-else>
                                            <span v-for="(frag, i) in highlight(filters.query, item.song.name)" :class="{'bg-blue-500': i === 1}">{{ frag }}</span>
                                        </span>
                                        <span v-if="item.song.platform === 1" class="bg-black text-white px-1 py-0.5 rounded text-xs">NCS</span>
                                        <span v-if="item.song.new || item.song.priority" class="bg-blue-500 text-white px-1 py-0.5 rounded text-xs">NEW</span>
                                    </div>
                                    <div class="x items-center text-ui-500 line-clamp-1 text-sm pointer-events-none lg:pointer-events-auto">
                                        <span @click.stop="openArtist(item.song.artist)" class="hover:underline hover:text-white cursor-pointer w-fit">{{ lib.artists[item.song.artist]?.name }}</span>
                                        <span v-for="(artist, i) in item.song.additionalArtists" class="hidden lg:inline">
                                            <span>, </span>
                                            <span @click.stop="openArtist(artist)" class="hover:underline hover:text-white cursor-pointer w-fit">{{ lib.artists[artist]?.name }}</span>
                                        </span>
                                        <span v-if="item.song.additionalArtists > 0" class="lg:hidden">, and more</span>
                                    </div>
                                </div>
                                <span class="text-sm">{{ toHHMMSS(item.song.seconds) }}</span>
                                <div @click.stop="openContextMenu($event, item.id)" @contextmenu="openContextMenu($event, item.id)" class="p-2 lg:invisible group-hover:visible cursor-pointer">
                                    <Icon name="ellipsis-horizontal" class="size-5"/>
                                </div>
                            </div>
                        </RecycleScroller>
                    </div>
                    <div v-if="tab === 3" class="y space-y-2 grow relative bg-ui-950/75 rounded-b-lg p-8">
                        <div class="y">
                            <div class="x items-end space-x-2">
                                <div class="y grow">
                                    <div class="x justify-between px-3">
                                        <span>SOURCE FILES URL</span>
                                        <span class="text-amber-500" v-show="config.urls.files !== settingsInput.urls.files">Unsaved Changes!</span>
                                    </div>
                                    <Input class="grow" type="text" v-model="settingsInput.urls.files" placeholder="Use {id} in place of the song ID"/>
                                </div>
                                <button @click="config.urls.files = settingsInput.urls.files" class="rounded-md px-2 py-1 bg-ui-700 hover:bg-ui-800 w-fit">Save</button>
                            </div>
                            <p class="text-sm text-ui-400 px-3 mt-0.5">Load music files from a custom storage URL (optional, but required for playback)</p>
                        </div>
                        <div class="border-t border-ui-700"></div>
                        <div class="x space-x-2">
                            <a :href="library + '.dat'" target="_blank" download class="rounded-md px-2 py-1 bg-ui-700 hover:bg-ui-800 w-fit">Download Library .dat</a>
                            <a :href="library + '.json'" target="_blank" download class="rounded-md px-2 py-1 bg-ui-700 hover:bg-ui-800 w-fit">Download Library .json</a>
                        </div>
                        <div class="border-t border-ui-700"></div>
                        <button @click="config = DEFAULT_CONFIG" class="rounded-md px-2 py-1 bg-ui-700 w-fit text-red-500 hover:text-white hover:bg-red-500">RESET ALL DATA</button>
                    </div>
                </div>

                <!-- Right-Side Info Panel -->
                <div class="absolute lg:relative inset-0 flex-col lg:flex lg:w-1/4 xl:w-1/5 2xl:w-1/6 bg-ui-950 lg:rounded-lg p-4 shrink-0" :class="{'hidden': !songInfoOpen}">
                    <div v-if="currentHighlightedSong" class="y space-y-2">
                        <div class="x items-center justify-between space-x-2">
                            <div class="y grow">
                                <h2 class="font-bold text-2xl">{{ highlightedSong.name }}</h2>
                                <span>{{ lib.artists[highlightedSong.artist].name }}</span>
                            </div>
                            <Icon @click="songInfoOpen = false" name="x-mark" class="lg:hidden size-6"/>
                        </div>
                        <div class="y space-y-2 pane">
                            <h2 class="text-xl font-bold">Credits</h2>
                            <div class="y mt-1">
                                <span @click="openArtist(highlightedSong.artist)" class="hover:underline hover:text-white cursor-pointer">{{ lib.artists[highlightedSong.artist].name }}</span>
                                <span class="text-sm text-ui-500">Main Artist</span>
                            </div>
                            <div v-for="artist_id in highlightedSong.additionalArtists" class="y">
                                <span @click.stop="openArtist(artist_id)" class="hover:underline hover:text-white cursor-pointer">{{ lib.artists[artist_id]?.name ?? `MISSING no${artist_id}` }}</span>
                                <span class="text-sm text-ui-500">Additional Artist</span>
                            </div>
                        </div>
                        <div class="y space-y-2 pane">
                            <h2 class="text-xl font-bold">Tags</h2>
                            <div class="x flex-wrap gap-2 mt-1">
                                <Tooltip v-for="(tag, id) in highlightedSong.tags" :message="`Tag ID ${tag}`" class="px-2 py-0.5 text-sm bg-ui-800 rounded-lg w-fit">{{ lib.tags[tag] ?? 'UNKNOWN ' + tag }}</Tooltip>
                            </div>
                        </div>
                        <div class="y space-y-2 pane">
                            <h2 class="text-xl font-bold mt-1">Info</h2>
                            <div class="x justify-between">
                                <span>ID</span>
                                <span>{{ currentHighlightedSong }}</span>
                            </div>
                            <div class="x justify-between">
                                <span>Length</span>
                                <span>{{ toHHMMSS(highlightedSong.seconds) }}</span>
                            </div>
                            <div class="x justify-between">
                                <span>Size</span>
                                <span>{{ prettyBytes(highlightedSong.bytes) }}</span>
                            </div>
                            <div class="x justify-between">
                                <span>List Number</span>
                                <span>{{ highlightedSong.number }}</span>
                            </div>
                        </div>
                        <div v-if="config.urls.files" @click="openSong(currentHighlightedSong, true)" class="x items-center justify-center space-x-1 rounded-lg bg-ui-700 font-bold text-white text-center py-0.5 px-2 cursor-pointer">
                            <Icon name="play" class="size-4"/>
                            <span>Play</span>
                        </div>
                        <a v-if="highlightedSong.link || highlightedSong.platform === 1" :href="highlightedSong.link ? decodeURIComponent(highlightedSong.link) : null" target="_blank" rel="noreferrer nofollow noopener" class="x items-center justify-center space-x-1 rounded-lg font-bold text-center py-0.5 px-2" :class="highlightedSong.platform === 1 ? 'bg-black text-white' : 'bg-ui-900'">
                            <span>{{ highlightedSong.platform === 1 ? 'NCS' : 'Link' }}</span>
                            <Icon v-if="highlightedSong.link" name="arrow-top-right-on-square" class="size-4"/>
                        </a>
                        <span v-if="highlightedSong.new" class="rounded-lg bg-blue-500 font-bold text-white text-center py-0.5 px-2">NEW</span>
                    </div>
                </div>
            </div>

            <!-- Audio Player -->
            <div class="bg-ui-950/75 lg:bg-transparent px-2 pb-2 lg:p-0">
                <div class="flex flex-col lg:flex-row lg:gap-2 justify-between relative group rounded-lg overflow-hidden bg-ui-800 lg:bg-transparent">
                    <div @click="songInfoOpen = true" class="x items-center space-x-4 px-1.5 py-1 lg:p-4 lg:w-1/3">
                        <div class="x items-center justify-center size-8 lg:size-14 bg-ui-700 rounded">
                            <Icon name="musical-note" class="size-4 lg:size-5 text-ui-500"/>
                        </div>
                        <div class="y grow pointer-events-none lg:pointer-events-auto">
                            <span class="text-sm lg:text-base">{{ currentSong ? song.name : '-' }}</span>
                            <span @click="openArtist(song.artist)" class="text-xs text-ui-500 hover:underline hover:text-white cursor-pointer">{{ currentSong ? lib.artists[song.artist].name : '-' }}</span>
                        </div>
                        <div @click.stop="toggle" class="px-1 lg:hidden" :class="{'opacity-25': !audioLoaded}">
                            <Icon v-if="!audioPlaying" name="play" size="24" class="size-6"/>
                            <Icon v-else name="pause" size="24" class="size-6"/>
                        </div>
                    </div>
                    <div class="hidden lg:flex flex-col space-y-1.5 p-4 lg:w-1/3" :class="{'group-hover:opacity-20 transition-opacity': !config.urls.files}">
                        <div class="x justify-center items-center space-x-4">
                            <div class="hidden">
                                <Icon name="question-mark-circle" size="24" class="size-6"/>
                            </div>
                            <div :class="{'opacity-25': !audioLoaded}">
                                <Icon name="forward" size="24" class="size-6 rotate-180"/>
                            </div>
                            <div @click="toggle" class="bg-ui-100 rounded-full p-2 text-ui-1000 cursor-pointer" :class="{'opacity-25': !audioLoaded}">
                                <Icon v-if="!audioPlaying" name="play" size="24" class="size-6"/>
                                <Icon v-else name="pause" size="24" class="size-6"/>
                            </div>
                            <div :class="{'opacity-25': !audioLoaded}">
                                <Icon name="forward" size="24" class="size-6"/>
                            </div>
                            <div class="hidden">
                                <Icon name="arrow-path-rounded-square" size="24" class="size-6"/>
                            </div>
                        </div>
                        <div class="x items-center justify-between space-x-2 text-sm">
                            <span>{{ currentSong ? toHHMMSS(scrubbing ? scrubPosition : audioProgress) : '-:--' }}</span>
                            <div class="y grow group/scrubber relative">
                                <input class="z-20 h-4 bg-transparent cursor-pointer opacity-0 group-hover/scrubber:opacity-100" :value="scrubPosition" @input="scrub" @change="seek" :step="0.25" :min="0" :max="song.seconds" type="range" :disabled="!audioLoaded"/>
                                <div class="x items-center absolute inset-0 z-10 px-1">
                                    <div class="rounded-full bg-ui-700 overflow-hidden w-full">
                                        <div class="py-0.5 bg-white rounded-full transition-colors group-hover/scrubber:bg-blue-500" :style="`width:${audioLoaded ? (scrubPosition / song.seconds * 100) : 0}%;`"></div>
                                    </div>
                                </div>
                            </div>
                            <span>{{ currentSong ? toHHMMSS(song.seconds) : '-:--' }}</span>
                        </div>
                    </div>
                    <div class="hidden lg:flex items-center justify-end space-x-2 p-4 lg:w-1/3 z-0">
                        <Icon name="speaker-wave" size="24" type="outline" class="size-5"/>
                        <div class="y w-32 group/scrubber relative">
                            <input class="z-20 h-4 bg-transparent cursor-pointer opacity-0 group-hover/scrubber:opacity-100" v-model="audioVolume" @input="e => volume(e.target.value)" :step="0.01" :min="0" :max="1" type="range"/>
                            <div class="x items-center absolute inset-0 z-10 px-1">
                                <div class="rounded-full bg-ui-700 overflow-hidden w-full">
                                    <div class="py-0.5 bg-white rounded-full transition-colors group-hover/scrubber:bg-blue-500" :style="`width:${audioVolume * 100}%;`"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rounded-full bg-ui-700 overflow-hidden w-full lg:hidden">
                        <div class="py-0.5 bg-white rounded-full transition-colors group-hover/scrubber:bg-blue-500" :style="`width:${audioLoaded ? (scrubPosition / song.seconds * 100) : 0}%;`"></div>
                    </div>
                    <div v-if="!config.urls.files || !libraryLoaded" class="z-20 hidden lg:flex flex-col select-none items-center justify-center absolute inset-0 !ml-0 bg-gradient-to-t from-[#000a] to-[#0003] opacity-0 hover:opacity-100 transition-opacity ">
                        <span class="font-bold text-xl">Sorry!</span>
                        <span v-if="!libraryLoaded">No library Found! You must load a music library first</span>
                        <span v-else-if="!config.urls.files">For copyright reasons, you must provide your own music files in <button @click="openTab(3)" class="underline text-white">Settings</button>.</span>
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div class="flex justify-around lg:hidden">
                <div v-for="(t, i) in tabs" @click="openTab(i)" class="y items-center grow p-2 cursor-pointer" :class="{'text-ui-500': tab  !== i}">
                    <Icon :name="t.icon" class="size-6"/>
                    <span class="text-xs">{{ t.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.scroller {
    scrollbar-color: rgb(var(--color-ui-300) / 0.25) transparent;
    scrollbar-width: thin;
}

input[type=range]::-moz-range-thumb {
    @apply bg-white border-none w-3 h-3
}

input[type=range]::-webkit-slider-thumb {
    @apply bg-white border-none appearance-none p-1 w-4 h-4 rounded-full
}
</style>
