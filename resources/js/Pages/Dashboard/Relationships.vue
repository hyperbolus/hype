<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import {router} from "@inertiajs/vue3";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from "ziggy-js";

const props = defineProps({
    sent: Object
});


</script>
<template>
    <dashboard-layout>
        <h1 class="font-bold text-4xl mx-2">Relationships</h1>
        <p class="pane">You can block users by going to their profile and opening the menu in the top right. Blocked users will not be able to message you or post comments on your profile.</p>
        <div class="y">
            <h2 class="font-bold mx-2">Blocked Users</h2>
            <div class="y space-y-2 bg-ui-900 p-2 rounded-lg">
                <div class="x space-x-2 justify-between items-center p-2 bg-ui-800 rounded-md" v-for="user in sent">
                    <div class="x space-x-2 items-center">
                        <Avatar :user="user"/>
                        <Username :card="false" :user="user"/>
                    </div>
                    <div @click="router.delete(route('relationships.destroy', user.id))" class="px-2 py-1 bg-ui-900 rounded cursor-pointer">Unblock</div>
                </div>
            </div>
        </div>
    </dashboard-layout>
</template>
