<script setup>
import WikiLayout from "@/Layouts/WikiLayout.vue";
import {wiki} from "@/util";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import {Link} from '@inertiajs/vue3'
import {wikiNamespaceName} from "../../../util";

const props = defineProps({
    pages: Object,
});
</script>
<template>
    <WikiLayout language="en" namespace="Special">
        <Breadcrumbs :home-link="wiki('')" class="px-2 text-ui-400 !mt-0" :decoration="false"/>

        <div class="y">
            <Link v-for="page in pages.data" class="text-blue-500 hover:underline" :href="wiki(page)">{{ wikiNamespaceName(page.namespace, true) }}{{ page.title }}</Link>
        </div>
    </WikiLayout>
</template>
