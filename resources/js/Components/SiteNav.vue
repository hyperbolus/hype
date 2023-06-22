<script setup>
import Tooltip from '@/Components/Tooltip.vue'
import Toggle from '@/Components/Toggle.vue'
import Avatar from '@/Components/Avatar.vue'
import Dropdown from '@/Jetstream/Dropdown.vue'
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import {logout, isDark, toggleDark} from '@/util.js'
import {ref} from "vue";
import SearchBar from "@/Components/SearchBar.vue";
import SiteLogo from "@/Components/SiteLogo.vue";
import {useSettingsStore} from "@/stores/settings.ts";
import ControlBar from "@/Components/ControlBar.vue";

const mobileNavOpen = ref(false);
const navigation = useSettingsStore().settings['navigation'] ? useSettingsStore().settings['navigation']['value'] : [];
</script>
<template>
    <div class="y group/nav items-center relative w-full py-4 bg-ui-900">
        <div class="x z-10 transition-opacity opacity-0 group-hover/nav:opacity-100 absolute w-full h-48 pointer-events-none top-full bg-gradient-to-b from-ui-900 to-transparent">

        </div>
        <div class="x px-2 gap-4 justify-between lg:max-w-5xl xl:max-w-6xl w-full">
            <div class="x items-center space-x-4">
                <SiteLogo/>
                <div class="hidden md:flex items-center space-x-4 text-sm">
                    <span v-if="navigation.length === 0" class="text-red-500">No key 'navigation' defined in site settings</span>
                    <template v-for="(node, key) in navigation">
                        <Tooltip v-if="node.hasOwnProperty('children')" :caret="false" :decoration="false">
                            <div class="x items-center">
                                <Link :href="route(node.route)" class="hover:text-ui-500 transition-colors">{{ node.name }}</Link>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <template #content>
                                <div class="y -divide-y -divide-ui-700 min-w-[8rem] -ml-2">
                                    <Link v-for="(child, key) in node.children" :key="key" class="px-2 py-1 hover:bg-ui-800 rounded" :href="route(child.route)"><span class="bg-green-400 rounded-full px-[0.15rem] mr-2"></span> {{ child.name }}</Link>
                                </div>
                            </template>
                        </Tooltip>
                        <Link v-else :href="route(node.route)" class="hover:text-ui-500 transition-colors">{{ node.name }}</Link>
                    </template>
                </div>
            </div>
            <ControlBar class="hidden md:flex"/>
            <div class="x md:hidden items-center cursor-pointer">
                <svg @click="mobileNavOpen = !mobileNavOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    </div>
    <div v-if="mobileNavOpen" class="y md:hidden relative z-20 bg-ui-900 w-full pb-1 space-y-2">
        <ControlBar v-if="$page.props.auth" class="justify-center bg-ui-900 py-1 border-y border-ui-700"/>
        <template v-for="(node, key) in navigation">
            <Link :href="route(node.route)" class="hover:text-ui-500 transition-colors px-4">{{ node.name }}</Link>
            <div v-if="node.hasOwnProperty('children')" class="y bg-ui-200">
                <Link v-for="(child, key) in node.children" :key="key" class="px-8 py-1 bg-ui-800 hover:bg-ui-700" :href="route(child.route)">{{ child.name }}</Link>
            </div>
        </template>
        <div v-if="!$page.props.auth" class="x gap-2 px-2 border-t pt-3 pb-2 border-ui-700 text-center">
            <Link :href="route('auth::login')" class="w-1/2 bg-ui-700 text-ui-200 rounded-md font-bold px-2 py-1">Login</Link>
            <Link :href="route('auth::register')" class="w-1/2 bg-ui-700 text-ui-200 rounded-md font-bold px-2 py-1">Register</Link>
        </div>
    </div>
</template>
