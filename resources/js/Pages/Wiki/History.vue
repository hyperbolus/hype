<script setup>
import WikiLayout from "@/Layouts/WikiLayout.vue";
import {Link} from "@inertiajs/vue3";
import {useDateFormat} from "@vueuse/core";
import Username from "../../Components/Username.vue";

const props = defineProps({
    page: Object,
    title: String,
    language: String,
    namespace: String,
    revisions: Object
});
</script>
<template>
    <WikiLayout :edited_at="page?.revision.created_at" :language="language" :namespace="namespace" :title="title">
        <div class="x justify-between space-x-4 border-b border-ui-700 pb-1 px-4">
            <Link :href="'?action=read'" class="border-b-2 border-blue-500 -mb-1">{{ namespace }}</Link>
            <div class="x space-x-4">
                <Link v-if="page" :href="'?action=read'" class="border-b-2 border-transparent -mb-1">Read</Link>
                <Link :href="'?action=edit'" class="border-b-2 border-transparent -mb-1">{{ page ? 'Edit' : 'Create' }}</Link>
                <Link v-if="page" :href="'?action=history'" class="border-b-2 border-blue-500 -mb-1">History</Link>
            </div>
        </div>
        <div class="y space-y-2">
            <div v-for="revision in revisions?.data ?? []" class="x space-x-2 pane text-sm">
                <Link href="/" class="text-blue-500 hover:underline">{{ useDateFormat(revision.created_at, 'MMMM DD, YYYY @ HH:mm') }}</Link>
                <Username :user="revision.author"/>
                <span>({{ revision.size.new_length }} bytes)</span>
                <span :class="revision.size.new_length > revision.size.old_length ? 'text-green-500' : 'text-red-500'">({{ revision.size.new_length > revision.size.old_length ? '+' : '' }}{{ revision.size.new_length - revision.size.old_length }})</span>
                <span class="italic">"{{ revision.description }}"</span>
            </div>
            <p v-if="!revisions || revisions?.data.length === 0">This article has no history</p>
        </div>
    </WikiLayout>
</template>
