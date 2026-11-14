<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import Pagination from "@/Components/Pagination.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import {hasRole, wiki} from "@/util.js";
import TipTap from "@/Components/TipTap.vue";

const props = defineProps({
    article: Object,
    tag: Object,
    levels: Object,
});
</script>
<template>
    <app-layout>
        <div class="y space-y-2 w-full">
            <div v-if="article">
                <TipTap
                    ref="tiptapEditor"
                    :wiki="true"
                    language="html"
                    v-model="article.revision.text.content"
                    :editable="false"
                    class="border border-ui-700 rounded-lg bg-ui-900 px-4 py-2"
                />
                <Link :href="wiki(article)" class="block text-blue-500 px-2 text-sm text-right w-full">View on the Wiki</Link>
            </div>
            <div class="flex items-center justify-between">
                <h2 class="font-bold text-2xl capitalize">Levels Tagged <span class="pane !px-2 !py-0.5 ">{{ tag.name }}</span></h2>
                <Link v-if="hasRole('wiki_contributor')" :href="wiki('Tag:' + tag.id) + '?action=edit'" class="px-2 py-1 rounded-lg bg-blue-500 text-white font-bold">Create Wiki Page</Link>
            </div>
            <span class="pane" v-if="levels.data.length === 0">There are no levels with this tag</span>
            <Pagination :list="levels"/>
            <LevelTicket v-for="level in levels.data" :level="level"/>
            <Pagination :list="levels"/>
        </div>
    </app-layout>
</template>
