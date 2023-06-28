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

import { HSpoiler } from "@/Components/TipTap/Extensions.js";

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

    HSpoiler,

    Mention.configure({
        HTMLAttributes: {
            class: 'p-1 overflow-hidden rounded bg-ui-900'
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

// TODO: smart insertion, make it work like a mark
const addSpoiler = () => {
    editor.value.commands.insertContent(`<h-spoiler><p>Spoiler Text</p></h-spoiler> `)
}

const addVideoURL = ref('');

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
        <div v-if="editor && editable" class="x w-full flex-wrap divide-x divide-ui-700 border-b border-ui-700">
            <div class="x items-center text-xl p-1 space-x-1">
                <button title="Bold" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-ui-700': editor.isActive('bold') }">
                    <span class="block w-4">&#119809;</span>
                </button>
                <button title="Italics" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-ui-700': editor.isActive('italic') }">
                    <span class="block w-4">&#119868;</span>
                </button>
                <button title="Strikethrough" class="relative px-2 py-0.5 rounded" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-ui-700': editor.isActive('strike') }">
                    <span class="block w-4 font-bold">S</span>
                    <span class="absolute rounded left-[25%] top-[.9rem] border-y border-ui-300 px-2"></span>
                </button>
                <button title="Underline" class="relative px-2 py-0.5 rounded" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'bg-ui-700': editor.isActive('underline') }">
                    <span class="block w-4 font-bold text-lg relative -top-[0.05rem]">U</span>
                    <span class="absolute rounded left-[25%] bottom-[0.5rem] border-y border-ui-300 px-2"></span>
                </button>
            </div>
            <div class="x items-center p-1">
                <button title="Blockquote" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'bg-ui-700': editor.isActive('blockquote') }">
                    <span class="block px-1 scale-[1.8] translate-y-[.42rem]">&#128630;</span>
                </button>
                <button title="Bullet Points" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-ui-700': editor.isActive('bulletList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
                <button title="Numbered List" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'bg-ui-700': editor.isActive('orderedList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                </button>
            </div>
            <div class="x items-center p-1">
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
                <button title="Source" class="px-2 py-1 rounded" v-if="$page.props.auth && $page.props.user.roles.includes('admin')" @click="source = !source" :class="{ 'bg-ui-700': source }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                </button>
                <button title="Spoiler" class="px-2 py-1 rounded" @click="addSpoiler">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                </button>
            </div>
            <div class="x items-center p-1">
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
                            <Input class="bg-ui-800" type="text" placeholder="Image URL"/>
                        </div>
                    </template>
                </Dropdown>
                <Dropdown align="left">
                    <template #trigger>
                        <button title="Insert Link" class="px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                            </svg>
                        </button>
                    </template>
                    <template #content>
                        <div @click.stop class="y p-2 gap-2">
                            <Input v-model="addLinkURL" class="bg-ui-800" type="text" placeholder="URL"/>
                            <Input v-model="addLinkText" class="bg-ui-800" type="text" placeholder="Text (optional)"/>
                            <button @click="addLink" class="bg-ui-700 rounded-md py-1">Insert</button>
                        </div>
                    </template>
                </Dropdown>
                <Dropdown align="left">
                    <template #trigger>
                        <button title="Insert Video" class="px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                            </svg>
                        </button>
                    </template>
                    <template #content>
                        <div @click.stop class="y p-2 gap-2">
                            <Input v-model="addVideoURL" class="bg-ui-800" type="text" placeholder="URL"/>
                            <button @click="editor.commands.setYoutubeVideo({src: addVideoURL,nocookie: true,width:null,height:null,})" class="bg-ui-700 rounded-md py-1">Insert</button>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>
        <editor-content class="w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-ui-600 prose-ui !prose-invert" :class="{'p-4 bg-ui-800': editable}" :editor="editor" />
        <pre v-if="source" class="p-2 text-xs w-full overflow-x-auto">{{ modelValue }}</pre>
    </div>
</template>
<style>
div[data-youtube-video] > iframe {
    @apply rounded-lg aspect-video h-[20rem]
}

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
