<script setup>
import {NodeViewContent, nodeViewProps, NodeViewWrapper} from '@tiptap/vue-3'
import Icon from "@/Components/Icon.vue";

const props = defineProps(nodeViewProps);

const element = _ => {
    let level = props.node.attrs.level;

    if ([1, 2, 3, 4, 5, 6].includes(level)) return 'h' + level;

    return 'h1';
}

const anchor = _ => (props.node?.content?.content[0]?.text ?? '').replaceAll(' ', '_');
</script>
<template>
    <node-view-wrapper :as="element()" :id="anchor()" class="x space-x-2 items-center group">
        <node-view-content as="span"/>
        <a class="anchor invisible group-hover:visible" :href="'#' + anchor()">
            <Icon name="link" class="size-5"/>
        </a>
    </node-view-wrapper>
</template>
