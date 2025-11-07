import {Mark} from '@tiptap/core'
import {VueMarkViewRenderer} from '@tiptap/vue-3'

import SpoilerComponent from './Spoiler.vue'

export const Spoiler = Mark.create({
    name: 'spoiler',

    parseHTML() {
        return [
            { tag: 'spoiler' }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['spoiler', HTMLAttributes, 0]
    },

    addMarkView() {
        return VueMarkViewRenderer(SpoilerComponent)
    },

    addCommands() {
        return {
            setSpoiler: () => ({ commands }) => {
                return commands.setMark(this.name)
            },
            toggleSpoiler: () => ({ commands }) => {
                return commands.toggleMark(this.name)
            },
            unsetSpoiler: () => ({ commands }) => {
                return commands.unsetMark(this.name)
            },
        }
    },
})
