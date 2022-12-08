<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';
import Toggle from './../Components/Toggle.vue'
import {useDark, useToggle} from "@vueuse/core";
import {ref} from "vue";

const isDark = ref(useDark({
    selector: '#app'
}));

const toggleDark = () => {
    useToggle(isDark.value)
}
</script>
<template>
    <div ref="base" class="y items-center text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 min-h-screen">
        <Head><title>{{ title }}</title></Head>
        <div class="x z-30 justify-center w-full bg-neutral-300 dark:bg-neutral-900">
            <div class="hidden md:flex px-2 items-center divide-x divide-neutral-200 dark:divide-neutral-800 lg:max-w-5xl xl:max-w-6xl w-full text-xs">
                <a class="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 border-l dark:border-neutral-800 hover:bg-neutral-800">Dandelion</a>
                <a href="https://soundodger-community.com" class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">Editor Collab</a>
                <a href="https://userlevels.com/snail" class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-800">Geode</a>
            </div>
        </div>
        <div class="y items-center z-20 w-full py-4 bg-neutral-200 dark:bg-neutral-800">
            <div class="x px-2 justify-between lg:max-w-5xl xl:max-w-6xl w-full">
                <div class="x items-center space-x-4">
                    <Link @mouseenter="subnav = 0" :href="route('home')" class="font-bold text-2xl select-none text-fuchsia-500">Dandelion</Link>
                    <Link v-if="false" @mouseenter="subnav = 0" :href="route('home')" class="font-bold text-2xl select-none text-amber-500">Soundodger <span class="text-blue-400">Community</span></Link>
                    <div class="hidden md:flex items-center space-x-4">
                        <Link :href="route('forums.index')" class="hover:text-neutral-500 transition transition-colors">Download</Link>
                        <Link :href="route('forums.index')" class="hover:text-neutral-500 transition transition-colors">Features</Link>
                        <Link :href="route('forums.index')" class="hover:text-neutral-500 transition transition-colors">FAQ</Link>
                    </div>
                </div>
                <div class="hidden md:flex">
                    <div v-if="$page.props.auth" class="flex items-center space-x-4">
                        <Link :href="route('inbox.index')">

                        </Link>
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
        <main class="y flex-grow items-center relative h-full w-full">
            <div class="lg:max-w-5xl xl:max-w-6xl w-full">
                <h1 class="mt-32 font-bold text-[6rem] leading-none uppercase"><span class="text-fuchsia-500">Power-up</span> your GD<br/>Experience</h1>
                <div class="x float-right space-x-2">
                    <div class="rounded text-xl font-bold px-2 py-1 bg-fuchsia-500">Download</div>
                    <div class="rounded text-xl font-bold px-2 py-1 bg-neutral-200 text-neutral-800">GitHub</div>
                </div>
            </div>
        </main>
        <div class="y p-4 items-center w-full bg-neutral-200 dark:bg-neutral-800">
            <div class="px-4 lg:max-w-5xl xl:max-w-6xl w-full">
                <div class="flex justify-between w-full text-neutral-400 dark:text-neutral-500">
                    <div>
                        <span>&copy; Alk 2022</span>
                    </div>
                    <div class="flex space-x-6">
                        <Link :href="route('users.index')">GitHub</Link>
                        <Link :href="route('users.index')">Discord</Link>
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
<style>
main {
    background-image: radial-gradient(#404040 1px, transparent 0);
    background-size: 40px 40px;
    background-position: 5px 5px;
}
</style>
