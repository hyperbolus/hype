<script setup>
import {nodeViewProps} from '@tiptap/vue-3';
import TTBadgeWrapper from "@/Components/TipTap/TTBadgeWrapper.vue";

const props = defineProps(nodeViewProps);
</script>
<template>
    <TTBadgeWrapper label="Liquid" icon="code-bracket" color="green" :node-props="props" tooltip-classes="y !py-1">
        <span class="whitespace-nowrap text-sm text-center">Edit in source mode</span>
    </TTBadgeWrapper>
</template>
