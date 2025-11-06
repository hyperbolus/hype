<script setup>
import QueryResults from "@/Components/QueryResults.vue";
import {useSettingsStore} from "@/stores/settings.ts";
import {useForm} from "@inertiajs/vue3"
import ReportCard from "@/Components/ReportCard.vue";
import route from "ziggy-js";
import DashboardLayout from "../../../../Layouts/DashboardLayout.vue";
import Dropdown from "../../../../Jetstream/Dropdown.vue";

const props = defineProps({
    reports: Object,
    search: Object
})

const form = useForm({
    model: props.search.model,
    status: props.search.status,
    reasons: props.search.reasons
});

const search = () => {
    form.get(route('moderation.reports.index'), {
        preserveScroll: true
    });
}

const settings = useSettingsStore().settings['_report_reasons']
</script>
<template>
    <dashboard-layout :show-title="false">
        <Dropdown width="fit">
            <template #trigger>
                <button class="button mt-2 w-fit">Filters</button>
            </template>
            <template #content>
                <div @click.stop class="y pane !px-2">
                    <span class="text-sm mt-1">Model</span>
                    <select v-model="form.model" class="block w-full bg-ui-950 border-none rounded-md text-sm py-1">
                        <option :value="1" selected>User</option>
                        <option :value="21">Post</option>
                        <option :value="23">Profile Comment</option>
                        <option :value="42">Review</option>
                    </select>
                    <span class="text-sm mt-1">Status</span>
                    <select v-model="form.status" class="block w-full bg-ui-950 border-none rounded-md text-sm py-1">
                        <option value="all" selected>All</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                    <div class="x justify-between">
                        <span class="text-sm mt-1">Reason</span>
                        <button @click="form.reasons = []" class="text-sm mt-1 underline">Reset</button>
                    </div>
                    <select v-model.number="form.reasons" :size="Object.keys(settings).length" class="bg-ui-950 border-none rounded-md text-sm mt-0.5" multiple>
                        <option v-for="(reason, id) in settings" :value="id">{{ reason.title }}</option>
                    </select>
                    <button @click="search" class="button mt-2 w-fit">Search</button>
                </div>
            </template>
        </Dropdown>
        <QueryResults title="Reports" :results="reports" v-slot="{item}" container-classes="y space-y-2">
            <ReportCard :report="item"/>
        </QueryResults>
    </dashboard-layout>
</template>
