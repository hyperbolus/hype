import {Mark, mergeAttributes, Node, nodeInputRule} from '@tiptap/core'
import {VueMarkViewRenderer, VueNodeViewRenderer} from '@tiptap/vue-3'
import TTSpoilerComponent from './TTSpoiler.vue'
import TTLargeLinkComponent from './TTLargeLink.vue'
import TTInclude from "@/Components/TipTap/TTInclude.vue";

export const Include = Node.create({
    name: 'include',

    content: 'block+',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            title: {
                default: 'TITLE',
            },
            lang: {
                default: 'en',
            },
            namespace: {
                default: 'Article',
            },
        }
    },

    parseHTML() {
        return [
            { tag: 'include' }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['include', HTMLAttributes]
    },

    addNodeView() {
        return VueNodeViewRenderer(TTInclude)
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: /\{\{ $/,
                type: this.editor.schema.nodes.template,
            }),
        ]
    },
})

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
        return VueMarkViewRenderer(TTSpoilerComponent)
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
        return VueNodeViewRenderer(TTLargeLinkComponent)
    },
});
