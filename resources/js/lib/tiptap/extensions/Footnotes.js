import {Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-3";
import TTFootnote from "@/Components/TipTap/TTFootnote.vue";
import TTReferences from "@/Components/TipTap/TTReferences.vue";

export const Footnote = Node.create({
    name: 'footnote',

    content: 'inline*',

    group: 'inline',

    inline: true,

    code: true,

    defining: true,

    atom: true,

    addAttributes() {
        return {
            'name': {
                default: '',
                isRequired: false,
            },
            'group': {
                default: '',
                isRequired: false,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'ref',
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['ref', HTMLAttributes, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTFootnote)
    },

    addStorage() {
        return {
            footnotes: {},
        }
    },

    addCommands() {
        return {
            addFootnote: () => ({ state, tr }) => {
                tr.insert(state.selection.anchor, this.type.create());

                return true;
            }
        }
    },
});

export const References = Node.create({
    name: 'references',

    content: 'block*',

    group: 'block',

    defining: true,

    atom: true,

    addAttributes() {
        return {
            'group': {
                default: '',
                isRequired: false,
            },
            'title': {
                default: null,
                isRequired: false,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'references',
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['references', HTMLAttributes, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTReferences)
    },

    addCommands() {
        return {
            addReferences: () => ({ state, tr }) => {
                tr.insert(state.selection.anchor, this.type.create());

                return true;
            }
        }
    },
});
