<script setup>
import {Link} from '@inertiajs/vue3'
// TODO: Complete rework
</script>
<template>
    <div class="y p-4 z-10 transition-colors items-center w-full bg-ui-900">
        <div class="px-4 lg:max-w-5xl xl:max-w-6xl w-full">
            <div class="flex justify-between items-center w-full text-ui-500">
                <div>
                    <a href="#">&copy; Hyperbolus 2022</a>
                </div>
                <div class="hidden md:flex transition-colors bg-ui-800 py-0.5 px-2 rounded text-sm">
                    <span>Geometry Dash is owned by RobTopGames (not affiliated)</span>
                </div>
                <div class="y md:flex-row md:space-x-6">
                    <Link href="/docs/terms">Terms of Service</Link>
                    <Link href="/docs/privacy">Privacy Policy</Link>
                </div>
            </div>
        </div>
    </div>
</template>
