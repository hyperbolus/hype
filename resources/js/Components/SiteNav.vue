<script setup>
import Dropdown from '@/Jetstream/Dropdown.vue'
import {Link} from '@inertiajs/vue3'
import route from 'ziggy-js'
import {isAuthenticated} from '@/util.js'
import {ref} from "vue";
import SearchBar from "@/Components/SearchBar.vue";
import SiteLogo from "@/Components/SiteLogo.vue";
import {useSettingsStore} from "@/stores/settings.ts";
import ControlBar from "@/Components/ControlBar.vue";
import Icon from "@/Components/Icon.vue";

const mobileNavOpen = ref(false);
const navigation = useSettingsStore().settings['navigation'] ? useSettingsStore().settings['navigation']['value'] : [];
</script>
<template>
    <div class="y items-center w-full bg-ui-900">
        <div class="x gap-4 justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full px-4">
            <div class="x items-center space-x-2">
                <SiteLogo class="py-4"/>
                <div class="hidden md:flex h-full items-center text-sm">
                    <span v-if="navigation.length === 0" class="text-red-500">No key 'navigation' defined in site settings</span>
                    <template v-for="(node, key) in navigation">
                        <Dropdown v-if="node.hasOwnProperty('children')" align="left" container-classes="shadow-xl w-[32rem] top-[80%]" class="h-full x items-center">
                            <template #trigger>
                                <div class="x items-center hover:bg-ui-950 px-3 py-2 rounded">
                                    <Icon class="w-4 w-4" :name="node.icon" size="20" type="solid"/>
                                    <div class="ml-2 transition-colors">{{ node.name }}</div>
                                </div>
                            </template>
                            <template #content>
                                <div class="y">
                                    <div class="p-2" :class="node.type === 'list' ? 'y space-y-2' : 'grid grid-cols-2 gap-2'">
                                        <Link :href="route(child.route)" v-for="(child, key) in node.children" :key="key" class="block relative group/nav-link" :class="{'last:col-span-2': node.children.length % 2}">
                                            <div class="x space-x-3 h-full items-center py-2 px-4">
                                                <Icon class="w-6 w-6 group-hover/nav-link:[filter:drop-shadow(0_0_3px_rgb(103_232_249))]" :name="child.icon" size="20" type="solid"/>
                                                <div class="y">
                                                    <h3 class="font-bold text-emerald-400">{{ child.name }}</h3>
                                                    <h4 class="text-xs">{{ child.description ?? ':3' }}</h4>
                                                </div>
                                            </div>
                                            <div class="absolute inset-0 group-hover/nav-link:[filter:drop-shadow(0_0_3px_rgb(103_232_249))] border border-transparent rounded hover:border-cyan-200"></div>
                                        </Link>
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <Link v-else :href="route(node.route)" class="x block hover:bg-ui-950 px-3 py-2 rounded transition-colors">
                            <Icon class="w-4 w-4" :name="node.icon" size="20" type="solid"/>
                            <span class="ml-1">{{ node.name }}</span>
                        </Link>
                    </template>
                </div>
            </div>
            <div class="hidden md:flex items-center">
                <SearchBar class="mr-4"/>
                <ControlBar/>
            </div>
            <div class="x md:hidden items-center cursor-pointer">
                <SearchBar class="mr-4"/>
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
        <div class="x items-center justify-center">
            <ControlBar v-if="isAuthenticated()" class="justify-center bg-ui-900 py-1 border-y border-ui-700"/>
        </div>
        <template v-for="(node, key) in navigation">
            <details v-if="node.hasOwnProperty('children')" class="y group/subnav bg-ui-900">
                <summary class="x items-center justify-between px-4 pb-2">
                    <span>{{ node.name }}</span>
                    <Icon class="w-6  group-open/subnav:-rotate-90 transition-transform duration-200" name="chevron-left"/>
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
<style scoped>
details summary::-webkit-details-marker {
    display:none;
}
</style>
