<script setup>
import {getPrefs, PREFS_KEY, PREFS_VERSION, siteName, togglePrefs} from "../util.js";
import Icon from "@/Components/Icon.vue";
import Toggle from "@/Components/Toggle.vue";
import {ref} from "vue";

const prefs = getPrefs();

const data = ref({
    'zen': {
        name: 'Zen Mode',
        description: 'Hides all ratings and scores site-wide.',
        type: Boolean,
    },
    'rating_comparators': {
        name: 'Rating Comparison Icons',
        description: 'Shows icons (arrows, plus, equals) next to ratings which compare the rating to the level\'s average.',
        type: Boolean,
    },
});
</script>
<template>
    <div v-show="prefs.open" class="flex justify-center items-center bg-black/50 fixed inset-0 backdrop-blur-sm z-50">
        <div class="space-y-2 pane border border-ui-700 shadow-xl md:w-full md:max-w-xl absolute">
            <div class="x items-center justify-between">
                <h2 class="text-2xl font-bold">Preferences</h2>
                <Icon @click="togglePrefs()" name="x-mark" scale="size-6" class="cursor-pointer"/>
            </div>
            <p>Manage your preferences on {{ siteName() }}</p>
            <div v-for="(pref, key) in data" class="flex gap-2 bg-ui-950 pl-3 pr-2 py-2 rounded-lg">
                <div class="grow">
                    <h2>{{pref.name}}</h2>
                    <p class="text-sm text-ui-500">{{ pref.description}}</p>
                </div>
                <Toggle :title="key" v-model="prefs.data[key]"/>
            </div>
            <p class="font-mono text-xs text-ui-600 text-right">{{ PREFS_KEY }} v{{PREFS_VERSION}}</p>
        </div>
    </div>
</template>
