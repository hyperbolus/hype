<script setup>
import {EditorContent, generateJSON, useEditor, VueRenderer} from '@tiptap/vue-3'
import {ref, toRef, watch} from "vue";
import {Mention} from "@tiptap/extension-mention";
import MentionList from "@/Components/MentionList.vue";
import tippy from "tippy.js";
import {Underline} from "@tiptap/extension-underline";
import {Youtube} from "@tiptap/extension-youtube";
import {TextAlign} from "@tiptap/extension-text-align";
import {Placeholder} from "@tiptap/extension-placeholder";
import {TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {CharacterCount} from "@tiptap/extension-character-count";
import {Image} from "@tiptap/extension-image";
import {StarterKit} from "@tiptap/starter-kit";

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    editable: {
        type: Boolean,
        default: true,
    }
})

const source = ref(false)
const usernames = ref([]);

const searchNames = async (query) => {
    return fetch('/api/mention?name=' + query).then(data => data.json())
}

const editable = ref(props.editable);
watch(editable, (old, current) => {
    editor.value.setEditable(current);
})

const emit = defineEmits(['update:modelValue'])
const extensions = [
    StarterKit,
    Underline,
    Youtube,
    TextAlign,
    TextStyle,
    Placeholder,
    Image,
    Color,
    CharacterCount,
    Mention.configure({
        HTMLAttributes: {
            class: 'p-1 rounded bg-neutral-100 dark:bg-neutral-900'
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
];
const editor = useEditor({
    extensions: extensions,
    content: props.modelValue,
    onUpdate: () => {
        //emit('update:modelValue', JSON.stringify(editor.value.getJSON()))
        emit('update:modelValue', editor.value.getHTML())
    },
    onCreate: () => {
        editor.value.setEditable(editable.value);
    }
})

watch(props.modelvalue, (old, current) => {
    // HTML
    //const isSame = editor.value.getHTML() === old

    // JSON
    //const isSame = JSON.stringify(editor.value.getJSON()) === JSON.stringify(value)

    // if (isSame) {
    //     return
    // }

    editor.value.commands.setContent(props.modelValue, false)
},
    {
        deep: true,
    })
</script>
<template>
    <div class="y items-center">
        <div v-if="editor && editable" class="x w-full flex-wrap divide-x divide-neutral-300 dark:divide-neutral-700 border-b border-neutral-300 dark:border-neutral-700">
            <div class="x items-center text-xl p-1 space-x-1">
                <button class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-neutral-300 dark:bg-neutral-700': editor.isActive('bold') }">
                    <span class="block w-4">&#119809;</span>
                </button>
                <button class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-neutral-300 dark:bg-neutral-700': editor.isActive('italic') }">
                    <span class="block w-4">&#119868;</span>
                </button>
                <button class="relative px-2 py-0.5 rounded" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-neutral-300 dark:bg-neutral-700': editor.isActive('strike') }">
                    <span class="block w-4 font-bold">S</span>
                    <span class="absolute rounded left-[25%] top-[.9rem] border-y border-neutral-700 dark:border-neutral-300 px-2"></span>
                </button>
            </div>
            <div class="x items-center p-1">
                <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'bg-neutral-300 dark:bg-neutral-700': editor.isActive('blockquote') }">
                    <span class="block px-1 scale-[1.8] translate-y-[.42rem]">&#128630;</span>
                </button>
                <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-neutral-300 dark:bg-neutral-700': editor.isActive('bulletList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
                <button class="px-2 py-1 rounded" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'bg-neutral-300 dark:bg-neutral-700': editor.isActive('orderedList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                </button>
            </div>
            <div class="x items-center p-1">
                <button class="px-2 py-1 rounded" @click="editor.chain().focus().undo().run()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button class="px-2 py-1 rounded" @click="editor.chain().focus().redo().run()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button class="px-2 py-1 rounded" v-if="$page.props.auth && $page.props.user.roles.includes('admin')" @click="source = !source" :class="{ 'bg-neutral-300 dark:bg-neutral-700': source }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                </button>

            </div>
        </div>
        <editor-content class="w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-neutral-600 prose-neutral !prose-invert" :class="{'p-4 bg-neutral-100 dark:bg-neutral-800': editable}" :editor="editor" />
        <pre v-if="source" class="p-2 text-xs w-full overflow-x-auto">{{ modelValue }}</pre>
    </div>
</template>
<style>
.rounded > .ProseMirror {
    padding: 0.5rem 0.75rem !important;
}
.ProseMirror-focused {
    outline: none;
}

.ProseMirror li > p {
    display: inline;
}

.ProseMirror li > ol, .ProseMirror li > ul {
    margin-left: 1rem;
}

.ProseMirror ol { list-style-type: decimal;}
.ProseMirror ol ol { list-style-type: lower-alpha;}
.ProseMirror ol ol ol {list-style-type: lower-roman;}

.ProseMirror ul { list-style-type: disc ;}
.ProseMirror ul ul { list-style-type: circle ;}
.ProseMirror ul ul ul {list-style-type: square ;}
</style>
