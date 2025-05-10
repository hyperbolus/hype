<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {Link, useForm} from "@inertiajs/vue3"
import route from "ziggy-js";
import Textbox from "@/Components/Textbox.vue";
import Button from "@/Jetstream/Button.vue";

const banForm = useForm({
    user_id: null,
    reason: '',
    expired_at: null
});

const submitBan = () => {
    banForm.post(route('moderation.ban'), {
        onSuccess: () => banForm.reset()
    })
}
</script>
<template>
    <app-layout>
        <div class="y space-y-2 w-full">
            <Link :href="route('moderation.reports.index')" class="underline">Reports</Link>
<!--            <Link :href="route('moderation.reports.index')" class="underline">Users</Link>-->
            <h1 class="text-2xl font-bold">Ban User</h1>
            <div class="y space-y-2 pane">
                <div class="x justify-between space-x-2">
                    <span class="text-sm">Ban Expiry (leave empty for perma)</span>
                    <button @click="banForm.expired_at = null" class="text-sm underline">Reset</button>
                </div>
                <input class="rounded-md bg-ui-950 border-none !mt-0.5" type="datetime-local" v-model="banForm.expired_at">
                <span class="text-sm">User ID</span>
                <input class="rounded-md bg-ui-950 border-none !mt-0.5" type="number" v-model="banForm.user_id">
                <span class="text-sm">Reason</span>
                <Textbox class="!mt-0.5" :max="200" v-model="banForm.reason" placeholder="Ban reason"/>
                <p>Note: if banning a WK alt do not mention him by name. just "ban evasion" is sufficient</p>
                <Button @click="submitBan" class="w-fit">Submit</Button>
            </div>
        </div>
    </app-layout>
</template>
