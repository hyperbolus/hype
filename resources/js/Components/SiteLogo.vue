<script setup>
import {Link} from '@inertiajs/vue3'
import route from 'ziggy-js'
import {useSettingsStore} from "@/stores/settings.ts";
import {getGame} from "@/util.js";

const game = getGame();
</script>
<template>
    <Link :href="route('home')" class="font-bold text-2xl select-none">
        <span v-if="!game" class="text-red-500">No game defined</span>
        <span v-if="game === 'soundodger'" class="text-transparent bg-gradient-to-r from-red-600 to-fuchsia-600 bg-clip-text">Hyperdodger</span>
        <span v-if="game === 'geometrydash'" class="text-transparent bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text">Hyperbolus</span>
        <span v-if="game === 'tig'"><span class="text-cyan-400">TIG</span>Community</span>
    </Link>
</template>
