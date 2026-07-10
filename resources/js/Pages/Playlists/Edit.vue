<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import route from 'ziggy-js'
import {useForm} from '@inertiajs/vue3'
import Input from "@/Jetstream/Input.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import { Reorder, useDragControls } from "motion-v"
import {onBeforeMount, ref, useTemplateRef, getCurrentInstance, nextTick, watch} from "vue";
import Icon from "@/Components/Icon.vue";
import {objKeyBy} from "@/util";
import Username from "@/Components/Username.vue";
import {useSearch} from "@/lib/composables/useSearch";
import LevelSearchResult from "@/Components/LevelSearchResult.vue";
import {onClickOutside} from "@vueuse/core";

const props = defineProps({
    playlist: Object
});

const submissions = ref({});
const levels = ref([]);

const addedLevels = ref({});

const submissionIDs = () => props.playlist.submissions.map(s => s.id.toString());

const form = useForm({
    title: props.playlist.title ?? '',
    description: props.playlist.description ?? '',
    visibility: props.playlist.visibility ?? '',
    collaboration: props.playlist.collaboration ?? '',
    attribution: props.playlist.attribution ?? '',
    type: props.playlist.type ?? '',

    rankings: submissionIDs(),
    dirtyBit: false,
});

const controls = ref({});

// todo: preserve initial order when deleting from a changed order

const createList = (dirty = true) => {
    submissions.value = objKeyBy(props.playlist.submissions, 'id')
    levels.value = [];
    controls.value = {};

    for (let sub in submissions.value) {
        levels.value.push(submissions.value[sub].level_id);
        controls.value[sub] = useDragControls();
    }

    form.rankings = submissionIDs();

    form.dirtyBit = dirty;

    /**
     * FIXME: extremely dirty hack
     * for some reason the drag controls wont update on Reorder.Item, they only get set properly on mount.
     * so we destroy and re-render Reorder.Group so they each item gets re-mounted with the new drag controls
     **/
    updateListForce();
}

const createListDefault = () => {
    createList(false);
    form.defaults();
}

onBeforeMount(() => {
    createListDefault();
});

const dragging = ref(false);

const { query, results } = useSearch();

watch(query, (v, old) => {
    if (v !== '') searchResultsOpen.value = true;
});

const searchResultsOpen = ref(false);

const submitLevelForm = useForm({
    level_id: '',
    position: '',
});


// todo: preview destructive changes before committing
const add = (level) => {
    // Don't add if already in the list
    if (levels.includes(level.id)) return;

    // Don't add if already in the to-add list
    if (addedLevels.includes(level.id)) return;

    addedLevels[level.id] = level;
    form.rankings.push(level.id)
}

const submit = (id) => {
    if (submitLevelForm.processing) return;

    searchResultsOpen.value = true;

    submitLevelForm.level_id = id;
    submitLevelForm.post(route('submissions.store', props.playlist), {
        onSuccess: () => {
            submitLevelForm.level_id = '';
            createListDefault();
        },
        preserveScroll: true,
    });
}

const getRank = (s) => `${s?.rank ?? ''}`.includes('-') ? parseInt(s.rank.split('-')[1]) : s.rank

const qInput = useTemplateRef('qInput');

const clearQuery = () => {
    query.value = '';
    searchResultsOpen.value = false;
    qInput.value.blur();
}

onClickOutside(qInput, () => {
    if (!submitLevelForm.processing) searchResultsOpen.value = false;
});

const submitListEdit = () => form.post(route('playlists.update', props.playlist.id), {
    onSuccess: createListDefault,
});

const deleteSubmission = (id) => {
    useForm({}).delete(route('submissions.destroy', id), {
        onSuccess: createListDefault,

        preserveScroll: true
    });
}

const getCtrl = (k, _) => controls.value[k];

