<script setup>
import DashboardLayout from "../../../../Layouts/DashboardLayout.vue";
import Username from "../../../../Components/Username.vue";
import Timestamp from "../../../../Components/Timestamp.vue";
import Accordion from "../../../../Components/Accordion.vue";
import Textbox from "../../../../Components/Textbox.vue";
import Button from "../../../../Jetstream/Button.vue";
import QueryResults from "../../../../Components/QueryResults.vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";

const props = defineProps({
    bans: Object,
    sorting: Object,
});

const banForm = useForm({
    user_id: null,
    reason: '',
    expired_at: null
});

const submitBan = () => {
    banForm.post(route('moderation.bans.store'), {
        onSuccess: () => banForm.reset()
    });
}

const progress = (item) => {
    return ((Date.now() - new Date(item.created_at).getTime()) / (new Date(item.expired_at).getTime() - new Date(item.created_at).getTime()) * 100).toFixed(0);
}
</script>
<template>
    <dashboard-layout>
        <Accordion title="Ban User">
            <div class="y space-y-2">
                <div class="x justify-between space-x-2">
                    <span class="text-sm">Ban Expiry</span>
                    <button @click="banForm.expired_at = null" class="text-sm underline">Reset</button>
                </div>
                <input class="rounded-md bg-ui-950 border-none !mt-0.5" type="datetime-local" v-model="banForm.expired_at">
                <p class="text-sm text-ui-500 !mt-0">Make sure to include a date <b>AND</b> time! (set to 0s if unsure, leave empty for permaban)</p>
                <span class="text-sm">User ID</span>
                <input class="rounded-md bg-ui-950 border-none !mt-0.5" type="number" v-model="banForm.user_id">
                <span class="text-sm">Reason</span>
                <Textbox class="!mt-0.5" :max="200" v-model="banForm.reason" placeholder="Ban reason"/>
                <p>Note: if banning a WK alt do not mention him by name. just "ban evasion" is sufficient</p>
                <Button @click="submitBan" class="w-fit">Submit</Button>
            </div>
        </Accordion>
        <QueryResults title="" :sorting="sorting" :results="bans" v-slot="{ item }" container-classes="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
            <div class="y pane !p-0 h-full border border-ui-700">
                <div class="y px-2 pt-1 pb-2 grow">
                    <div class="x justify-between">
                        <span class="text-sm">User</span>
                        <span class="text-sm">Banned By</span>
                    </div>
                    <div class="x justify-between">
                        <Username v-if="item.bannable" :user="item.bannable"/>
                        <span v-else class="italic text-ui-500">Deleted</span>
                        <Username :user="item.creator"/>
                    </div>
                    <span class="text-sm mt-1">Reason</span>
                    <p class="bg-ui-950 text-ui-500 px-2 py-1 rounded-md grow" :class="{'text-ui-600 italic': !item.comment}">{{ item.comment ?? 'No reason specified' }}</p>
                </div>
                <div class="bg-ui-900 border-t border-ui-700 p-2 rounded-b-lg">
                    <div class="x space-x-2 text-sm">
                        <span>Banned</span>
                        <span class="grow text-center">Progress<span v-if="item.expired_at">&nbsp;{{ progress(item) }}%</span></span>
                        <span class="text-right">Expires</span>
                    </div>
                    <div class="bg-ui-950 p-1 rounded-full mt-0.5">
                        <div v-if="item.expired_at" class="rounded-full p-0.5 max-w-full" :class="Date.now() > new Date(item.expired_at).getTime() ? 'bg-green-500' : 'bg-blue-500'" :style="`width: ${ progress(item) }%;`"></div>
                        <div v-else class="rounded-full p-0.5 bg-red-950 w-full"></div>
                    </div>
                    <div class="x justify-between space-x-2 text-sm">
                        <Timestamp position="right" :time="item.created_at"/>
                        <span>
                        <Timestamp v-if="item.expired_at" position="left" :time="item.expired_at"/>
                        <span v-else class="text-ui-500">Permanent</span>
                    </span>
                    </div>
                </div>
            </div>
        </QueryResults>
    </dashboard-layout>
</template>
<style scoped>

</style>
