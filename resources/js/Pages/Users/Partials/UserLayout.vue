<script setup>
import AppLayout from '@/Layouts/Dash.vue';
import Header from "@/Pages/Users/Partials/Header.vue";

const props = defineProps({
    profile: Object,
    containerClasses: String
})
</script>
<template>
    <app-layout :fullwidth="true" :decorations="false">
        <Header :profile="profile"/>
        <div class="y lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full md:px-4 my-6">
            <div class="py-4 px-4 bg-ui-950 md:rounded-md border-y md:border-x border-ui-900" :class="containerClasses">
                <slot/>
            </div>
        </div>
    </app-layout>
</template>
