<script setup>
import Username from "@/Components/Username.vue";
import LevelReview from "@/Components/LevelReview.vue";
import {Link, useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {useSettingsStore} from "@/stores/settings.ts";
import Avatar from "@/Components/Avatar.vue";

const props = defineProps({
    report: Object,
    full: Boolean
});

const url = report => {
    let url = report.url;
    if (report.reportable_type) url = 'reviews.show';
    return route(url, report.reportable_id);
}

const form = useForm({

})

const settings = useSettingsStore().settings['_report_reasons']
</script>
<template>
    <div class="pane">
        <div class="x justify-between items-center text-sm space-x-2">
            <div class="text-ui-600">ID: {{ report.id }}</div>
            <div class="x items-center space-x-2">
                <div class="rounded bg-ui-800 px-1.5 py-0.5">
                    <span v-if="report.reportable_type === 1">User</span>
                    <span v-else-if="report.reportable_type === 42">Review</span>
                    <span v-else-if="report.reportable_type === 21">Post</span>
                    <span class="text-red-500" v-else>Cannot display this report type: {{ report.reportable_type }}</span>
                </div>
                <span class="text-white font-bold">
                    <span v-if="report.closed_at" class="rounded bg-red-500 px-1.5 py-0.5">Closed</span>
                    <span v-else class="rounded bg-green-500 px-1.5 py-0.5">Open</span>
                </span>
            </div>
        </div>
        <span class="text-sm mt-1">Reported Item</span>
        <div class="p-2 bg-ui-950 rounded-md">
            <Username v-if="report.reportable_type === 1 && report.reportable" :user="report.reportable"/>
            <LevelReview v-if="report.reportable_type === 42 && report.reportable" :review="report.reportable"/>
            <p class="text-red-500" v-if="report.reportable === null">The reported item has been deleted</p>
        </div>
        <div class="x space-x-2 justify-between items-start">
            <div class="w-full">
                <span class="text-sm mt-1">Subject</span>
                <p class="bg-ui-950 px-2 py-1">{{ report.subject }}</p>
            </div>
            <div class="w-full">
                <span class="text-sm mt-1">Report Reason</span>
                <div class="bg-ui-950 px-2 py-1 leading-tight">
                    <p>{{ settings[report.reason_id].title }}</p>
                    <p class="text-sm text-ui-500">{{ settings[report.reason_id].description }}</p>
                </div>
            </div>
        </div>
        <span class="text-sm mt-1">Report Description</span>
        <p class="bg-ui-950 px-2 py-1">{{ report.content }}</p>
        <span class="text-sm mt-1">Action</span>
        <p class="bg-ui-950 px-2 py-1">{{ report.action ?? 'No action taken yet' }}</p>
        <div class="x justify-between items-end space-x-2">
            <div class="y">
                <span class="text-sm mt-1">Reporter</span>
                <div class="x items-center space-x-2">
                    <Avatar :user="report.reporter"/>
                    <Username :user="report.reporter"/>
                </div>
            </div>
            <div class="x items-center space-x-2">
                <Link class="bg-ui-800 rounded-md px-2 py-1" :href="url(report)">Reported Content</Link>
                <Link v-if="!full" class="bg-ui-800 rounded-md px-2 py-1" :href="route('moderation.reports.show', report.id)">Full Report</Link>
            </div>
        </div>
    </div>
</template>
