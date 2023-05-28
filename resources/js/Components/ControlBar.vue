<script setup>
import Toggle from '@/Components/Toggle.vue'
import Avatar from '@/Components/Avatar.vue'
import Dropdown from '@/Jetstream/Dropdown.vue'
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import {logout, isDark, toggleDark} from '@/util.js'
import {ref} from "vue";
import {useSettingsStore} from "@/stores/settings.ts";

const mobileNavOpen = ref(false);
const navigation = useSettingsStore().settings['navigation'] ? useSettingsStore().settings['navigation']['value'] : [];
</script>
<template>
    <div class="flex items-center space-x-4">
        <Dropdown>
            <template #trigger>
                <div class="relative">
                                <span v-show="$page.props.user.notifications.length > 0" class="absolute flex -top-0.5 -right-0.5 h-3 w-3">
                                    <span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"></span>
                                    <span class="inline-flex bg-blue-500 rounded-full h-3 w-3"></span>
                                </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clip-rule="evenodd" />
                    </svg>
                </div>
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
        <Link class="relative" :href="route('inbox.index')">
                        <span v-show="$page.props.user.messages > 0" class="absolute flex -top-0.5 -right-0.5 h-3 w-3">
                            <span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"></span>
                            <span class="inline-flex bg-blue-500 rounded-full h-3 w-3"></span>
                        </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clip-rule="evenodd" />
            </svg>
        </Link>
        <Link v-if="$page.props.user.roles.includes('admin')" :href="route('inbox.index')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
        </Link>
        <Dropdown>
            <template #trigger>
                <div class="x transition-colors bg-neutral-100 dark:bg-ui-950 p-1 rounded-full items-center cursor-pointer">
                    <Avatar class="w-8 mr-2" :user="$page.props.user"/>
                    <span>{{ $page.props.user.name }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mx-1 w-5 h-5">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </div>
            </template>
            <template #content>
                <Link :href="route('users.show', $page.props.user.id)" class="block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800">Profile</Link>
                <Link :href="route('settings.home')" class="block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800">Settings</Link>
                <Link v-if="$page.props.user.roles.includes('admin')" :href="route('system.home')" class="block px-2 py-1 hover:bg-neutral-200 dark:hover:bg-ui-800">Admin Panel</Link>
                <template v-if="false">
                    <div class="transition-colors border-t border-t-neutral-300 dark:border-t-ui-700"></div>
                    <label @click.stop class="x items-center justify-between px-2 py-1">
                        <span>Dark Mode</span>
                        <Toggle class="pointer-events-none cursor-pointer" @click="toggleDark" v-model="isDark"/>
                    </label>
                </template>
                    <div class="transition-colors border-t border-t-neutral-300 dark:border-t-ui-700"></div>
                <template v-if="$page.props.user.impersonating">
                    <Link :href="route('impersonate.leave')" class="block px-2 py-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-ui-800">Stop Impersonating</Link>
                    <div class="transition-colors border-t border-t-neutral-300 dark:border-t-neutral-700"></div>
                </template>
                <div @click="logout" class="px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white">Logout</div>
            </template>
        </Dropdown>
    </div>
</template>