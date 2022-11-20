<script setup>
import {Link} from '@inertiajs/inertia-vue3';
import CommonLayout from "@/Layouts/CommonLayout.vue";
import route from 'ziggy-js'

const props = defineProps({
    tags: Array,
})

</script>
<template>
    <common-layout title="Tags">
        <template #breadcrumbs>
            <Link :href="$page.props.url">Tags</Link>
        </template>
        <div class="y space-y-4 w-3/4">
            <h2 class="font-bold text-2xl capitalize">Levels Tags</h2>
            <div class="y">
                <span class="pane" v-if="tags.length === 0">There are no tags</span>
                <Link v-else class="pane text-xl" v-for="tag in tags" :href="route('tags.show', tag.id)">{{ tag.name }}</Link>
            </div>
        </div>
        <div class="y space-y-4 w-1/4">

        </div>
    </common-layout>
</template>
