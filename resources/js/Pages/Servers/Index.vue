<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import TipTap from "@/Components/TipTap.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    servers: Object
});
</script>
<template>
    <app-layout title="GDPS List">
        <div class="y space-y-2 w-full">
            <h1 class="font-bold text-3xl">GDPS List</h1>
            <div class="grid grid-cols-4 gap-4 w-full">
                <div v-for="server in servers.data" class="y w-full space-y-1 items-center pane">
                    <div class="x space-x-2 items-center">
                        <h2 class="font-bold text-xl">{{ server.name }}</h2>
                        <span class="px-2 py-0.5 rounded bg-ui-800">{{ server.version }}</span>
                    </div>
                    <Username :user="server.owner"/>
                    <img class="w-[8rem] p-2" alt="" src="/icon.svg"/>
                    <div class="x space-x-2">
                        <a v-if="server.website" class="underline">Website</a>
                        <span v-if="server.website && server.discord">|</span>
                        <a v-if="server.discord" class="underline">Discord</a>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