const settings = {
    'visibility': {
        title: 'Visibility',
        options: [
            {
                value: 'public',
                icon: 'globe-asia-australia',
                title: 'Public',
                description: 'This playlist is listed globally on the site'
            },
            {
                value: 'unlisted',
                icon: 'eye-slash',
                title: 'Unlisted',
                description: 'Hidden from searches, only accessible by direct link'
            },
            {
                value: 'private',
                icon: 'lock-closed',
                title: 'Private',
                description: 'Only you can view this playlist'
            },
        ]
    },
    'collaboration': {
        title: 'Submission Permissions',
        options: [
            {
                value: 'public',
                icon: 'user-group',
                title: 'Open',
                subtitle: '(Everyone)',
                description: 'Anyone can add to this playlist'
            },
            {
                value: 'invite',
                icon: 'lock-closed',
                title: 'Closed',
                subtitle: '(Invite Only)',
                description: 'Only you and users you invite can edit this playlist'
            },
        ]
    },
    'attribution': {
        title: 'Show Submission Sender',
        options: [
            {
                value: 'shown',
                icon: 'user-group',
                title: 'Show',
                description: 'Display the user that submitted the level to the list next to the level'
            },
            {
                value: 'others',
                icon: 'user',
                title: 'Others',
                description: 'Only show when other users submit a level'
            },
            {
                value: 'hidden',
                icon: 'question-mark-circle',
                title: 'Hide',
                description: 'Do not display the user who submitted the level'
            },
        ]
    },
    'type': {
        title: 'List Ordering',
        options: [
            {
                value: 'ordered',
                icon: 'numbered-list',
                title: 'Ranked',
                subtitle: '(Ordered)',
                description: 'Levels have an explicit numbered rank next to them on the list determined by their order'
            },
            {
                value: 'unordered',
                icon: 'list-bullet',
                title: 'Unranked',
                subtitle: '(Unordered)',
                description: 'Levels have no displayed ranking number'
            },
        ]
    },
}

