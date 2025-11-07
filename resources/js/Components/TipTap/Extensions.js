import {Mark, mergeAttributes, Node} from '@tiptap/core'
import {VueMarkViewRenderer, VueNodeViewRenderer} from '@tiptap/vue-3'

import SpoilerComponent from './Spoiler.vue'
import LargeLinkComponent from './LargeLink.vue'

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
});

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
        return VueNodeViewRenderer(LargeLinkComponent)
    },
});
