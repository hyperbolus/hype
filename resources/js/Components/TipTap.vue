<script setup>
import {EditorContent, useEditor, VueRenderer} from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {ref, watch} from "vue";
import {Mention} from "@tiptap/extension-mention";
import MentionList from "@/Components/MentionList.vue";
import tippy from "tippy.js";
import {Link} from "@tiptap/extension-link";
import {Bold} from "@tiptap/extension-bold";
import {Italic} from "@tiptap/extension-italic";
import {Underline} from "@tiptap/extension-underline";
import {Youtube} from "@tiptap/extension-youtube";
import {TextAlign} from "@tiptap/extension-text-align";
import {Placeholder} from "@tiptap/extension-placeholder";
import {Strike} from "@tiptap/extension-strike";
import {TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {CharacterCount} from "@tiptap/extension-character-count";
import {Blockquote} from "@tiptap/extension-blockquote";
import {Image} from "@tiptap/extension-image";
import {History} from "@tiptap/extension-history";

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
})

const usernames = ref([]);

const searchNames = async (query) => {
    return fetch('/api/mention?name=' + query).then(data => data.json())
}

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Underline,
        Youtube,
        TextAlign,
        TextStyle,
        Strike,
        Placeholder,
        Link,
        Image,
        Color,
        CharacterCount,
        Blockquote,
        History,
        Mention.configure({
            HTMLAttributes: {
                class: 'p-1 rounded bg-neutral-900'
            },
            suggestion: {
                items: ({ query }) => {
                    return searchNames(query)
                    //return ['admin', 'aladin', 'albert', 'amy'].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
                },
                render: () => {
                    let component, popup

                    return {
                        onStart: props => {
                            component = new VueRenderer(MentionList, {
                                props,
                                editor: props.editor,
                            })

                            popup = tippy('body', {
                                getReferenceClientRect: props.clientRect,
                                appendTo: () => document.body,
                                content: component.element,
                                showOnCreate: true,
                                interactive: true,
                                trigger: 'manual',
                                placement: 'bottom-start',
                            })
                        },
                        onUpdate(props) {
                            component.updateProps(props)

                            popup[0].setProps({
                                getReferenceClientRect: props.clientRect,
                            })
                        },
                        onKeyDown(props) {
                            return component.ref?.onKeyDown(props)
                        },
                        onExit() {
                            popup[0].destroy()
                            component.destroy()
                        },
                    }
                }
            }})
    ],
    content: props.modelValue,
    onUpdate: () => {
        emit('update:modelValue', JSON.stringify(editor.value.getJSON()))
        //emit('update:modelValue', editor.value.getHTMK())
    },
})

watch(props.modelValue, (old, current) => {
    // HTML
    //const isSame = editor.value.getHTML() === old

    // JSON
    const isSame = JSON.stringify(editor.value.getJSON()) === JSON.stringify(value)

    if (isSame) {
        return
    }

    editor.value.commands.setContent(value, false)
})
</script>
<template>
    <div class="flex flex-col items-center">
        <div v-if="editor" class="flex flex-wrap mb-2 gap-2">
            <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-neutral-700': editor.isActive('bold') }">
                bold
            </button>
            <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-neutral-700': editor.isActive('italic') }">
                italic
            </button>
            <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-neutral-700': editor.isActive('strike') }">
                strike
            </button>
            <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'bg-neutral-700': editor.isActive('blockquote') }">
                blockquote
            </button>
            <button class="px-2 py-1 rounded" @click="editor.chain().focus().undo().run()">
                undo
            </button>
            <button class="px-2 py-1 rounded" @click="editor.chain().focus().redo().run()">
                redo
            </button>
        </div>
        <editor-content class="w-full prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-neutral-600 !m-2 prose-neutral !prose-invert rounded bg-neutral-800" :editor="editor" />
    </div>
</template>
<style>
.ProseMirror {
    padding: 0.5rem 0.75rem !important;
}
.ProseMirror-focused {
    outline: none;
}
</style>
