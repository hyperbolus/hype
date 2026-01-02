import {Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-3";
import TTLiquid from "@/Components/TipTap/TTLiquid.vue";

export const Liquid = Node.create({
    name: 'liquid',

    content: 'inline*',

    group: 'inline',

    inline: true,

    code: true,

    defining: true,

    atom: true,

    parseHTML() {
        return [
            {
                tag: 'liquid',
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['liquid', HTMLAttributes, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTLiquid)
    },

    addCommands() {
        return {
            addLiquid: () => ({ state, tr }) => {
                tr.insert(state.selection.anchor, this.type.create());

                return true;
            }
        }
    },
})
