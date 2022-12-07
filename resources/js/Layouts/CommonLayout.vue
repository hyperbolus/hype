<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'

defineProps({
    forums: Array,
})
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <slot name="breadcrumbs"/>
        </template>
        <div class="flex flex-col flex-grow transition-colors shadow-xl backdrop-blur-lg bg-neutral-200 dark:bg-neutral-900 bg-opacity-75 dark:bg-opacity-75 md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <slot/>
        </div>
    </app-layout>
</template>
