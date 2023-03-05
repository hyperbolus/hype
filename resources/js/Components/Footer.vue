<script setup>
import Toggle from "@/Components/Toggle.vue";
import {toggleDark, isDark} from "@/util";
</script>
<template>
    <div class="y p-4 transition-colors items-center w-full bg-neutral-100 dark:bg-neutral-900">
        <div class="px-4 lg:max-w-5xl xl:max-w-6xl w-full">
            <div class="flex justify-between items-center w-full text-neutral-400 dark:text-neutral-500">
                <div>
                    <span>&copy; Hyperbolus 2022</span>
                </div>
                <div class="hidden md:flex bg-neutral-800 py-0.5 px-2 rounded text-sm">
                    <template v-if="true /*&& (bg === bgsrc)*/">
                        <span>Featured Artwork by <span class="cursor-pointer underline">overdefo</span></span>
                    </template>
                </div>
                <div class="flex space-x-6">
                    <label @click.stop class="flex items-center cursor-pointer">
                        <Toggle class="pointer-events-none mr-2" @click="toggleDark" v-model="isDark"/>
                        <span class="y leading-none text-xs font-bold opacity-60">
                            <span>DARK</span>
                            <span>MODE</span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
