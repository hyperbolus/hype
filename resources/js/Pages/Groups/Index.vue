<script setup>
import AppLayout from "@/Layouts/Dash.vue";
</script>
<template>
    <AppLayout title="Groups">
        <div class="grid grid-cols-3 gap-4 w-full justify-center items-start">
            <div class="col-start-2 col-end-3 rounded bg-ui-900 border border-ui-800 divide-y divide-ui-800 text-center">
                <div class="p-4 space-y-1">
                    <div class="w-full py-7 bg-blue-500"></div>
                    <h2 class="font-bold">Group Name</h2>
                    <p class="text-ui-500 text-sm">Big ol' group description. Y'know it's a description of descriptions. The best of all time. You are going to love this description.</p>
                    <div class="x text-sm justify-between">
                        <span>Members:</span>
                        <span>1</span>
                    </div>
                    <div class="x text-sm justify-between">
                        <span>Group Owner:</span>
                        <span>System</span>
                    </div>
                </div>
                <div class="p-4">
                    <button class="bg-ui-700 hover:bg-ui-800 transition-colors p-2 w-full rounded text-sm uppercase">Join Group</button>
                    <button disabled class="hidden bg-ui-800 text-ui-600 transition-colors p-2 w-full rounded text-sm uppercase">Invite Only</button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
