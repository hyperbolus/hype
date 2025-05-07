<script setup>
import AppLayout from "@/Layouts/Dash.vue";

const props = defineProps({
    bans: Object
});
</script>
<template>
    <app-layout>
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reason</th>
                    <th>Ban Date</th>
                    <th>Unban Date</th>
                    <th>Banned By</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="ban in bans.data">
                    <td>{{ ban.bannable.name }}</td>
                    <td>{{ ban.public_reason ?? 'No reason specified' }}</td>
                    <td>{{ ban.created_at }}</td>
                    <td>{{ ban.expired_at ?? 'Permanent' }}</td>
                    <td>{{ ban.creator ? ban.creator.name : 'System' }}</td>
                </tr>
            </tbody>
        </table>
    </app-layout>
</template>
