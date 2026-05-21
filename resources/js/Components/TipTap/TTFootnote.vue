<script setup>
import {nodeViewProps, NodeViewWrapper} from "@tiptap/vue-3";
import {computed, nextTick, ref, useTemplateRef} from "vue";

const props = defineProps(nodeViewProps);

const editing = ref(props?.editor?.options?.editable);
const content = useTemplateRef('content');
const first = ref(false);
const leaderPos = ref(0);
const leaderNode = ref(null);

const initializedAuto = ref(false);

// Function for getting the "index" of a footnote in a document
// The index is not logical and is instead for the reader as it
// is augmented such that any subsequent footnote which has the
// same identifier or `name` as another footnote earlier in the
// document will not increment the index. New node IDs are auto
const count = computed(() => {
    // The "index" counter used for counting unique footnotes
    let n = 0;

    // Variable holding the returned value. Set as '?' as an indicator for errors
    let out = '?';

    // If this component is rendering the first occurrence of it's footnote and not a later reference
    let firstNode = null;

    let seenGroups = {};

    // We call this function to iterate on all nodes in the TipTap document
    props.editor.state.doc.descendants((node, pos) => {
        // We only are interested in footnote nodes
        if (node.type.name === 'footnote') {
            let name = node.attrs.name.toString();

            // We loop until we find the data of the footnote that is rendering this Vue component instance
            // HOWEVER at this point we don't know if is component is the only instance of this footnote in
            // the document. Later in this code block we will perform futher checks to determine if this is
            if (name === props.HTMLAttributes.name && node.attrs.group === props.HTMLAttributes.group) {
                // If the footnote has no name then we will assign it a new one from the next available index
                // if (name === '') {
                //     // This should only happen once, otherwise we may fall into an infinite loop
                //     if (!initializedAuto.value) {
                //         initializedAuto.value = true;
                //         name = `${n + 1}`; // must set to string!!
                //         // setAttr('name', name);
                //         return;
                //     } else {
                //         // We already initialized this blank node with a default name
                //         console.log('Could not give footnote default integer name (name possibly being edited)')
                //     }
                // }

                // Check if this node is the first occurrence of this footnote (matching name and group)
                if (firstNode === null) {
                    // We save the document position and node so edits to any occurence are routed to the first node
                    leaderPos.value = pos;
                    leaderNode.value = node;
                }

                // If this component is at the position then we are the first node of this footnote in the document
                if (firstNode === null && pos === props.getPos()) {
                    first.value = true;
                    firstNode = true;
                } else {
                    first.value = false;
                    firstNode = null;
                }

                // At this point we've determined the non-repeating index for this node
                out = n;

                // Fetch and copy the footnote content to display here. We have group and name only because we are a reference
                if (content.value) content.value.value = props.editor.storage.footnote.footnotes[node.attrs.group]?.[node.attrs.name]?.content ?? '';

                // We process up to here and no further. Other nodes will do that for themselves
            } else {
                // If this is the first fn of this group, create an array for it
                if (!seenGroups.hasOwnProperty(node.attrs.group)) seenGroups[node.attrs.group] = [];

                // Push named fn and increment counter only for the first instance of it (repeats don't increment)
                if (!seenGroups[node.attrs.group].includes(name)) {
                    seenGroups[node.attrs.group].push(name);
                    n++;
                }
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

    let min = Math.min(selection.$anchor.pos, selection.$head.pos);
    let max = Math.max(selection.$anchor.pos, selection.$head.pos);

    return min < pos || max > pos + contentSize + 2;
});

const inputAttr = (e) => {
    setAttr(e.target.dataset.attr, e.target.value);
}

const setAttr = (key, value, skip = false) => {
    props.updateAttributes({[key]: value});
    // Using the input loses the editor's focus so we need to manually force it back
    if (!skip) props.editor.commandManager.commands.setNodeSelection(props.getPos());
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
        <sup><a>[{{ count + 1 }}]</a></sup>
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
