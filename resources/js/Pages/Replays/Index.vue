<script setup>
import StatsPanel from "@/Components/StatsPanel.vue";
import AppLayout from "@/Layouts/Dash.vue";
import {isAuthenticated} from "@/util.js";
import Lightbox from "@/Components/Lightbox.vue";
import Input from "@/Jetstream/Input.vue";
import Label from "@/Jetstream/Label.vue";
import Tooltip from "@/Components/Tooltip.vue";
import {computed, ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {useDropZone} from "@vueuse/core";
import Username from "@/Components/Username.vue";

const props = defineProps({
    leaderboard: Object,
    participants: Number,
    approved: Number,
    unapproved: Number,
});

const updateFile = (e) => {
    submission.file = e.target.files[0];
}

const submission = useForm({
    file: null,
    level_id: null,
    format: null,
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
            <Lightbox>
                <button :disabled="!isAuthenticated()" class="font-bold w-full rounded-md px-2 py-1 shadow bg-ui-800 border-0" :class="isAuthenticated() ? 'hover:bg-ui-900 hover:shadow-sm' : 'cursor-not-allowed'">{{ isAuthenticated() ? 'Submit' : 'Log in to submit' }} a record</button>
                <template #content>
                    <div @click.stop class="cursor-default y space-y-2 pane text-ui-200">
                        <h1 class="font-bold text-3xl">Submit Replay</h1>

                        <Label>
                            Level ID
                            <Input v-model="submission.level_id" type="number" />
                        </Label>

                        <Label ref="dropzone">
                            Macro File
                            <input @change="updateFile" class="hidden" type="file" accept=".replay,.zbot,.dat,.ddhor,.xbot,.kd,.zbf,.xbot,.rsh,.json,.mhr"/>
                            <div v-if="submission.file === null" class="y items-center rounded-md cursor-pointer bg-ui-950 border-2 border-dashed border-ui-700 p-2">
                                <svg :class="{'text-green-500': isOverDropZone}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                <span class="font-bold text-xl">Drag and Drop</span>
                                <span>or click here to upload your file</span>
                                <span class="text-ui-500">.replay, .zbot, .dat, .ddhor, .xbot, .kd, .zbf, .xbot, .rsh, .json, .mhr</span>
                            </div>
                            <div v-else class="x justify-between items-center space-x-1 bg-ui-950 rounded-md px-2 py-1">
                                <div @click.prevent class="x items-center grow">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                        <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
                                    </svg>
                                    <span>{{submission.file.name}}</span>
                                </div>
                                <span class="underline text-white cursor-pointer">Replace File</span>
                            </div>
                        </Label>
                        <div class="x space-x-1 !mt-0 items-center text-ui-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                            </svg>
                            <span>MegaHack and zBot are preferred</span>
                        </div>

                        <Label>
                            Macro Format
                            <select v-model="submission.format" class="block bg-ui-950 text-sm border-0 rounded px-2 py-1 w-full">
                                <option value="" disabled hidden selected></option>
                                <optgroup label="Preferred Formats">
                                    <option value="tasbot">TASBOT</option>
                                    <option value="mhr">MegaHack Replay</option>
                                    <option value="mhr_json">MegaHack Replay (JSON)</option>
                                    <option value="zbot">zBot</option>
                                    <option value="zbot_frame">zBot Frame</option>
                                </optgroup>
                                <option value="replaybot">ReplayBot</option>
                                <option value="replaybot_frame">ReplayBot Frame</option>
                                <option value="echo">Echo</option>
                                <option value="rush">Rush</option>
                                <option value="ur">Universal Replay</option>
                                <option value="ur_frame">Universal Replay Frame</option>
                                <option value="ddhor">DDHOR</option>
                                <option value="xbot">xBot</option>
                                <option value="xbot frame">xBot Frame</option>
                                <option value="ybot">yBot</option>
                                <option value="ybot frame" disabled>yBot Frame (Unsupported)</option>
                            </select>
                        </Label>
                        <div class="x space-x-1 !mt-0 items-center text-ui-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                            </svg>
                            <span>If your format is not listed here please contact us so we can add it before you submit</span>
                        </div>

                        <label class="x items-center space-x-2 text-sm">
                            <input v-model="submission.terms.original" type="checkbox" class="rounded bg-ui-800"/>
                            <span>I agree that this macro is my own original work</span>
                        </label>

                        <label class="x items-center space-x-2 text-sm">
                            <input v-model="submission.terms.functional" type="checkbox" class="rounded bg-ui-800"/>
                            <span>I agree this macro is a 100% completion (coins NOT required) and works to the best of my understanding</span>
                        </label>

                        <label class="x items-center space-x-2 text-sm">
                            <input v-model="submission.terms.grant" type="checkbox" class="rounded bg-ui-800"/>
                            <span>I grant the research team and GDForums.com use, modify, redistribute, and sublicense this macro</span>
                        </label>

                        <p>If you are unsatisfied with these terms for any reason <Tooltip message="Discord Invite" :inline="true"><a class="text-white underline" href="https://discord.gg/JJc8nndmFE">please give us feedback.</a></Tooltip></p>

                        <button @click="submit" :disabled="!formFinished || submission.processing" class="font-bold w-full rounded-md px-2 py-1 shadow" :class="!formFinished || submission.processing ? 'bg-ui-950 cursor-not-allowed' : 'bg-ui-800 hover:bg-ui-900 hover:shadow-sm'">Submit{{ submission.processing ? 'ting...' : '' }}</button>
                    </div>
                </template>
            </Lightbox>
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
            <h2 class="font-bold text-xl">Leaderboard</h2>
            <div class="y space-y-2">
                <div v-for="user in leaderboard" class="x justify-between pane">
                    <Username :user="user"/>
                    <div>{{ user.replays_count }} Submissions</div>
                </div>
                <p v-if="leaderboard.length === 0" class="text-center text-ui-600 pane">Nobody :(</p>
            </div>
        </div>
    </app-layout>
</template>
