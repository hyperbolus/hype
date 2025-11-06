<script setup>
import ReportCard from "@/Components/ReportCard.vue";
import DashboardLayout from "../../../../Layouts/DashboardLayout.vue";

const props = defineProps({
    report: Object
})
</script>
<template>
    <dashboard-layout>
        <ReportCard class="w-full" :full="true" :report="report"/>
    </dashboard-layout>
</template>
