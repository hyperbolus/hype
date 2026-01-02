import {mergeAttributes, Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-3";
import TTLargeLink from "@/Components/TipTap/TTLargeLink.vue";

export const LargeLink = Node.create({
    name: 'large-link',

    group: 'block',

    // atom: true,

    addAttributes() {
        return {
            url: {
                default: '#',
            },
            title: {
                default: 'TITLE',
            },
            description: {
                default: 'DESCRIPTION',
            },
            icon: {
                default: 'puzzle-piece',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'large-link',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['large-link', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTLargeLink)
    },
});
