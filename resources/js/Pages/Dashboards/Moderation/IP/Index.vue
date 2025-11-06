<script setup>
import QueryResults from "../../../../Components/QueryResults.vue";
import DashboardLayout from "../../../../Layouts/DashboardLayout.vue";
import Accordion from "../../../../Components/Accordion.vue";
import Button from "../../../../Jetstream/Button.vue";
import {router, useForm, Link} from "@inertiajs/vue3";
import Username from "../../../../Components/Username.vue";
import Timestamp from "../../../../Components/Timestamp.vue";
import Icon from "../../../../Components/Icon.vue";
import route from 'ziggy-js'

const props = defineProps({
    user_id: Number,
    type: String,
    address: String,

    ips: Object,
    sorting: Object
});

const searchForm = useForm({
    user: typeof(props.user_id) === 'number' ? props.user_id : null,
    type: props.type ?? null,
    address: props.address ?? null,
})

const search = () => {
    let url = new URLSearchParams();
    url.set('user', searchForm.user);
    url.set('type', searchForm.type);
    url.set('address', searchForm.address);
    router.get(route('moderation.ip.index') + '?' + url);
}

const append = (route, key, value) => {
    let url = new URL(window.location);
    url.searchParams.set(key, value)
    return url.toString();
}
</script>
<template>
    <dashboard-layout>
        <Accordion title="Search" :open="!!user_id || !!type">
            <div class="y">
                <span class="text-sm">User</span>
                <input type="number" class="rounded-md bg-ui-950 border-none !mt-0.5" v-model.number="searchForm.user">

                <span class="text-sm">Address</span>
                <input type="text" class="rounded-md bg-ui-950 border-none !mt-0.5" v-model="searchForm.address">
                <p class="hidden text-sm text-ui-500">Use % as a wildcard (ex: 192.168.% will match 192.168.0.1 and 192.168.255.120)</p>

                <span class="text-sm mt-2">Type</span>
                <select class="rounded-md bg-ui-950 border-none" v-model="searchForm.type">
                    <option value="4">IPv4</option>
                    <option value="6">IPv6</option>
                    <option value="all" selected>All</option>
                </select>
                <div class="x space-x-2 mt-2">
                    <Button @click="search">Search</Button>
                    <Link :href="route('moderation.ip.index')" class="button">Reset</Link>
                </div>
            </div>
        </Accordion>
        <QueryResults title="Results" :sorting="sorting" :results="ips" v-slot="{item}" container-classes="y space-y-2">
            <div class="x space-x-2 justify-between items-center pane !pr-2">
                <span class="w-[7ch] text-ui-500 text-sm font-mono text-right">{{item.id}}</span>
                <Timestamp class="bg-ui-800 px-2 py-0.5 rounded text-sm" position="right" :time="item.last_seen_at"/>
                <Link :href="append('moderation.ip.index', 'address', item.address)" class="grow text-sm">{{item.address}}</Link>
                <Username v-if="item.user" :user="item.user"/>
                <Link :href="append('moderation.ip.index', 'user', item.user.id)" class="rounded-md bg-ui-800 p-1">
                    <Icon class="size-4" name="magnifying-glass"/>
                </Link>
            </div>
        </QueryResults>
    </dashboard-layout>
</template>
