<script setup>
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import Toggle from "@/Components/Toggle.vue";
import {toggleDark, isDark} from '../util.js'
</script>
<template>
    <div class="x justify-center w-full mt-4">
        <div class="x items-start gap-2 justify-between lg:max-w-5xl xl:max-w-6xl w-full text-xs px-2 border border-ui-800 bg-ui-900 md:rounded-lg">
            <div class="x space-x-2 py-2">
                <Link :href="route('home')">GD Forums</Link>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
                <slot/>
            </div>
            <div class="!hidden flex items-center h-full">
                <label @click.stop class="flex items-center cursor-pointer gap-2">
                    <span class="text-xs font-bold opacity-60">DARK MODE</span>
                    <input type="checkbox" class="rounded pointer-events-none" @click="toggleDark" v-model="isDark"/>
                </label>
            </div>
        </div>
    </div>
</template>
