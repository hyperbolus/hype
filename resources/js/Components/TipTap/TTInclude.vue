<script setup>
import {nodeViewProps, NodeViewWrapper, NodeViewContent} from '@tiptap/vue-3';
import Icon from "@/Components/Icon.vue";

const props = defineProps(nodeViewProps);
</script>
<template>
    <node-view-wrapper contenteditable="false" class="border rounded border-blue-500">
        <div class="x items-center pl-1.5 pr-1 space-x-1.5 bg-blue-500 w-fit rounded rounded-tr-none rounded-bl-none">
            <span class="text-white text-xs font-mono">TEMPLATE</span>
            <Icon name="cog-6-tooth" scale="size-3" size="16"/>
        </div>
        <node-view-content as="div"/>
    </node-view-wrapper>
</template>
