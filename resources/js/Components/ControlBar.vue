<script setup>
import Toggle from '@/Components/Toggle.vue'
import Avatar from '@/Components/Avatar.vue'
import Dropdown from '@/Jetstream/Dropdown.vue'
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import {logout, isDark, toggleDark, isAdmin, isModerator} from '@/util.js'
import {ref} from "vue";
import {useSettingsStore} from "@/stores/settings.ts";
import Icon from "@/Components/Icon.vue";
import Lightbox from "@/Components/Lightbox.vue";
import Button from "@/Jetstream/Button.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import {useStorage} from "@vueuse/core";

const mobileNavOpen = ref(false);
const navigation = useSettingsStore().settings['navigation'] ? useSettingsStore().settings['navigation']['value'] : [];

const instantLogout = useStorage('instantLogout', false)
</script>
<template>
    <div v-if="$page.props.auth" class="flex items-center space-x-4 w-full">
        <Dropdown align="var" container-classes="origin-top-left -left-12 sm:origin-top-right md:right-0 md:left-auto min-w-[20rem]">
            <template #trigger>
                <div class="relative">
                    <span v-show="$page.props.user.notifications.length > 0" class="absolute flex -top-0.5 -right-0.5 h-3 w-3">
                        <span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"></span>
                        <span class="inline-flex bg-blue-500 rounded-full h-3 w-3"></span>
                    </span>
                    <Icon class="w-5" size="24" name="bell"/>
                </div>
            </template>
            <template #content>
                <div @click.stop class="y rounded overflow-hidden text-sm cursor-auto">
                    <div class="bg-ui-700 px-4 py-2 font-bold">{{ $page.props.user.notifications.length }} Unread Notifications</div>
                    <Link v-for="notification in $page.props.user.notifications" :href="route('notifications.read', notification.id)" class="x items-center space-x-2 px-2 py-2 cursor-pointer hover:bg-ui-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="shrink-0 w-4 h-4">
                            <path fill="currentColor" d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64h112c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96h-96v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"/>
                        </svg>
                        <span>{{ notification.data.message }}</span>
                    </Link>
                    <div v-if="$page.props.user.notifications.length === 0" class="text-center text-ui-500 px-2 py-2">All caught up! :)</div>
                    <div class="x justify-center space-x-2 bg-ui-700 px-4 py-2">
                        <span class="!hidden rounded bg-ui-800 px-2 py-1">View All</span>
                        <Link :href="route('notifications.clear')" class="rounded bg-ui-800 px-2 py-1">Mark All Read</Link>
                    </div>
                </div>
            </template>
        </Dropdown>
        <Link class="relative" :href="route('inbox.index')">
            <span v-show="$page.props.user.messages > 0" class="absolute flex -top-0.5 -right-0.5 h-3 w-3">
                <span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"></span>
                <span class="inline-flex bg-blue-500 rounded-full h-3 w-3"></span>
            </span>
            <Icon class="w-5" size="24" name="chat-bubble-oval-left"/>
        </Link>
        <Link v-if="isModerator() || isAdmin()" :href="route('moderation.reports.index')">
            <Icon class="w-5" size="24" name="exclamation-triangle"/>
        </Link>
        <Dropdown class="shrink-0">
            <template #trigger>
                <div class="x bg-ui-950 p-1 rounded-full items-center cursor-pointer">
                    <Avatar class="w-8 mr-2" :user="$page.props.user"/>
                    <span>{{ $page.props.user.name }}</span>
                    <Icon class="w-5 mx-1" size="20" name="chevron-down"/>
                </div>
            </template>
            <template #content>
                <Link :href="route('users.show', $page.props.user.id)" class="block px-2 py-1 hover:bg-ui-800">Profile</Link>
                <Link :href="route('settings.home')" class="block px-2 py-1 hover:bg-ui-800">Settings</Link>
                <Link v-if="$page.props.user.roles.includes('admin')" :href="route('system.home')" class="block px-2 py-1 hover:bg-ui-800">Admin Panel</Link>
                <template v-if="false">
                    <div class="border-t border-t-ui-700"></div>
                    <label @click.stop class="x items-center justify-between px-2 py-1">
                        <span>Dark Mode</span>
                        <Toggle class="pointer-events-none cursor-pointer" @click="toggleDark" v-model="isDark"/>
                    </label>
                </template>
                <template v-if="$page.props.user.impersonating">
                    <Link :href="route('impersonate.leave')" class="block px-2 py-1 cursor-pointer hover:bg-ui-800">Stop Impersonating</Link>
                </template>
                <div>
                    <div v-if="instantLogout" @click="logout" class="px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white rounded-b-md">Logout</div>
                    <Lightbox @click.prevent classes="!border-t-none">
                        <div v-if="!instantLogout" class="px-2 py-1 cursor-pointer hover:bg-red-500 text-red-500 hover:text-white rounded-b-md">Logout</div>
                        <template #content="props">
                            <div @click.stop class="y space-y-2 items-center rounded-md cursor-auto bg-ui-900 text-ui-200 p-6 shadow-xl w-full">
                                <h1 class="font-bold text-2xl">Logout</h1>
                                <p class="mt-2">Are you sure you want to log out?</p>
                                <label class="x items-center space-x-1">
                                    <Checkbox v-model="instantLogout"/>
                                    <span>Don't ask me again</span>
                                </label>
                                <div class="x space-x-2">
                                    <button @click="logout" class="button text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
                                    <Button @click="props.close(); instantLogout = false">Close</Button>
                                </div>
                            </div>
                        </template>
                    </Lightbox>
                </div>
            </template>
        </Dropdown>
    </div>
    <div v-else class="x items-center space-x-4">
        <Link :href="route('auth::login')">Login</Link>
        <Link :href="route('auth::register')" class="bg-cyan-500 bg-ui-700 text-ui-200 rounded-md font-bold px-2 py-0.5">Register</Link>
    </div>
</template>
