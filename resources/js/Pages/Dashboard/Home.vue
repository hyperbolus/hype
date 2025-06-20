<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Username from "@/Components/Username.vue";
import Avatar from "@/Components/Avatar.vue";
import route from "ziggy-js";
import {ref} from "vue";
import {useClipboard} from "@vueuse/core";

const props = defineProps({
    profile: Object
});

const invite = ref(route('auth::register') + '?invite=' + props.profile.id)
const { text, copy, copied, isSupported } = useClipboard({ source: invite, legacy: true })
</script>
<template>
    <dashboard-layout title="Home">
        <div class="pane relative">
            <div class="x space-x-2 items-center relative z-10 pt-16">
                <Avatar width="size-20" class="mr-2" :user="profile"/>
                <Username :badge="false" class="font-bold text-4xl" :user="profile"/>
            </div>
            <div class="absolute inset-0 opacity-50 z-0 rounded-md bg-cover" :style="`background-image:url(${profile.banner_url});`"></div>
        </div>
        <div class="pane y items-center text-center">
            <h2 class="text-lg font-bold mb-1">Refer friends to the site</h2>
            <span @click="copy(invite)" class="rounded-md bg-ui-950 w-full py-1 px-2">{{ route('auth::register') }}?invite={{ profile.id }}</span>
            <span class="text-sm" :class="copied ? 'text-green-500' : 'text-ui-500'">{{ copied ? 'Copied!' : 'Click to copy' }}</span>
        </div>
        <div v-if="profile.roles.length > 0" class="space-y-2">
            <h2 class="font-bold text-2xl">Roles</h2>
            <div v-for="role in profile.roles" class="pane">{{ role.name }}</div>
        </div>
    </dashboard-layout>
</template>
