<script setup>
import Icon from "@/Components/Icon.vue";
import {computed, ref} from "vue";
import {NodeViewContent, NodeViewWrapper} from "@tiptap/vue-3";

const props = defineProps({
    nodeProps: Object,
    label: String,
    icon: String,
    color: String,
    tooltipClasses: {
        type: String,
        default: 'x items-center space-x-2',
    },
});

const c = computed(() => {
    let colors;

    switch (props.color) {
        case 'red':
            colors = ['bg-red-950/10', 'border-red-500', 'text-red-500'];
            break;
        case 'green':
            colors = ['bg-green-950/10', 'border-green-500', 'text-green-500'];
            break;
        case 'blue':
            colors = ['bg-blue-950/10', 'border-blue-500', 'text-blue-500'];
            break;
        default:
            colors = ['bg-white/10', 'border-white-500', 'text-white-500'];
            break;
    }

    return {
        background: colors[0],
        border: colors[1],
        text: colors[2],
    };
});

const editing = ref(props.nodeProps?.editor?.options?.editable);

const active = computed(() => {
    if (!editing.value) return false;

    // Active is when ONLY this node is selected
    return props.nodeProps.selected && !subselected.value;
});

// Selection bounds encompass more than just the node
const subselected = computed(() => {
    if (!editing.value) return false;

    let selection = props.nodeProps.editor.reactiveState.value.selection;
    let contentSize = props.nodeProps.node.content.size;
    let pos = props.nodeProps.getPos();

    let min = Math.min(selection.$anchor.pos, selection.$head.pos);
    let max = Math.max(selection.$anchor.pos, selection.$head.pos);

    return min < pos && max > pos + contentSize + 2;
});

const borderColor = computed(() => active.value ? c.value.border : `border-transparent`);
const bgColor = computed(() => subselected.value ? 'bg-blue-500' : 'bg-ui-1000');
</script>
<template>
    <NodeViewWrapper contenteditable="false" as="span" :class="{[`editing ${borderColor} ${bgColor}`]: editing}">
        <div v-if="editing && $slots.hasOwnProperty('_')" v-show="active" class="tooltip z-10">
            <div :class="tooltipClasses" class="tooltip-content">
                <slot/>
            </div>
            <div class="carrot"></div>
        </div>
        <span v-if="editing" class="badge" :class="subselected ? 'text-white' : [c.background, c.text]">
            <span>{{ label }}</span>
            <Icon :name="icon" scale="size-4" size="16"/>
        </span>
        <NodeViewContent v-else as="span"/>
    </NodeViewWrapper>
</template>
<style scoped>
.reset-text {
    @apply not-italic font-normal no-underline;
}

.editing {
    @apply inline-flex items-center border relative rounded cursor-pointer selection:bg-transparent h-6;
}

.tooltip {
    @apply absolute top-[125%] left-1/2 -translate-x-1/2 pt-2 z-10 reset-text;
}

.tooltip-content {
    @apply text-ui-200 rounded-md bg-ui-1000 p-2 z-10 relative;
}

.carrot {
    @apply absolute border-8 bottom-full -mb-4 left-1/2 -translate-x-1/2 rotate-45 border-ui-1000;
}

.badge {
    @apply inline-flex items-center pl-1.5 pr-1 space-x-1.5 rounded reset-text;
}

.badge > span {
    @apply text-sm font-mono;
}
</style>
