<script setup>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps({
    ...nodeViewProps
})
</script>
<template>
    <node-view-wrapper as="span" class="inline">
        <span @click="props.node.attrs.visible = !props.node.attrs.visible" class="w-fit cursor-pointer">
            <node-view-content as="span" class="rounded bg-ui-700 p-0.5 transition-[filter]" :class="props.node.attrs.visible ? 'blur' : ''"/>
        </span>
    </node-view-wrapper>
</template>
