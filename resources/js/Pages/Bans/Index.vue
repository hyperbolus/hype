<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Timestamp from "@/Components/Timestamp.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    bans: Object
});
</script>
<template>
    <app-layout>
        <div class="y space-y-4 w-full">
            <h1 class="font-bold text-4xl">Bans</h1>
            <div class="border border-ui-700 rounded-md">
                <table class="table-auto w-full">
                    <thead class="border-b border-ui-700 bg-ui-800">
                    <tr class="">
                        <th>Name</th>
                        <th>Reason</th>
                        <th>Ban Date</th>
                        <th>Unban Date</th>
                        <th>Banned By</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr v-for="ban in bans.data" class="even:bg-ui-900">
                        <td class="px-2"><Username :user="ban.bannable"/></td>
                        <td class="px-2" :class="{'text-ui-600 italic': !ban.comment}">{{ ban.comment ?? 'No reason specified' }}</td>
                        <td class="px-2"><Timestamp position="left" :time="ban.created_at"/></td>
                        <td class="px-2">
                            <Timestamp v-if="ban.expired_at" position="left" :time="ban.created_at"/>
                            <span v-else>Permanent</span>
                        </td>
                        <td class="x items-center justify-center mt-0.5 px-2"><Username :user="ban.creator"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </app-layout>
</template>
