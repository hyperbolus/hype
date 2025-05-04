<script setup>
import {getGame} from "@/util.js";

const game = getGame();
</script>
<template>
    <div class="x z-30 hidden transition-colors justify-center w-full bg-ui-950">
        <div class="hidden md:flex justify-between w-full items-center lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full text-xs">
            <div class="x divide-x divide-ui-900">
                <a href="https://hyperbolus.com" class="px-2 py-1 transition-colors border-l border-ui-900" :class="game === 'geometrydash' ? 'bg-ui-900' : 'hover:bg-ui-800'">Geometry Dash</a>
                <a href="https://soundodger-community.com" class="px-2 py-1 transition-colors" :class="game === 'soundodger' ? 'bg-ui-900' : 'hover:bg-ui-800'">Soundodger</a>
                <a href="https://userlevels.com/impossible" class="px-2 py-1 transition-colors border-r border-ui-900" :class="game === 'tig' ? 'bg-ui-900' : 'hover:bg-ui-800'">The Impossible Game 2</a>
            </div>
        </div>
    </div>
</template>
