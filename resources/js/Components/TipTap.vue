<script setup>
import {EditorContent, useEditor,} from '@tiptap/vue-3'
import {computed, ref, watch} from "vue";
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
import Icon from "@/Components/Icon.vue";
import {getUser, isAuthenticated} from "@/util.js";

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

const source = ref(false);

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
    // TODO: Mentions
];
const editor = useEditor({
    extensions: extensions,
    content: props.modelValue,
    onUpdate: () => {
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

// const v = computed(() => {
//     return props.modelValue
// })
// watch(v, () => {
//     editor.value.commands.setContent(props.modelValue, false)
// });
</script>
<template>
    <div class="y items-center">
        <div v-if="editor && editable" class="x w-full flex-wrap border-b border-ui-700">
            <div class="flex flex-wrap items-center text-xl p-1 gap-1">
                <button title="Bold" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-ui-700': editor.isActive('bold') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-1">
                        <path fill-rule="evenodd" d="M4 3a1 1 0 0 1 1-1h6a4.5 4.5 0 0 1 3.274 7.587A4.75 4.75 0 0 1 11.25 18H5a1 1 0 0 1-1-1V3Zm2.5 5.5v-4H11a2 2 0 1 1 0 4H6.5Zm0 2.5v4.5h4.75a2.25 2.25 0 0 0 0-4.5H6.5Z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Italics" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-ui-700': editor.isActive('italic') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-1">
                        <path fill-rule="evenodd" d="M8 2.75A.75.75 0 0 1 8.75 2h7.5a.75.75 0 0 1 0 1.5h-3.215l-4.483 13h2.698a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3.215l4.483-13H8.75A.75.75 0 0 1 8 2.75Z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Strikethrough" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-ui-700': editor.isActive('strike') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-1">
                        <path fill-rule="evenodd" d="M11.617 3.963c-1.186-.318-2.418-.323-3.416.015-.992.336-1.49.91-1.642 1.476-.152.566-.007 1.313.684 2.1.528.6 1.273 1.1 2.128 1.446h7.879a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h3.813a5.976 5.976 0 0 1-.447-.456C5.18 7.479 4.798 6.231 5.11 5.066c.312-1.164 1.268-2.055 2.61-2.509 1.336-.451 2.877-.42 4.286-.043.856.23 1.684.592 2.409 1.074a.75.75 0 1 1-.83 1.25 6.723 6.723 0 0 0-1.968-.875Zm1.909 8.123a.75.75 0 0 1 1.015.309c.53.99.607 2.062.18 3.01-.421.94-1.289 1.648-2.441 2.038-1.336.452-2.877.42-4.286.043-1.409-.377-2.759-1.121-3.69-2.18a.75.75 0 1 1 1.127-.99c.696.791 1.765 1.403 2.952 1.721 1.186.318 2.418.323 3.416-.015.853-.288 1.34-.756 1.555-1.232.21-.467.205-1.049-.136-1.69a.75.75 0 0 1 .308-1.014Z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Underline" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'bg-ui-700': editor.isActive('underline') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-1">
                        <path fill-rule="evenodd" d="M4.75 2a.75.75 0 0 1 .75.75V9a4.5 4.5 0 1 0 9 0V2.75a.75.75 0 0 1 1.5 0V9A6 6 0 0 1 4 9V2.75A.75.75 0 0 1 4.75 2ZM2 17.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                    </svg>
                </button>

                <div class="py-3 border-x rounded border-ui-700"></div>
                <button title="Blockquote" class="px-2 py-1 rounded" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'bg-ui-700': editor.isActive('blockquote') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-0.5">
                        <path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 0 0 1.33 0l1.713-3.293a.783.783 0 0 1 .642-.413 41.102 41.102 0 0 0 3.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2ZM6.75 6a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Bullet Points" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-ui-700': editor.isActive('bulletList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-1">
                        <path fill-rule="evenodd" d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button title="Numbered List" class="px-2 py-0.5 rounded" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'bg-ui-700': editor.isActive('orderedList') }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 my-1">
                        <path d="M3 1.25a.75.75 0 0 0 0 1.5h.25v2.5a.75.75 0 0 0 1.5 0V2A.75.75 0 0 0 4 1.25H3ZM2.97 8.654a3.5 3.5 0 0 1 1.524-.12.034.034 0 0 1-.012.012L2.415 9.579A.75.75 0 0 0 2 10.25v1c0 .414.336.75.75.75h2.5a.75.75 0 0 0 0-1.5H3.927l1.225-.613c.52-.26.848-.79.848-1.371 0-.647-.429-1.327-1.193-1.451a5.03 5.03 0 0 0-2.277.155.75.75 0 0 0 .44 1.434ZM7.75 3a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM7.75 9.25a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM7.75 15.5a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM2.625 13.875a.75.75 0 0 0 0 1.5h1.5a.125.125 0 0 1 0 .25H3.5a.75.75 0 0 0 0 1.5h.625a.125.125 0 0 1 0 .25h-1.5a.75.75 0 0 0 0 1.5h1.5a1.625 1.625 0 0 0 1.37-2.5 1.625 1.625 0 0 0-1.37-2.5h-1.5Z" />
                    </svg>
                </button>

                <div class="py-3 border-x border-ui-700"></div>

                <Icon title="Undo" @click="editor.chain().focus().undo().run()" class="mx-2 my-1 w-5" size="24" type="outline" name="arrow-uturn-left"/>
                <Icon title="Redo" @click="editor.chain().focus().undo().run()" class="mx-2 my-1 w-5" size="24" type="outline" name="arrow-uturn-right"/>
                <Icon title="Source" @click="source = !source" v-if="isAuthenticated() && getUser().roles.includes('admin')" :class="{ 'bg-ui-700': source }" class="mx-2 my-1 w-5" size="24" type="outline" name="code-bracket"/>
                <Icon title="Spoiler" @click="addSpoiler" class="mx-2 my-1 w-5" size="24" type="outline" name="eye-slash"/>

                <div class="py-3 border-x border-ui-700"></div>

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
    @apply rounded-lg aspect-video max-h-[20rem] w-full
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
