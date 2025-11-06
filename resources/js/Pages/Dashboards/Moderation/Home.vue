<script setup>
import DashboardLayout from "../../../Layouts/DashboardLayout.vue";

defineProps({
    open_reports_count: Number,
    users_count: Number,
});
</script>
<template>
    <dashboard-layout>
        <div class="x flex-wrap gap-2 w-full">
            <div class="pane w-fit">
                <h2 class="font-bold text-4xl">{{ users_count }}</h2>
                <span class="text-ui-500">Open Reports</span>
            </div>
            <div class="pane w-fit">
                <h2 class="font-bold text-4xl">{{ open_reports_count }}</h2>
                <span class="text-ui-500">Open Reports</span>
            </div>
        </div>
    </dashboard-layout>
</template>
