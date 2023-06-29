<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import route from "ziggy-js";
import {Link} from '@inertiajs/vue3'
import Pagination from "@/Components/Pagination.vue";
import Button from "@/Jetstream/Button.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    reports: Object
})

</script>
<template>
    <app-layout title="Reports">
        <template #breadcrumbs>
            <Link :href="route()._currentUrl">Reports</Link>
        </template>
        <div class="y items-center w-full space-y-4">
            <div class="x w-full justify-between items-center">
                <h2 class="font-bold text-2xl">Report Queue</h2>
            </div>
            <Pagination :list="reports"/>
            <div v-for="report in reports.data" class="y space-y-2 w-full p-4 bg-ui-900 rounded-lg">
                <h2 class="font-bold text-xl">{{ report.subject }}</h2>
                <span>Reported by <Username :user="report.reporter"/></span>
                <p>{{ report.content }}</p>
                <div class="x space-x-2">
                    <Button class="w-fit">Close Report</Button>
                    <Button class="w-fit">Go to Content</Button>
                </div>
            </div>
            <Pagination :list="reports"/>
        </div>
    </app-layout>
</template>
