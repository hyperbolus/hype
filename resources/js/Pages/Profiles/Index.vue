<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    profiles: Object
})
</script>
<template>
    <app-layout title="Profiles Index">
        <div class="y space-y-2 w-full">
            <Pagination :list="profiles"/>
            <div class="pane" v-for="profile in profiles.data">{{ profile.username }}</div>
            <Pagination :list="profiles"/>
        </div>
    </app-layout>
</template>
