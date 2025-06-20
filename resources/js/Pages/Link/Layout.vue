<script setup>
import {ref} from "vue";
import {Link} from '@inertiajs/vue3'

const home = ref(false)
</script>
<template>
    <div class="bg-gray-100 p-4 min-h-screen flex justify-center items-center">
        <div class="h-fit">
            <div class="flex flex-col text-center shadow bg-white rounded-lg p-4 text-gray-600">
                <h1 class="text-lg font-bold">DashLink</h1>
                <slot/>
            </div>
            <footer class="flex flex-row justify-between text-gray-400 mt-1">
                <span>~/ <Link class="underline" href="/public">dashlink</Link><slot name="breadcrumbs"/></span>
                <slot name="build"/>
            </footer>
        </div>
    </div>
</template>
