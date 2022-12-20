<script setup>
import Tooltip from "@/Components/Tooltip.vue";
</script>
<template>
    <span v-if="$page.props.auth && $page.props.user.roles.includes('admin')" class="w-full px-1 py-0.5 x-text-center font-bold text-xs bg-indigo-400 dark:bg-indigo-600">DEV ENVIRONMENT &bull; 127.0.0.1 &bull; <a href="//phpmyadmin" class="underline">PhpMyAdmin</a> &bull; <Link :href="route('system.home')" class="underline">Control Panel</Link> &bull; You've been cunked</span>
    <div class="x z-30 transition-colors justify-center w-full bg-neutral-300 dark:bg-neutral-900">
        <div class="hidden md:flex px-2 items-center divide-x divide-neutral-200 dark:divide-neutral-800 lg:max-w-5xl xl:max-w-6xl w-full text-xs">
            <a class="px-2 py-1 transition-colors bg-neutral-200 dark:bg-neutral-800 border-l dark:border-neutral-800">Geometry Dash</a>
            <a href="https://soundodger-community.com" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">Soundodger</a>
            <a href="https://userlevels.com/snail" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">Would You Snail?</a>
            <a href="https://userlevels.com/impossible" class="px-2 py-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 !border-r border-neutral-200 dark:border-neutral-800">The Impossible Game 2</a>
        </div>
    </div>
</template>
