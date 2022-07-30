<script setup>
import { ref } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/inertia-vue3';

defineProps({
    title: String,
});
const showingNavigationDropdown = ref(false);

const logout = () => {
    Inertia.post(route('auth::logout'));
};
</script>
<template>
    <div class="flex flex-col items-center bg-neutral-200 min-h-screen">
        <Head><title>{{ title }}</title></Head>
        <div class="flex justify-center w-full text-neutral-300 py-4 flex space-x-4 bg-neutral-900">
            <div class="flex justify-between max-w-6xl w-full">
                <div class="flex items-center space-x-4">
                    <Link :href="route('home')" class="font-bold text-3xl">GRIMOIRE</Link>
                    <Link :href="route('levels.index')">Levels</Link>
                    <Link :href="route('videos.index')">Videos</Link>
                    <Link :href="route('users.index')">Users</Link>
                </div>
                <div v-if="$page.props.auth" class="flex items-center space-x-1">
                    <span>{{ $page.props.user.name }} (<span @click="logout" class="cursor-pointer text-sm text-red-500 hover:opacity-50">logout</span>)</span>
                </div>
                <div v-else class="flex items-center space-x-4">
                    <Link :href="route('auth::login')">Login</Link>
                    <Link :href="route('auth::register')">Register</Link>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center w-full py-3 bg-neutral-100">
            <div class="flex items-center max-w-6xl w-full text-xs space-x-1">
                <Link :href="route('home')">Dashnet</Link>
                <span>&raquo;</span>
                <slot name="breadcrumbs"/>
            </div>
        </div>
        <slot/>
        <span class="pb-4 text-gray-400">&copy; Spellslave <span class="text-red-300">&hearts;</span> 2022</span>
    </div>
</template>
