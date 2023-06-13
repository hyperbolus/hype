<script setup>
import {Link} from '@inertiajs/vue3'
import route from 'ziggy-js'
import {useSettingsStore} from "@/stores/settings.ts";

const game = useSettingsStore().settings['game'] ? useSettingsStore().settings['game']['value'] : '';
</script>
<template>
    <span v-if="!game" class="text-red-500">No game defined</span>
    <Link v-if="game === 'soundodger'" :href="route('home')" class="font-bold text-2xl select-none"><span class="text-transparent bg-gradient-to-r from-red-600 to-fuchsia-600 bg-clip-text">Hyperdodger</span></Link>
    <Link v-if="game === 'geometrydash'" :href="route('home')" class="font-bold text-2xl select-none"><span class="text-cyan-400">GD</span>Forums</Link>
</template>
