<script setup>
import {useForm} from "@inertiajs/vue3";
import {computed, ref} from "vue";
import {useDropZone} from "@vueuse/core";
import route from "ziggy-js";
import Label from "@/Jetstream/Label.vue";
import Input from "@/Jetstream/Input.vue";
import AppLayout from "@/Layouts/Dash.vue";
import Tooltip from "@/Components/Tooltip.vue";

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
</script>
<template>
    <app-layout>
        <div class="y space-y-2">
            <h1 class="font-bold text-3xl">Submit Replay</h1>
            <div class="y space-y-2 pane w-full">
                <Label>
                    Level ID
                    <Input v-model="submission.level_id" type="number" />
                </Label>

                <Label>
                    Coins Collected
                    <Input v-model="submission.coins" type="number" />
                </Label>

                <Label ref="dropzone">
                    Macro File
                    <input @change="updateFile" class="hidden" type="file"/>
                    <div v-if="submission.file === null" class="y items-center rounded-md cursor-pointer bg-ui-950 border-2 border-dashed border-ui-700 p-2">
                        <svg :class="{'text-green-500': isOverDropZone}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        <span class="font-bold text-xl">Drag and Drop</span>
                        <span>or click here to upload your file</span>
                        <span class="text-ui-500"><b>.gdr</b>, .replay, .zbot, .dat, .ddhor, .xbot, .kd, .zbf, .xbot, .rsh, .json, .mhr</span>
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
                    <span>GD Replay, MegaHack, TASBOT, and zBot are most preferred</span>
                </div>

                <Label>
                    Macro Format
                    <select v-model="submission.format" class="block bg-ui-950 text-sm border-0 rounded px-2 py-1 w-full">
                        <option value="" disabled hidden selected></option>
                        <optgroup label="Preferred Formats">
                            <option value="gdr">GD Replay</option>
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

                <Label>
                    Additional Notes (optional)
                    <textarea class="block bg-ui-950 rounded-md border-none w-full placeholder-ui-600" v-model="submission.notes" placeholder="This macro has all the swag jumps"></textarea>
                </Label>

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
                    <span>I grant the research team and Hyperbolus use, modify, redistribute, and sublicense this macro</span>
                </label>

                <p>If you are unsatisfied with these terms for any reason <Tooltip message="Discord Invite" :inline="true"><a class="text-white underline" href="https://discord.gg/JJc8nndmFE">please give us feedback.</a></Tooltip></p>

                <button @click="submit" :disabled="!formFinished || submission.processing" class="font-bold w-full rounded-md px-2 py-1 shadow" :class="!formFinished || submission.processing ? 'bg-ui-950 cursor-not-allowed' : 'bg-ui-800 hover:bg-ui-900 hover:shadow-sm'">Submit{{ submission.processing ? 'ting...' : '' }}</button>
            </div>
        </div>
    </app-layout>
</template>
