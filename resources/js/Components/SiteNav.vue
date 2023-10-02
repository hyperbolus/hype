<script setup>
import Tooltip from '@/Components/Tooltip.vue'
import Toggle from '@/Components/Toggle.vue'
import Avatar from '@/Components/Avatar.vue'
import Dropdown from '@/Jetstream/Dropdown.vue'
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import {logout, isDark, toggleDark, isAuthenticated} from '@/util.js'
import {ref} from "vue";
import SearchBar from "@/Components/SearchBar.vue";
import SiteLogo from "@/Components/SiteLogo.vue";
import {useSettingsStore} from "@/stores/settings.ts";
import ControlBar from "@/Components/ControlBar.vue";

const mobileNavOpen = ref(false);
const navigation = useSettingsStore().settings['navigation'] ? useSettingsStore().settings['navigation']['value'] : [];
</script>
<template>
    <div class="y items-center relative w-full bg-ui-900">
        <div class="hidden md:flex z-10 transition-opacity opacity-0 group-hover/nav:opacity-100 absolute w-full h-48 pointer-events-none top-full bg-gradient-to-b from-ui-900 via-ui-900/75 to-ui-900/75 border-b-2 border-ui-600">

        </div>
        <div class="x px-2 gap-4 justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
            <div class="x items-center space-x-4">
                <SiteLogo class="py-4"/>
                <div class="hidden md:flex group/nav h-full items-center text-sm">
                    <div class="hidden md:flex z-10 transition-opacity left-0 opacity-0 group-hover/nav:opacity-100 absolute w-full h-48 pointer-events-none top-full bg-gradient-to-b from-ui-900 via-ui-900/75 to-ui-900/0 -border-b-2 -border-ui-600">

                    </div>
                    <span v-if="navigation.length === 0" class="text-red-500">No key 'navigation' defined in site settings</span>
                    <template v-for="(node, key) in navigation">
                        <Tooltip v-if="node.hasOwnProperty('children')" container-class="top-full" class="h-full mr-4 x items-center" :caret="false" :decoration="false">
                            <div class="x items-center">
                                <Link :href="route(node.route)" class="hover:text-ui-500 transition-colors">{{ node.name }}</Link>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <template #content>
                                <div class="y -divide-y -divide-ui-700 min-w-[8rem] -ml-2 -mt-4">
                                    <Link v-for="(child, key) in node.children" :key="key" class="group/nav-link px-2 py-1 hover:hover:bg-ui-800/75 rounded" :href="route(child.route)"><span class="bg-transparent group-hover/nav-link:bg-green-400 rounded-full px-[0.15rem] mr-2"></span> {{ child.name }}</Link>
                                </div>
                            </template>
                        </Tooltip>
                        <Link v-else :href="route(node.route)" class="hover:text-ui-500 transition-colors mr-4">{{ node.name }}</Link>
                    </template>
                </div>
            </div>
            <div class="hidden md:flex items-center">
                <ControlBar/>
            </div>
            <div class="x md:hidden items-center cursor-pointer">
                <svg v-if="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
                <svg v-else @click="mobileNavOpen = !mobileNavOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    </div>
    <div v-if="mobileNavOpen" class="y md:hidden relative z-20 bg-ui-900 w-full pb-1 space-y-2" :class="{'pb-2': isAuthenticated()}">
        <ControlBar v-if="isAuthenticated()" class="justify-center bg-ui-900 py-1 border-y border-ui-700"/>
        <template v-for="(node, key) in navigation">
            <details v-if="node.hasOwnProperty('children')" class="y group/subnav bg-ui-900">
                <summary class="x items-center justify-between px-4 pb-2">
                    <span>{{ node.name }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 group-open/subnav:-rotate-90">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                </summary>
                <Link v-for="(child, key) in node.children" :key="key" class="px-8 py-1 bg-ui-800 hover:bg-ui-700" :href="route(child.route)">{{ child.name }}</Link>
            </details>
            <Link v-else :href="route(node.route)" class="hover:text-ui-500 transition-colors px-4">{{ node.name }}</Link>
        </template>
        <div v-if="!isAuthenticated()" class="x space-x-2 px-2 border-t pt-3 border-ui-700 text-center">
            <Link :href="route('auth::login')" class="w-1/2 bg-ui-700 text-ui-200 rounded-md font-bold px-2 py-1">Login</Link>
            <Link :href="route('auth::register')" class="w-1/2 bg-ui-700 text-ui-200 rounded-md font-bold px-2 py-1">Register</Link>
        </div>
    </div>
</template>
