<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    profile: Object,
})
</script>
<template>
    <app-layout>
        <div class="flex flex-col space-y-2 md:w-3/4">
            <div class="flex justify-between items-center">
                <h2 class="font-bold text-2xl">{{ profile.name }}'s Username History</h2>
            </div>
            <div v-if="profile.names.length > 0" class="y pane !px-0 !py-0 divide-y divide-ui-700">
                <div v-for="change in profile.names" class="justify-between flex items-center px-4 py-2 gap-2">
                    <Icon v-if="change.hidden" name="eye-slash" scale="w-5" class="text-ui-500"/>
                    <span class="grow">{{ change.from }} &#8594; {{ change.to }}</span>
                    <span class="text-sm text-ui-600">{{ new Date(change.created_at).toLocaleString([], {day: '2-digit', month: '2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit'}) }}</span>
                </div>
            </div>
            <div v-else>No name changes have been logged</div>
        </div>
    </app-layout>
</template>
