import {Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-3";
import TTModule from "@/Components/TipTap/TTModule.vue";

export const Module = Node.create({
    name: 'invoke',

    content: 'inline*',

    group: 'inline',

    inline: true,

    code: true,

    defining: true,

    atom: true,

    addAttributes() {
        return {
            'module': {
                default: '',
                isRequired: false,
            },
            'subscript': {
                default: '',
                isRequired: false,
            },
            'args': {
                default: '',
                isRequired: false,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'invoke',
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['invoke', HTMLAttributes, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTModule)
    },

    addCommands() {
        return {
            addInvoke: () => (e) => {
                e.tr.insert(e.state.selection.anchor, this.type.create({
                    'module': '',
                }));

                console.log(e);

                return true;
            }
        }
    },
});
