<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {getUser, isAuthenticated} from "@/util.js";
import Username from "@/Components/Username.vue";

const props = defineProps({
    groups: Object,
    owner: Object
})
</script>
<template>
    <AppLayout title="Groups">
        <div class="grid grid-cols-3 auto-rows-min gap-4 w-full justify-center items-start">
            <div v-for="group in groups" class="y rounded h-full bg-ui-900 border border-ui-800 divide-y divide-ui-800 text-center">
                <div class="y grow p-4 space-y-1">
                    <div class="x animate-pulse justify-center items-center p-8 rounded-lg bg-ui-700">
                        Banner Missing :3
                    </div>
                    <h2 class="font-bold text-xl">{{ group.name }}</h2>
                    <p class="text-ui-500 text-sm grow">{{ group.description }}</p>
                    <div class="x text-sm justify-between">
                        <span>Members:</span>
                        <span>1</span>
                    </div>
                    <div class="x text-sm justify-between">
                        <span>Group Owner:</span>
                        <Username :user="owner"/>
                    </div>
                </div>
                <div class="p-4">
                    <button class="hidden bg-ui-700 hover:bg-ui-800 transition-colors p-2 w-full rounded text-sm uppercase">Join Group</button>
                    <button disabled class="bg-ui-800 text-ui-600 transition-colors p-2 w-full rounded text-sm uppercase">Invite Only</button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
