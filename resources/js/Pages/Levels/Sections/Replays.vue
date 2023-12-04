<script setup>
import Layout from "../Layout.vue";
import ReplayTicket from "@/Components/ReplayTicket.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    level: Object,
    replays: Object
})
</script>
<template>
    <Layout :level="level">
        <div class="y !mt-0 bg-ui-950 border border-ui-900 rounded-lg px-4 py-2 space-y-2">
            <h2 class="font-bold text-2xl">Macros</h2>
            <Pagination :list="replays"/>
            <div v-if="replays.data.length === 0" class="pane text-center italic text-ui-600">No Macros</div>
            <div class="grid grid-cols-3 gap-2">
                <ReplayTicket class="pane" v-for="macro in replays.data" :level="level" :macro="macro"/>
            </div>
            <Pagination :list="replays"/>
        </div>
    </Layout>
</template>
