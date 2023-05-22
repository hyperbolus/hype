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
import {Link} from "@tiptap/extension-link";
import {StarterKit} from "@tiptap/starter-kit";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Input from "@/Jetstream/Input.vue";

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
    Link,
    CharacterCount,
    Mention.configure({
        HTMLAttributes: {
            class: 'p-1 overflow-hidden rounded bg-neutral-100 dark:bg-ui-900'
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

const addLinkURL = ref('');
const addLinkText = ref('');
const addLink = () => {
    if (!addLinkURL.value) return;
    editor.value.commands.insertContent(`<a href="${addLinkURL.value}" spellcheck="false">${addLinkText.value ? addLinkText.value : addLinkURL.value}</a>`)
    addLinkURL.value = '';
    addLinkText.value = '';
}

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
        <div v-if="editor && editable" class="x w-full flex-wrap transition-colors divide-x divide-neutral-300 dark:divide-ui-700 border-b border-neutral-300 dark:border-ui-700">
            <div class="x items-center text-xl p-1 space-x-1">
                <button title="Bold" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('bold') }">
                    <span class="block w-4">&#119809;</span>
                </button>
                <button title="Italics" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('italic') }">
                    <span class="block w-4">&#119868;</span>
                </button>
                <button title="Strikethrough" class="relative px-2 py-0.5 rounded" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('strike') }">
                    <span class="block w-4 font-bold">S</span>
                    <span class="absolute rounded left-[25%] top-[.9rem] border-y border-neutral-700 dark:border-ui-300 px-2"></span>
                </button>
                <button title="Underline" class="relative px-2 py-0.5 rounded" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('underline') }">
                    <span class="block w-4 font-bold text-lg relative -top-[0.05rem]">U</span>
                    <span class="absolute rounded left-[25%] bottom-[0.5rem] border-y border-neutral-700 dark:border-ui-300 px-2"></span>
                </button>
            </div>
            <div class="x items-center p-1 transition-colors">
                <button title="Blockquote" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('blockquote') }">
                    <span class="block px-1 scale-[1.8] translate-y-[.42rem]">&#128630;</span>
                </button>
                <button title="Bullet Points" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('bulletList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
                <button title="Numbered List" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'bg-neutral-300 dark:bg-ui-700': editor.isActive('orderedList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                </button>
            </div>
            <div class="x items-center p-1 transition-colors">
                <button title="Undo" class="px-2 py-1 rounded" @click="editor.chain().focus().undo().run()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Redo" class="px-2 py-1 rounded" @click="editor.chain().focus().redo().run()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Source" class="px-2 py-1 rounded" v-if="$page.props.auth && $page.props.user.roles.includes('admin')" @click="source = !source" :class="{ 'bg-neutral-300 dark:bg-ui-700': source }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                </button>
            </div>
            <div class="x items-center p-1 transition-colors">
                <Dropdown class="hidden" align="left" width="fit">
                    <template #trigger>
                        <button title="Insert Image" class="px-2 py-1 rounded" @click="editor.chain().focus().undo().run()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </button>
                    </template>
                    <template #content>
                        <!-- TODO: DO NOT DO THIS SERVER SIDE!!! file:// or similar attack may be possible! -->
                        <div @click.stop class="p-2">
                            <input type="file"/>
                            <span>or</span>
                            <Input class="bg-neutral-200 dark:!bg-ui-800" type="text" placeholder="Image URL"/>
                        </div>
                    </template>
                </Dropdown>
                <Dropdown align="left">
                    <template #trigger>
                        <button title="Insert Image" class="px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                            </svg>
                        </button>
                    </template>
                    <template #content>
                        <div @click.stop class="y p-2 gap-2">
                            <Input v-model="addLinkURL" class="bg-neutral-200 dark:!bg-ui-800" type="text" placeholder="URL"/>
                            <Input v-model="addLinkText" class="bg-neutral-200 dark:!bg-ui-800" type="text" placeholder="Text (optional)"/>
                            <button @click="addLink" class="dark:bg-ui-700 rounded-md py-1">Insert</button>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>
        <editor-content class="transition-colors w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-ui-600 prose-neutral !prose-invert" :class="{'p-4 bg-neutral-100 dark:bg-ui-800': editable}" :editor="editor" />
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

.ProseMirror p.is-editor-empty:first-child::before {
    opacity: 0.5;
    content: 'Write something nice...';
    float: left;
    height: 0;
    pointer-events: none;
}


.ProseMirror li > p {
    display: inline;
}

.ProseMirror li > ol, .ProseMirror li > ul {
    margin-left: 1rem;
}

.ProseMirror a {
    text-decoration: underline;
    cursor: pointer;
}

.ProseMirror ol { list-style-type: decimal;}
.ProseMirror ol ol { list-style-type: lower-alpha;}
.ProseMirror ol ol ol {list-style-type: lower-roman;}

.ProseMirror ul { list-style-type: disc ;}
.ProseMirror ul ul { list-style-type: circle ;}
.ProseMirror ul ul ul {list-style-type: square ;}
</style>
