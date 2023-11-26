<script setup>
import route from "ziggy-js";
import { router } from '@inertiajs/vue3'
import AppLayout from "@/Layouts/Dash.vue";

localStorage.setItem('_stencil_data', window.location.hash.substring(1, window.location.hash.length))
router.visit(route('stencils.create'))
</script>
<template>
    <app-layout>
        <div class="w-full justify-center font-bold text-3xl animate-pulse">Loading...</div>
    </app-layout>
</template>
