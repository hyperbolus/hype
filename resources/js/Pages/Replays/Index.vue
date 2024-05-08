<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {isAuthenticated} from "@/util.js";
import Lightbox from "@/Components/Lightbox.vue";
import Input from "@/Jetstream/Input.vue";
import Label from "@/Jetstream/Label.vue";
import Tooltip from "@/Components/Tooltip.vue";
import {computed, onMounted, ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {useDropZone} from "@vueuse/core";
import Username from "@/Components/Username.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Pagination from "@/Components/Pagination.vue";
import {Link} from "@inertiajs/vue3";

const props = defineProps({
    leaderboard: Object,
    participants: Number,
    approved: Number,
    unapproved: Number,
    replays: Object
});

const updateFile = (e) => {
    submission    .file = e.target.files[0];
}

const submission = useForm({
    file: null,
    level_id: null,
    coins: null,
    format: null,
    notes: null,
    terms: {
        original: false,
        functional: false,
        grant: false,
    }
});

const dropzone = ref(null);

function onDrop(files) {
    if (files === null) return;

    submission.file = files[0];
}

const { isOverDropZone } = useDropZone(dropzone, onDrop)

const submit = () => {
    submission.post(route('replays.store'));
};

const formFinished = computed(() => {
    return submission.terms.original && submission.terms.functional && submission.terms.grant && submission.level_id !== null && submission.format !== null && submission.file !== null
});

const filters = ref({
    'gdr': false,
    'tasbot': false,
    'mhr': false,
    'mhr_json': false,
    'zbot': false,
    'zbot_frame': false,
    'replaybot': false,
    'replaybot_frame': false,
    'echo': false,
    'rush': false,
    'ur': false,
    'ur_replay': false,
    'ddhor': false,
    'xbot': false,
    'xbot_frame': false,
    'ybot': false,
    'ybot_frame': false,
});

const formats = {
    'gdr': 'GD Replay',
    'tasbot': 'TASBOT',
    'mhr': 'MegaHack Replay',
    'mhr_json': 'MegaHack Replay (JSON)',
    'zbot': 'zBot',
    'zbot_frame': 'zBot Frame',
    'replaybot': 'ReplayBot',
    'replaybot_frame': 'ReplayBot Frame',
    'echo': 'Echo',
    'rush': 'Rush',
    'ur': 'Universal Replay',
    'ur_replay': 'Universal Replay Frame',
    'ddhor': 'DDHOR',
    'xbot': 'xBot',
    'xbot_frame': 'xBot Frame',
    'ybot': 'yBot',
    'ybot_frame': 'yBot Frame',
}

const query = useForm({
    format: '',
    level_id: '',
    user_id: ''
})

onMounted(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('format')) {
        const list = params.get('format').split(',');
        for (const format in list) {
            if (filters.value.hasOwnProperty(list[format])) {
                filters.value[list[format]] = true
            }
        }
    }

    if (params.has('user_id')) {
        query.user_id = params.get('user_id')
    }

    if (params.has('level_id')) {
        query.level_id = params.get('level_id')
    }
})