const showList = ref(true);
const updateListForce = async () => {
    showList.value = false;
    nextTick(() => showList.value = true);
}
</script>
<template>
    <app-layout>
        <div class="y lg:flex-row gap-2 w-full relative z-0">
            <div class="y space-y-2 lg:w-2/5">
                <div class="y space-y-2 p-2 bg-ui-900 rounded-md h-fit">
                    <label>
                        <span class="text-sm">Playlist Title</span>
                        <Input type="text" v-model="form.title"/>
                    </label>
                    <label>
                        <span class="text-sm">Description</span>
                        <textarea v-model="form.description" class="textbox"></textarea>
                    </label>
                </div>
                <div v-for="(property, attr) in settings" class="pane">
                    <span class="text-sm">{{ property.title }}</span>
                    <div class="y gap-2 py-2">
                        <div v-for="option in property.options" @click="form[attr] = option.value" class="form-card" :class="form[attr] === option.value ? 'bg-ui-950' : 'bg-ui-900'">
                            <Icon :name="option.icon" scale="size-12" size="24"/>
                            <div>
                                <div class="x items-center space-x-2">
                                    <span class="text-xl font-bold">{{ option.title }}</span>
                                    <span class="text-ui-600 font-bold">{{ option.subtitle }}</span>
                                </div>
                                <p class="text-ui-400">{{ option.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="y space-y-2 grow">
                <div class="x gap-2 relative">
                    <div class="grow">
                        <div v-show="form.isDirty" class="x justify-between space-x-2 rounded-full px-4 border border-blue-500 text-white bg-blue-500 py-1.5">
                            <span>You have unsaved changes!</span>
                            <div class="x items-center space-x-3">
                                <button @click="form.reset()" class="hover:underline text-blue-200 text-xs">Reset</button>
                                <button @click="submitListEdit" :disabled="form.processing">{{ form.processing ? 'Saving...' : 'Save' }}</button>
                            </div>
                        </div>
                        <div v-show="!form.isDirty" class="x justify-between space-x-2 rounded-full px-4 py-1.5 bg-ui-900 border border-ui-700">
                            <span>{{ playlist.title }}</span>
                            <span>{{ playlist.submissions.length }} Levels</span>
                        </div>
                    </div>
                    <div class="rounded-full border-ui-700 bg-ui-900 relative">
                        <label class="x items-center px-2.5">
                            <Icon class="text-ui-500" name="magnifying-glass"/>
                            <input ref="qInput" @keydown.esc="searchResultsOpen = false; $refs.qInput.blur()" @click="searchResultsOpen = true" @focusin="searchResultsOpen = true" type="text" v-model="query" class="bg-transparent border-none pl-2 pr-2 py-1.5 focus-visible:ring-0 placeholder-ui-600" placeholder="Add level"/>
                        </label>
                        <Icon @click="clearQuery()" class="absolute right-2 top-1/2 translate-y-[-50%] text-ui-500 cursor-pointer" :class="{'invisible': query === ''}" name="x-mark"/>
                    </div>
                    <div v-show="searchResultsOpen" class="absolute top-[calc(100%+0.5rem)] w-full max-h-[32rem] bg-ui-900 rounded-md overflow-auto border border-ui-700 z-20">
                        <LevelSearchResult @click="levels.includes(level.id) ? void(0) : submit(level.id)" v-for="(level, key) in results" :key="key" :level="level">
                            <template #side>
                                <div v-if="levels.includes(level.id)" class="x items-center space-x-1 text-green-500">
                                    <span>Added</span>
                                    <Icon name="check"/>
                                </div>
                                <div v-else class="x items-center space-x-1 text-ui-500">
                                    <span v-if="submitLevelForm.processing && submitLevelForm.level_id === level.id">Adding</span>
                                    <span v-else>Add</span>
                                    <div v-if="submitLevelForm.processing && submitLevelForm.level_id === level.id" class="size-5 rounded-full border-2 !border-ui-950 !border-b-blue-500 animate-spin"/>
                                    <Icon v-else name="plus"/>
                                </div>
                            </template>
                        </LevelSearchResult>
                        <p class="px-2 text-center py-2" v-if="results.length === 0 && query.length === 0">Search using a level name or ID</p>
                        <p class="px-2 text-center py-2 italic text-ui-500" v-else-if="results.length === 0">No Results</p>
                    </div>
                </div>
                <Reorder.Group v-if="showList" class="y space-y-2 grow z-10" :class="{'select-none': dragging}" axis="y" v-model:values="form.rankings" @pointerdown="dragging = true" @pointerup="dragging = false">
                    <Reorder.Item v-for="(item, pos) in form.rankings" :key="item" :value="item" class="flex items-center relative group/motion-ticket" :while-drag="{ 'z-index': 30 }" :drag-listener="false" :drag-controls="getCtrl(item, submissions[item].updated_at)">
                        <!--                    <span class="text-2xl font-bold mr-2 text-right w-16">#{{ submissions[item].rank.split('-')[1] ?? '?' }}#{{pos}}</span>-->
                        <div class="text-xl font-bold mr-2 text-center w-16 bg-ui-900 rounded-md px-1 relative">
                            <span>#{{ pos + 1 }}</span>
                            <div v-if="getRank(submissions[item]) !== pos" class="absolute left-1/2 -translate-x-[50%] top-[calc(100%-0.25rem)] bg-ui-800 rounded-full border border-ui-700 pl-2 pr-1 x items-center space-x-0.5">
                                <span class="text-ui-500 text-xs font-base">#{{ getRank(submissions[item]) + 1 }}</span>
                                <Icon v-if="getRank(submissions[item]) - pos > 0" size="16" scale="size-4" name="chevron-up" class="text-green-500"/>
                                <Icon v-else size="16" scale="size-4" name="chevron-down" class="text-red-500"/>
                            </div>
                        </div>
                        <div @pointerdown="e => getCtrl(item, submissions[item].updated_at).start(e)" class="cursor-move reorder-handle x items-center justify-center rounded-md bg-ui-900 p-2.5 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 text-ui-600">
                                <symbol id="svg_4sqline">
                                    <rect x="0%" width="20%" height="20%"></rect>
                                    <rect x="40%" width="20%" height="20%"></rect>
                                    <rect x="80%" width="20%" height="20%"></rect>
                                </symbol>

                                <use href="#svg_4sqline" x="0%" y="0%"></use>
                                <use href="#svg_4sqline" x="0%" y="40%"></use>
                                <use href="#svg_4sqline" x="0%" y="80%"></use>
                            </svg>
                        </div>
                        <span class="absolute bottom-2 right-12 bg-ui-800 rounded-md px-2 z-10 border border-ui-700">From: <Username :card="false" :user="submissions[item].submitter" class="ml-1"/></span>
                        <div v-if="0" class="x items-center space-x-1 absolute bottom-2 right-2 z-50">
                            <Icon name="x-mark" scale="size-5" class="rounded-md bg-ui-800 p-1 text-red-500 border border-ui-700"/>
                            <Icon name="check" scale="size-5" class="rounded-md bg-ui-800 p-1 text-green-500 border border-ui-700"/>
                        </div>
                        <LevelTicket :level="submissions[item].level" :show-ratings="false" :clickable="false" :context-menu="false" fade-type="full" class="grow"/>
                        <Icon @click="deleteSubmission(submissions[item].id)" name="x-mark" scale="size-5" class="rounded-md bg-ui-800 p-1 text-red-500 border border-ui-700 ml-2 cursor-pointer"/>
                    </Reorder.Item>
                </Reorder.Group>
            </div>
        </div>
    </app-layout>
</template>
<style scoped>
.form-card {
    @apply flex items-center px-3 py-1 border rounded-md cursor-pointer select-none gap-2 border-ui-700;
}
</style>
