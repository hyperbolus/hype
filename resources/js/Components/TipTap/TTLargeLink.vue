<script setup>
import {nodeViewProps, NodeViewWrapper} from '@tiptap/vue-3'
import {Link} from "@inertiajs/vue3";
import Icon from "../Icon.vue";

const props = defineProps({
    node: Object
});
</script>
<template>
    <node-view-wrapper class="prose-base not-prose">
        <Link :href="node.attrs.url" class="y group relative overflow-hidden rounded-lg border border-ui-700 bg-ui-900 px-4 py-2 hover:border-green-200 hover:[filter:drop-shadow(0_0_5px_rgb(103_232_249))]">
            <h2 class="text-3xl font-bold">{{ node.attrs.title }}</h2>
            <p>{{ node.attrs.description }}</p>
            <Icon :name="node.attrs.icon" size="24" scale="size-32" class="absolute text-ui-700 -right-4 -bottom-12 duration-300 transition-[transform,bottom,right] group-hover:right-4 group-hover:rotate-[-20deg] group-hover:-bottom-10"/>
        </Link>
    </node-view-wrapper>
</template>
