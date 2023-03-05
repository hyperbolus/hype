<script setup>
import {Link} from '@inertiajs/vue3'
</script>
<template>
    <div class="y p-4 transition-colors items-center w-full bg-neutral-100 dark:bg-neutral-900">
        <div class="px-4 lg:max-w-5xl xl:max-w-6xl w-full">
            <div class="flex justify-between items-center w-full text-neutral-400 dark:text-neutral-500">
                <div>
                    <a href="#">&copy; Hyperbolus 2022</a>
                </div>
                <div class="hidden md:flex bg-neutral-800 py-0.5 px-2 rounded text-sm">
                    <template v-if="true /*&& (bg === bgsrc)*/">
                        <span>Featured Artwork by <span class="cursor-pointer underline">overdefo</span></span>
                    </template>
                </div>
                <div class="flex space-x-6">
                    <Link href="/docs/terms">Terms of Service</Link>
                    <Link href="/docs/terms">Privacy Policy</Link>
                </div>
            </div>
        </div>
    </div>
</template>
