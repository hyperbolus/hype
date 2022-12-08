<script setup>
import {ref} from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/inertia-vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Toggle from "@/Components/Toggle.vue";
import {useDark} from "@vueuse/core";
import route from "ziggy-js";
import {useToggle} from "@vueuse/core";
import Avatar from "@/Components/Avatar.vue";
import bg from "@/../images/wellrestedbg.jpg"
import Tooltip from "@/Components/Tooltip.vue";

const props = defineProps({
    title: String,
    background: {
        type: [String, Boolean],
        default: bg
    },
    subtitle: String
});
const logout = () => {
    Inertia.post(route('auth::logout'));
};
const mobileNavOpen = ref(false);

const subnav = ref(0);
const isDark = ref(useDark({
    selector: '#app'
}));
const bgsrc = ref(props.background === false ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=' : (props.background ?? bg));
const toggleDark = () => {
    useToggle(isDark.value)
}
</script>
<template>
    <div ref="base" class="y transition-colors items-center text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800 min-h-screen">
        <Head><title>{{ title }}</title></Head>
        <span class="hidden w-full px-1 py-0.5 x-text-center font-bold text-xs bg-indigo-400 dark:bg-indigo-600">DEV ENVIRONMENT &bull; 127.0.0.1 &bull; <a href="//phpmyadmin" class="underline">PhpMyAdmin</a> &bull; <Link :href="route('system.home')" class="underline">Control Panel</Link> &bull; You've been cunked</span>
        <div class="x z-30 transition-colors justify-center w-full bg-neutral-300 dark:bg-neutral-900">
            <div class="hidden md:flex px-2 items-center divide-x divide-neutral-200 dark:divide-neutral-800 lg:max-w-5xl xl:max-w-6xl w-full text-xs">
                <a class="px-2 py-1 transition-colors bg-neutral-200 dark:bg-neutral-800 border-l dark:border-neutral-800">Geometry Dash</a>
                <Tooltip class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800" :caret="false" message="SpinShare is not affiliated with Hyperbolus websites">
                    <a href="https://spinsha.re">Spin Rhythm</a>
                </Tooltip>
                <a href="https://soundodger-community.com" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">Soundodger</a>
                <a href="https://userlevels.com/snail" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">Would You Snail?</a>
                <a href="https://userlevels.com/impossible" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 !border-r border-neutral-200 dark:border-neutral-800">The Impossible Game 2</a>
            </div>
        </div>
        <div class="y items-center z-20 transition-colors w-full py-4 bg-neutral-200 dark:bg-neutral-800">
            <div class="x px-2 justify-between lg:max-w-5xl xl:max-w-6xl w-full">
                <div class="x items-center space-x-4">
                    <Link @mouseenter="subnav = 0" :href="route('home')" class="font-bold text-2xl select-none"><span class="text-cyan-400">Dash</span>Net</Link>
                    <Link v-if="false" @mouseenter="subnav = 0" :href="route('home')" class="font-bold text-2xl select-none text-amber-500">Soundodger <span class="text-blue-400">Community</span></Link>
                    <div class="hidden md:flex items-center space-x-4">
                        <Link :href="route('forums.index')" class="hover:text-neutral-500 transition transition-colors">Forums</Link>
                        <Tooltip :caret="false">
                            <Link :href="route('levels')" class="hover:text-neutral-500 transition transition-colors">Levels</Link>
                            <template #content>
                                <div class="y divide-y divide-neutral-300 dark:divide-neutral-700 w-32">
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('levels')">Levels Home</Link>
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('levels.index')">Reviews</Link>
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('playlists.index')">Playlists</Link>
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('videos.index')">Videos</Link>
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('tags.index')">Tags</Link>
                                </div>
                            </template>
                        </Tooltip>
                        <Tooltip :caret="false">
                            <Link :href="route('forge')" class="hover:text-neutral-500 transition transition-colors">Forge</Link>
                            <template #content>
                                <div class="y divide-y divide-neutral-300 dark:divide-neutral-700 w-32">
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('forge')">Forge Home</Link>
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('mods.index')">Mods</Link>
                                    <Link class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800" :href="route('styles.index')">Texture&nbsp;Packs</Link>
                                </div>
                            </template>
                        </Tooltip>
                    </div>
                </div>
                <div class="hidden md:flex">
                    <div v-if="$page.props.auth" class="flex items-center space-x-4">
                        <Dropdown>
                            <template #trigger>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clip-rule="evenodd" />
                                </svg>
                            </template>
                            <template #content>
                                <div v-if="$page.props.user.notifications.length === 0" class="px-2 py-1">No new notifications.</div>
                                <div class="rounded overflow-clip">
                                    <div v-for="notification in $page.props.user.notifications" class="px-2 py-1 cursor-pointer hover:bg-neutral-800">
                                        <Link :href="notification.data.link">{{ notification.data.message }}</Link>
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                        <Link :href="route('inbox.index')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                        <Dropdown>
                            <template #trigger>
                                <div class="x transition-colors bg-neutral-100 dark:bg-neutral-900 p-1 rounded-full items-center cursor-pointer">
                                    <Avatar class="w-8 mr-2" :user="$page.props.user"/>
                                    <span>{{ $page.props.user.name }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mx-1 w-5 h-5">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <Link :href="route('users.show', $page.props.user.id)" class="block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">Profile</Link>
                                <Link :href="route('settings.home')" class="block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">Settings</Link>
                                <Link v-if="$page.props.user.roles.includes('admin')" :href="route('system.home')" class="block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">Admin Panel</Link>
                                <div class="border-t border-t-neutral-300 dark:border-t-neutral-700"></div>
                                <label @click.stop class="x items-center justify-between px-2 py-1">
                                    <span>Dark Mode</span>
                                    <Toggle class="pointer-events-none cursor-pointer" @click="toggleDark" v-model="isDark"/>
                                </label>
                                <div class="border-t border-t-neutral-300 dark:border-t-neutral-700"></div>
                                <template v-if="$page.props.user.impersonating">
                                    <Link :href="route('impersonate.leave')" class="block px-2 py-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800">Stop Impersonating</Link>
                                    <div class="border-t border-t-neutral-300 dark:border-t-neutral-700"></div>
                                </template>
                                <div @click="logout" class="px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white">Logout</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div v-else class="x items-center space-x-4">
                        <Link :href="route('auth::login')">Login</Link>
                        <Link :href="route('auth::register')" class="bg-cyan-400 rounded text-white font-bold px-2 py-0.5">Register</Link>
                    </div>
                </div>
                <div class="x md:hidden items-center cursor-pointer">
                    <svg @click="mobileNavOpen = !mobileNavOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            <div v-if="mobileNavOpen" class="y md:hidden w-full space-y-2 mt-4 px-4">
                <Link :href="route('forums.index')">Forums</Link>
                <Link :href="route('levels')">Levels</Link>
                <Link :href="route('forge')">Forge</Link>
                <Link :href="route('search')">Search</Link>
            </div>
        </div>
        <div class="x z-10 transition-colors justify-center w-full bg-neutral-300 dark:bg-neutral-900">
            <div class="x items-center gap-2 justify-between py-2.5 px-2 lg:max-w-5xl xl:max-w-6xl w-full text-xs">
                <div class="x space-x-2">
                    <Link :href="route('home')">DashNet</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                    <slot name="breadcrumbs"/>
                </div>
                <div class="x">
                    <span v-if="!subtitle && (bg === bgsrc)">Featured Artwork by <span class="cursor-pointer underline">overdefo</span></span>
                    <span v-if="subtitle">{{ subtitle }}</span>
                </div>
            </div>
        </div>
        <slot class="z-10" name="header"/>
        <div class="y z-0 overflow-clip relative flex-grow w-full">
            <div class="absolute top-0 w-full h-fit" :style="'-webkit-mask:linear-gradient(white 0%, transparent);background-image: url(\'' + bgsrc + '\');background-size:cover;background-position:top;'">
                <img class="h-full w-full m-auto invisible" :src="bgsrc" alt="Featured Background"/>
            </div>
            <div class="y flex-grow relative h-full items-center w-full">
                <slot/>
            </div>
        </div>
        <div class="y p-4 transition-colors items-center w-full bg-neutral-100 dark:bg-neutral-900">
            <div class="px-4 lg:max-w-5xl xl:max-w-6xl w-full">
                <div class="flex justify-between w-full text-neutral-400 dark:text-neutral-500">
                    <div>
                        <span>&copy; Hyperbolus 2022</span>
                    </div>
                    <div class="flex space-x-6">
                        <Link :href="route('legal.privacy')">Privacy Policy</Link>
                        <Link :href="route('legal.terms')">Terms of Service</Link>
                        <Link :href="route('users.index')">Users</Link>
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
    </div>
</template>