const search = () => {
    let q = [];

    for (const key in filters.value) {

        if (filters.value[key] === true) {
            q.push(key);
        }
    }

    query.format = q.join(',');

    query.transform((data) => {
        let q = {};
        if (data.format !== '') q.format = data.format;
        if (data.level_id !== '') q.level_id = data.level_id;
        if (data.user_id !== '') q.user_id = data.user_id;
        return q;
    }).get(route('replays.index'))
};
</script>
<template>
    <app-layout title="Replays">
        <div class="y space-y-2 w-full">
            <h1 class="font-bold text-3xl">Replay Archive</h1>
            <details class="pane space-y-2">
                <summary class="font-bold text-xl">About</summary>
                <p>Hello! Replay support was planned to be added to this site some time ago but it was decided to be put off while a replay bot and format that fulfilled various requirements that weren't met by other formats was developed.</p>
                <p>Well, due to various factors such as the (allegedly) imminent release of 2.2 and other research which had required a substantial cache of replays, this page was set up quick and dirty to archive primarily rated level replays for use in research.</p>
                <h2 class="font-bold">The Research</h2>
                <p>This site already boasts a system for level tagging, rating and reviewing. This is but one facet of an attempt to build a level recommendation and discoverability system. Currently experiments are being done to use replays to predict level difficulty and automatically produce either screenshots or videos of levels which could also be used for level classification.</p>
                <h2 class="font-bold">Goals</h2>
                <ul class="list-disc list-inside">
                    <li>Collect stable and high-quality replays</li>
                    <li>Train a model to predict level difficulty (single-parameter)</li>
                    <li>Train a model to predict level difficulty (multi-parameter)</li>
                    <li>Generate stills and videos of levels for use in level classification</li>
                    <li>Generate stills and videos of levels for user's convenience on GDForums.com</li>
                    <li>Recommend levels by gameplay/difficulty/skill</li>
                    <li>Recommend levels by maximizing user ratings</li>
                </ul>
            </details>
            <div v-if="false" class="x space-x-2 items-center rounded-md p-2 bg-red-500/10 border border-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shrink-0 text-red-500 w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>For safety reasons, the replay archive is only accessible to a few individuals until we've understood the effects this can have. Levels such as demons and list levels may be withheld even longer. If you are a leaderboard moderator or prominent list auditor please <Tooltip message="Discord Invite" :inline="true"><a class="text-white underline" href="https://discord.gg/JJc8nndmFE">contact us.</a></Tooltip></span>
            </div>
            <div class="x space-x-2 items-center rounded-md p-2 bg-blue-500/10 border border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shrink-0 text-blue-500 w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span>If you have an academic interest in the full dataset or would like to contribute to our research, please <Tooltip message="Discord Invite" :inline="true"><a class="text-white underline" href="https://discord.gg/JJc8nndmFE">contact us!</a></Tooltip></span>
            </div>
            <div class="x space-x-2 items-center rounded-md p-2 bg-green-500/10 border border-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shrink-0 text-green-500 w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
                <span>For iCreate users, your format is .zbf or "zBot Frame," the same as zBot.</span>
            </div>
            <Link :href="route('replays.create')" :disabled="!isAuthenticated()" class="font-bold w-full rounded-md px-2 py-1 shadow bg-ui-800 border-0" :class="isAuthenticated() ? 'hover:bg-ui-900 hover:shadow-sm' : 'cursor-not-allowed'">{{ isAuthenticated() ? 'Submit' : 'Log in to submit' }} a record</Link>
            <h2 class="font-bold text-xl">Statistics</h2>
            <div class="grid grid-cols-2 lg:grid-cols-4">
                <div class="y">
                    <span class="font-bold text-sm uppercase">Total Records</span>
                    <span class="font-bold text-4xl">{{ approved + unapproved }}</span>
                </div>
                <div class="y">
                    <span class="font-bold text-sm uppercase">Unapproved Records</span>
                    <span class="font-bold text-4xl">{{ unapproved }}</span>
                </div>
                <div class="y">
                    <span class="font-bold text-sm uppercase">Approved Records</span>
                    <span class="font-bold text-4xl">{{ approved }}</span>
                </div>
                <div class="y">
                    <span class="font-bold text-sm uppercase">Total Participants</span>
                    <span class="font-bold text-4xl">{{ participants }}</span>
                </div>
            </div>
            <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <div class="y space-y-2 md:w-1/2">
                    <h2 class="font-bold text-xl">Leaderboard</h2>
                    <div class="y space-y-2">
                        <div v-for="user in leaderboard" class="x justify-between pane">
                            <Username :user="user"/>
                            <div>{{ user.replays_count }} Submissions</div>
                        </div>
                        <p v-if="leaderboard.length === 0" class="text-center text-ui-600 pane">Nobody :(</p>
                    </div>
                </div>
                <div class="y space-y-2 md:w-1/2">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-xl">Macro Search</h2>
                        <Dropdown container-classes="bottom-full md:bottom-0 md:top-full right-full" content-classes="mb-2 md:mb-0 md:mt-2 w-64">
                            <template #trigger>
                                <div class="x items-center rounded bg-ui-800 px-2 py-1">
                                    <span class="text-sm mr-2">Search</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                        <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div @click.stop class="y space-y-2 p-2 text-sm">
                                    <button @click="search" class="bg-ui-800 rounded text-sm px-2 py-1">Search</button>
                                    <Label>
                                        Level ID
                                        <Input v-model="query.level_id" type="number" />
                                    </Label>
                                    <Label>
                                        User ID
                                        <Input v-model="query.user_id" type="number" />
                                    </Label>
                                    <div class="y space-y-1 h-64 overflow-y-auto bg-ui-950 p-1">
                                        <label v-for="(name, key) in formats" class="x items-center space-x-2">
                                            <input v-model="filters[key]" type="checkbox" class="rounded bg-ui-800"/>
                                            <span>{{ name }}</span>
                                        </label>
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="y space-y-2">
                        <div v-for="macro in replays.data" class="x items-center justify-between pane">
                            <div class="y">
                                <span><Link class="text-white" :href="route('levels.show', macro.level.id)">{{macro.level.name}}</Link> by {{macro.level.creator}}</span>
                                <div class="x items-center space-x-1">
                                    <span class="text-xs">Recorded by</span>
                                    <Username class="text-xs" :user="macro.author"/>
                                </div>
                            </div>
                            <div class="y items-end">
                                <span>{{ macro.format }} | FPS: {{ macro.fps ?? 'Unknown' }}</span>
                                <Tooltip :message="macro.files[0].filename">
                                    <a :download="macro.files[0].filename" :href="macro.files[0].url"><span class="text-sm underline text-white">Download</span></a>
                                </Tooltip>
                            </div>
                        </div>
                        <p v-if="replays.data.length === 0" class="text-center text-ui-600 pane">None :(</p>
                    </div>
                    <Pagination :list="replays"/>
                </div>
            </div>
        </div>
    </app-layout>
</template>
