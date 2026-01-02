import {Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-3";
import TTInclude from "@/Components/TipTap/TTInclude.vue";

export const Include = Node.create({
    name: 'include',

    content: 'inline*',

    group: 'inline',

    inline: true,

    code: true,

    defining: true,

    atom: true,

    addAttributes() {
        return {
            'template': {
                default: '',
                isRequired: false,
            },
            'args': {
                default: '',
                isRequired: false,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'include',
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['include', HTMLAttributes, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTInclude)
    },

    addCommands() {
        return {
            addInclude: () => ({ state, tr }) => {
                tr.insert(state.selection.anchor, this.type.create({
                    'template': '',
                }));

                return true;
            }
        }
    },
});
