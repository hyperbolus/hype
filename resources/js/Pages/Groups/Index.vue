<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import hyper from "@/../images/group_banner_hyper.png"
import {getUser, isAuthenticated} from "@/util.js";
import Username from "@/Components/Username.vue";
</script>
<template>
    <AppLayout title="Groups">
        <div class="grid grid-cols-3 gap-4 w-full justify-center items-start">
            <div class="col-start-2 col-end-3 rounded bg-ui-900 border border-ui-800 divide-y divide-ui-800 text-center">
                <div class="p-4 space-y-1">
                    <img alt="Group Banner" :src="hyper"/>
                    <h2 class="font-bold text-xl">Hyper</h2>
                    <p class="text-ui-500 text-sm">Those with the power to create. Levantate ponte hyper.</p>
                    <div class="x text-sm justify-between">
                        <span>Members:</span>
                        <span>1</span>
                    </div>
                    <div class="x text-sm justify-between">
                        <span>Group Owner:</span>
                        <Username v-if="isAuthenticated()" :user="getUser()"/>
                        <span v-else>System</span>

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
