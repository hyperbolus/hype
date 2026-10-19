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
        <div class="x gap-2 items-center justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full px-4">
            <div class="x items-center py-4 grow">
                <SiteLogo class="mr-2"/>
                <div class="hidden md:flex h-full items-center text-sm">
                    <span v-if="navigation.length === 0" class="text-red-500">No key 'navigation' defined in site settings</span>
                    <template v-for="(node, key) in navigation">
                        <Dropdown v-if="node.hasOwnProperty('children')" align="left" container-classes="shadow-xl w-[32rem] top-[80%]" class="h-full x items-center">
                            <template #trigger>
                                <div class="x items-center hover:bg-ui-950 px-3 py-2 rounded-lg">
                                    <Icon scale="size-4" :name="node.icon"/>
                                    <div class="ml-2 transition-colors">{{ node.name }}</div>
                                </div>
                            </template>
                            <template #content>
                                <div class="y">
                                    <div class="p-2" :class="node.type === 'list' ? 'y space-y-2' : 'grid grid-cols-2 gap-2'">
                                        <Link :href="route(child.route)" v-for="(child, key) in node.children" :key="key" class="block relative group/nav-link" :class="{'last:col-span-2': node.children.length % 2}">
                                            <div class="x space-x-3 h-full items-center py-2 px-4">
                                                <Icon scale="size-6" class="group-hover/nav-link:[filter:drop-shadow(0_0_3px_rgb(103_232_249))]" :name="child.icon"/>
                                                <div class="y">
                                                    <h3 class="font-bold text-emerald-400">{{ child.name }}</h3>
                                                    <h4 class="text-xs">{{ child.description ?? ':3' }}</h4>
                                                </div>
                                            </div>
                                            <div class="absolute inset-0 group-hover/nav-link:[filter:drop-shadow(0_0_3px_rgb(103_232_249))] border border-transparent rounded-lg hover:border-cyan-200"></div>
                                        </Link>
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <Link v-else :href="route(node.route)" class="x block hover:bg-ui-950 px-3 py-2 rounded-lg transition-colors">
                            <Icon scale="size-4" :name="node.icon"/>
                            <span class="ml-2">{{ node.name }}</span>
                        </Link>
                    </template>
                </div>
                <Link :href="route('supporter')" class="hidden md:flex text-sm items-center gap-1.5 text-[#d28eff] font-bold hover:bg-ui-950 px-3 py-2 rounded-lg">
                    <Icon name="heart"/>
                    <span>Supporter</span>
                </Link>
            </div>
            <SearchBar class="mr-4"/>
            <div class="hidden md:block">
                <ControlBar/>
            </div>
            <div class="x md:hidden items-center cursor-pointer">
                <Icon v-if="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen" name="x-mark" size="24" type="outline" scale="size-6"/>
                <Icon v-else @click="mobileNavOpen = !mobileNavOpen" name="bars-3" size="24" type="outline" scale="size-6"/>
            </div>
        </div>
    </div>
    <div v-if="mobileNavOpen" class="y md:hidden relative z-20 bg-ui-900 w-full pb-1 space-y-2" :class="{'pb-2': isAuthenticated()}">
        <div class="x items-center justify-center">
            <ControlBar v-if="isAuthenticated()" class="justify-center bg-ui-900 py-1 border-y border-ui-700"/>
        </div>
        <template v-for="(node, key) in navigation">
            <details v-if="node.hasOwnProperty('children')" class="group/subnav bg-ui-900">
                <summary class="x items-center justify-between px-4 pb-2">
                    <span>{{ node.name }}</span>
                    <Icon scale="size-6" class="group-open/subnav:-rotate-90 transition-transform duration-200" name="chevron-left"/>
                </summary>
                <div class="y">
                    <Link v-for="(child, key) in node.children" :key="key" class="px-8 py-1 bg-ui-800 hover:bg-ui-700" :href="route(child.route)">{{ child.name }}</Link>
                </div>
            </details>
            <Link v-else :href="route(node.route)" class="hover:text-ui-500 transition-colors px-4">{{ node.name }}</Link>
        </template>
        <div v-if="!isAuthenticated()" class="flex space-x-2 px-2 border-t pt-3 border-ui-700 text-center">
            <Link :href="route('auth::login')" class="w-1/2 bg-ui-700 text-ui-200 rounded-lg font-bold px-2 py-1">Login</Link>
            <Link :href="route('auth::register')" class="w-1/2 bg-ui-700 text-ui-200 rounded-lg font-bold px-2 py-1">Register</Link>
        </div>
        <Link :href="route('supporter')" class="flex items-center gap-1 text-[#d28eff] font-bold px-2 py-1 justify-center">
            <Icon name="heart"/>
            <span>Support Us!</span>
        </Link>
    </div>
</template>
<style scoped>
details summary::-webkit-details-marker {
    display:none;
}
</style>
