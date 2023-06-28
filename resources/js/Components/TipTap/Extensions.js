import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Spoiler from './Spoiler.vue'

export const HSpoiler = Node.create({
    name: 'h-spoiler',

    group: 'inline',

    inline: true,

    content: 'text*',

    addAttributes() {
        return {
            visible: {
                default: false,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'h-spoiler',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['h-spoiler', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(Spoiler)
    },
})
