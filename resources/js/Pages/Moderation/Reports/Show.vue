<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import ReportCard from "@/Components/ReportCard.vue";

const props = defineProps({
    report: Object
})

</script>
<template>
    <app-layout>
        <ReportCard class="w-full" :full="true" :report="report"/>
    </app-layout>
</template>
