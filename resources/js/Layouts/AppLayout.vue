<script setup>
import { ref } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/inertia-vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";

defineProps({
    title: String,
});
const logout = () => {
    Inertia.post(route('auth::logout'));
};
const mobileNavOpen = ref(false);

const subnav = ref(0);
</script>
<template>
    <div class="flex flex-col items-center text-neutral-300 bg-neutral-800 min-h-screen">
        <Head><title>{{ title }}</title></Head>
        <div class="flex-col items-center w-full text-neutral-300 py-4 flex bg-neutral-800">
            <div class="flex justify-between px-4 lg:max-w-5xl xl:max-w-6xl w-full">
                <div class="flex items-center space-x-4">
                    <Link @mouseenter="subnav = 0" :href="route('home')" class="font-bold text-3xl"><span class="text-cyan-400">Dash</span>Net</Link>
                    <div class="hidden md:flex items-center space-x-4">
                        <Link @mouseenter="subnav = 0" :href="route('forums.index')" class="hover:text-neutral-500 transition transition-colors">Forums</Link>
                        <Link @mouseenter="subnav = 1" :href="route('levels')" class="hover:text-neutral-500 transition transition-colors">Levels</Link>
                        <Link @mouseenter="subnav = 2" :href="route('forge')" class="hover:text-neutral-500 transition transition-colors">Forge</Link>
                        <Link @mouseenter="subnav = 3" :href="route('forge')" class="hover:text-neutral-500 transition transition-colors">GDPS</Link>
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
                        <Dropdown>
                            <template #trigger>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clip-rule="evenodd" />
                                </svg>
                            </template>
                            <template #content>
                                <div class="px-2 py-1 ">No new messages.</div>
                            </template>
                        </Dropdown>
                        <Dropdown>
                            <template #trigger>
                                <div class="flex items-center cursor-pointer">
                                    <span>{{ $page.props.user.name }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </template>
                            <template #content>
                                <div class="px-2 py-1 cursor-pointer hover:bg-neutral-800 rounded-t">Profile</div>
                                <div class="border-t border-t-neutral-700"></div>
                                <div class="px-2 py-1 cursor-pointer hover:bg-neutral-800">Settings</div>
                                <Link href="/admin" class="block px-2 py-1 cursor-pointer hover:bg-neutral-800">Admin Panel</Link>
                                <div class="border-t border-t-neutral-700"></div>
                                <div class="px-2 py-1 cursor-pointer hover:bg-neutral-800">Dark Mode</div>
                                <div class="px-2 py-1 cursor-pointer hover:bg-neutral-800">English</div>
                                <div class="border-t border-t-neutral-700"></div>
                                <div @click="logout" class="px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white rounded-b">Logout</div>
                            </template>
                        </Dropdown>
                    </div>
                    <div v-else class="flex items-center space-x-4">
                        <Link :href="route('auth::login')">Login</Link>
                        <Link :href="route('auth::register')">Register</Link>
                    </div>
                </div>
                <div class="flex md:hidden items-center cursor-pointer">
                    <svg @click="mobileNavOpen = !mobileNavOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            <div v-if="mobileNavOpen" class="flex md:hidden flex-col w-full space-y-2 mt-4 px-4">
                <Link :href="route('forums.index')">Forums</Link>
                <Link :href="route('levels')">Levels</Link>
                <Link :href="route('forge')">Forge</Link>
                <Link :href="route('forge')">GDPS</Link>
            </div>
        </div>
        <div @mouseleave="subnav = 0" class="flex flex-col items-center w-full bg-neutral-900 text-neutral-50">
            <div v-if="subnav === 0" class="flex items-center py-2.5 px-4 lg:max-w-5xl xl:max-w-6xl w-full text-xs space-x-2">
                <Link :href="route('home')">DashNet</Link>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
                <slot name="breadcrumbs"/>
            </div>
            <div v-if="subnav === 1" class="flex items-center py-2 px-4 lg:max-w-5xl xl:max-w-6xl w-full text-sm space-x-4">
                <Link :href="route('levels.index')">Reviews</Link>
                <Link :href="route('contests.index')">Contests</Link>
                <Link :href="route('playlists.index')">Playlists</Link>
            </div>
            <div v-if="subnav === 2" class="flex items-center py-2 px-4 lg:max-w-5xl xl:max-w-6xl w-full text-sm space-x-4">
                <Link :href="route('mods.index')">Mods</Link>
                <Link :href="route('mods.index')">Styles</Link>
                <Link :href="route('client')">Client</Link>
            </div>
            <div v-if="subnav === 3" class="flex items-center py-2 px-4 lg:max-w-5xl xl:max-w-6xl w-full text-sm space-x-4">
                <Link :href="route('home')">Pricing</Link>
                <Link :href="route('home')">Index</Link>
                <Link :href="route('home')">Control Panel</Link>
            </div>
        </div>
        <div class="flex justify-center mb-auto w-full">
            <slot/>
        </div>
        <div class="flex flex-col p-4 items-center w-full bg-neutral-900 text-neutral-50">
            <div class="border-t border-t-neutral-800">

            </div>
            <div>
                <span class="pb-4 text-neutral-600">&copy; GD Forums 2022</span>
            </div>
        </div>
    </div>
</template>
