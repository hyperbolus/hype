<script setup>
import {nodeViewProps, NodeViewWrapper} from "@tiptap/vue-3";
import {computed, ref, useTemplateRef} from "vue";

const props = defineProps(nodeViewProps);

const editing = ref(props?.editor?.options?.editable);
const content = useTemplateRef('content');
const first = ref(false);
const leaderPos = ref(0);
const leaderNode = ref(null);

const count = computed(() => {
    let n = 0;
    let out = '?';
    let firstNode = null;
    let seen = {};
    props.editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'footnote') {
            if (node.attrs.name === props.HTMLAttributes.name && node.attrs.group === props.HTMLAttributes.group) {
                if (firstNode === null) {
                    leaderPos.value = pos;
                    leaderNode.value = node;
                }

                if (firstNode === null && pos === props.getPos()) {
                    first.value = true;
                    firstNode = true;
                } else {
                    first.value = false;
                    firstNode = false;
                }

                out = n;

                if (content.value) content.value.value = props.editor.storage.footnote.footnotes[node.attrs.group]?.[node.attrs.name]?.content ?? '';
                return;
            }

            if (!seen.hasOwnProperty(node.attrs.group)) seen[node.attrs.group] = [];
            if (!seen[node.attrs.group].includes(node.attrs.name)) {
                seen[node.attrs.group].push(node.attrs.name)
                n++;
            }
        }
    });

    return out;
})

const active = computed(() => {
    if (!editing.value) return false;

    // Active is when ONLY this node is selected
    return props.selected && !subselected.value;
});

// Selection bounds encompass more than just the node
const subselected = computed(() => {
    if (!editing.value) return false;


    let selection = props.editor.reactiveState.value.selection;
    let contentSize = props.node.content.size;
    let pos = props.getPos();

    return selection.$anchor.pos < pos && selection.$head.pos > pos + contentSize + 2;
});

const inputAttr = (e) => {
    setAttr(e.target.dataset.attr, e.target.value);
}

const setAttr = (key, value) => {
    props.updateAttributes({[key]: value});
    // Using the input loses the editor's focus so we need to manually force it back
    props.editor.commandManager.commands.setNodeSelection(props.getPos());
}

const inputContent = (e) => {
    props.editor.commands.insertContentAt({
        from: leaderPos.value + 1,
        to: leaderPos.value + 1 + leaderNode.value.content.size,
    }, e.target.value)

    props.editor.commandManager.commands.setNodeSelection(props.getPos());
}
</script>
<template>
    <NodeViewWrapper :id="`fn:${count + 1}`" contenteditable="false" as="span" class="trigger reset-text">
        <div v-if="editing" v-show="active" class="tooltip z-10">
            <div class="tooltip-content">
                <span class="mt-1">Name</span>
                <input type="text" v-model="props.HTMLAttributes.name" data-attr="name" @input="inputAttr"/>
                <span class="mt-1">Group</span>
                <input type="text" v-model="props.HTMLAttributes.group" data-attr="group" @input="inputAttr" placeholder="(optional)"/>
                <span class="mt-1">Content</span>
                <textarea ref="content" :value="props.node.content.content[0]?.text ?? ''" @input="inputContent"></textarea>
            </div>
            <div class="carrot"></div>
        </div>
        <sup><a>[{{count + 1}}]</a></sup>
    </NodeViewWrapper>
</template>
<style scoped>
.reset-text {
    @apply not-italic font-normal no-underline;
}

.trigger {
    @apply inline relative cursor-pointer h-6;
}

.tooltip {
    @apply absolute top-[125%] left-1/2 -translate-x-1/2 pt-2 z-10 reset-text;
}

.tooltip-content {
    @apply flex flex-col text-ui-200 rounded-md bg-ui-1000 p-2 pt-1 z-10 relative min-w-64 text-sm;
}

.tooltip-content > span {
    @apply text-xs select-none
}

.carrot {
    @apply absolute border-8 bottom-full -mb-4 left-1/2 -translate-x-1/2 rotate-45 border-ui-1000;
}

input, textarea {
    @apply px-2 py-1 text-sm border-none bg-ui-900 rounded;
}
</style>
