<script setup>
import {EditorContent, useEditor, VueMarkViewRenderer, VueNodeViewRenderer,} from '@tiptap/vue-3'
import {ref, watch} from "vue";
import {Youtube} from "@tiptap/extension-youtube";
import {TextAlign} from "@tiptap/extension-text-align";
import {CharacterCount, Placeholder} from "@tiptap/extensions";
import {Image} from "@tiptap/extension-image";
import {StarterKit} from "@tiptap/starter-kit";
import {Heading} from "@tiptap/extension-heading";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import {generateHTML, generateJSON} from "@tiptap/html";
import {LargeLink, Spoiler, Include} from "./TipTap/Extensions";
import InvisibleCharacters from "@tiptap/extension-invisible-characters";
import {Table, TableCell, TableHeader, TableRow} from "@tiptap/extension-table";
import {Document} from "@tiptap/extension-document";
import {Footnote, FootnoteReference, Footnotes} from "tiptap-footnotes";
import {Link as ExtensionLink} from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import TableOfContents from "@tiptap/extension-table-of-contents";
import TTAutoLink from "@/Components/TipTap/TTAutoLink.vue";
import Superscript from "@tiptap/extension-superscript";
import TTHeading from "@/Components/TipTap/TTHeading.vue";
import {Codemirror} from "vue-codemirror";
import {basicSetup, EditorView} from "codemirror";
import {lua} from "@codemirror/legacy-modes/mode/lua"
import {html} from "@codemirror/lang-html"
import {StreamLanguage} from "@codemirror/language";
import {githubDark} from "@fsegurai/codemirror-theme-github-dark";

const props = defineProps({
    editable: {
        type: Boolean,
        default: true,
    },
    max: Number
});

const toc = ref([]);

const model = defineModel();

const extensions = [
    // Basics
    StarterKit.configure({
        document: false,
        heading: false,
        link: false,
    }),
    Placeholder.configure({
        placeholder: 'Write something …',
    }),
    CharacterCount,
    InvisibleCharacters.configure({
        visible: false,
    }),
    Document.extend({
        content: "block+ footnotes?",
    }),

    // Styling
    TextAlign,
    // TextStyle,
    // list kit is installed but also all but task is in starter

    // Content
    Heading.extend({
        addNodeView: _ => VueNodeViewRenderer(TTHeading)
    }),
    Table.configure({
        resizable: false
    }),
    TableCell,
    TableHeader,
    TableRow,
    Subscript,
    Superscript,
    ExtensionLink.extend({
        addMarkView: _ => VueMarkViewRenderer(TTAutoLink)
    }),

    // Media
    Image,
    Youtube,

    // Our extensions
    Spoiler,
    LargeLink,
    Include,
    // TODO: Mentions

    // Other extensions
    Footnotes,
    Footnote,
    FootnoteReference,
    // TODO: replace
    TableOfContents.configure({
        getId: _ => '',
        onUpdate: (anchors) => {
            toc.value = [
                {
                    id: -1,
                    title: '(Top)',
                    anchor: '',
                    level: 0
                }
            ];

            anchors.forEach((a) => {
                toc.value.push({
                    id: a.id,
                    title: a.textContent,
                    anchor: a.textContent.replaceAll(' ', '_'),
                    level: a.level,
                })
            });
        },
    }),
];

const mounted = ref(false);

const editor = useEditor({
    extensions: extensions,
    content: model.value,
    immediatelyRender: true,
    onUpdate: () => {
        if (editability.value) {
            editability.value = false;
            return;
        }

        if (!mutating.value) {
            changing.value = true;
            model.value = editor.value.getHTML();
        } else {
            mutating.value = false;
        }
    },
    onCreate: () => {
        mounted.value = true;
        editability.value = true;
        editor.value.setEditable(props.editable);
    }
});

const source = ref(false);

const changing = ref(false); // internal change, don't reset cursor position and stuff
const mutating = ref(false); // external change, used to prevent runaway event loops
const editability = ref(false); // external change of editable

watch(() => props.editable, (v) => {
    editability.value = true;
    if (editor.value) editor.value.setEditable(v)
});

watch(model, (v) => {
    if (!changing.value && editor.value) {
        mutating.value = true;
        editor.value.commands.setContent(v);
    } else {
        changing.value = false;
    }
});

const codemirrorExtensions = [basicSetup, EditorView.lineWrapping, html(), githubDark];
// const codemirrorExtensions = [basicSetup, StreamLanguage.define(lua), EditorView.lineWrapping, html()];

defineExpose({toc});

const ctrlBar = [
    {
        'Undo': {icon: 'arrow-uturn-left', click: 'undo'},
        'Redo': {icon: 'arrow-uturn-right', click: 'redo'},
    },
    {
        'List': {
            children: {
                'Bullet List': {icon: 'list-bullet', click: 'toggleBulletList', active: 'bulletList'},
                'Ordered List': {icon: 'numbered-list', click: 'toggleOrderedList', active: 'orderedList'},
            },
        },
        'Insert': {
            children: {
                'Footnote': {icon: 'bookmark', click: 'addFootnote'},
                'Table': {icon: 'table-cells', click: _ => editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()},
            },
        },
    },
    {
        'Blockquote': {icon: 'chat-bubble-bottom-center-text', click: 'toggleBlockquote', active: 'blockquote'},
        'Code Block': {icon: 'code-bracket-square', click: 'toggleCodeBlock', active: 'codeBlock'},
    },
    {
        'Bold': {icon: 'bold', click: 'toggleBold', active: 'bold'},
        'Italics': {icon: 'italic', click: 'toggleItalic', active: 'italic'},
        'Strikethrough': {icon: 'strikethrough', click: 'toggleStrike', active: 'strike'},
        'Underline': {icon: 'underline', click: 'toggleUnderline', active: 'underline'},
        'Code': {icon: 'variable', click: 'toggleCode', active: 'code'},
        'Spoiler': {icon: 'eye-slash', click: 'toggleSpoiler', active: 'spoiler'},
    },
    {
        'Source': {icon: 'code-bracket', click: _ => source.value = !source.value, active: _ => source.value},
        'Whitespace': {icon: 'backspace', click: 'toggleInvisibleCharacters', active: _ => editor.value.storage.invisibleCharacters.visibility()},
    }
];

const buttonStyle = b => {
    return {
        'bg-ui-700': b.active ? (typeof b.active === 'string' ? editor.value.isActive(b.active) : b.active()) : false,
        'px-2 py-1.5 rounded cursor-pointer': true,
    };
}

const buttonClick = b => {
    b.click ? (typeof b.click === 'string' ? editor.value.commands[b.click]() : b.click()) : void(0);
}
</script>
<template>
    <div class="y items-center relative">
        <div v-if="editor && editable" class="x flex-wrap items-center w-full border-b border-ui-700 p-1 gap-1 sticky top-0 bg-ui-950 rounded-t-lg z-10">
            <div v-for="(section, i) in ctrlBar" class="x items-center space-x-1">
                <div v-if="i !== 0" class="py-3 border-x border-ui-700 ml-1"></div>
                <Tooltip v-for="(button, name) in section" :message="name">
                    <Dropdown v-if="button.children" align="left">
                        <template #trigger>
                            <div class="x items-center rounded pl-2 pr-1 py-1">
                                <span class="text-sm">{{ name }}</span>
                                <Icon size="16" scale="size-3" class="ml-1" name="chevron-down"/>
                            </div>
                        </template>
                        <template #content>
                            <div @click.stop v-for="(child, name) in button.children" class="x items-center space-x-1" :class="buttonStyle(child)" @click="buttonClick(child)">
                                <Icon :name="child.icon" scale="size-4" type="outline" size="24"/>
                                <span class="text-sm">{{ name }}</span>
                            </div>
                        </template>
                    </Dropdown>
                    <Icon v-else :name="button.icon" @click="buttonClick(button)" :class="buttonStyle(button)" type="outline" size="24"/>
                </Tooltip>
            </div>
        </div>

        <Codemirror v-if="source" v-model="model" placeholder="Code goes here..." :autofocus="true" :indent-with-tab="true" :tab-size="4" :extensions="codemirrorExtensions"/>
        <editor-content v-else-if="mounted" class="w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-ui-600 prose-ui !prose-invert" :class="{'p-4 bg-ui-900': editable}" :editor="editor" />
        <div v-else-if="model" class="w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-ui-600 prose-ui !prose-invert">
            <div class="tiptap ProseMirror" v-html="generateHTML(generateJSON(model, extensions), extensions)"></div>
        </div>

        <div v-if="editable && typeof model === 'string'" class="x justify-end text-sm border-t border-ui-700 w-full px-2 py-0.5 space-x-2">
            <span>{{ model.split(' ').length }} Words</span>
            <span>{{ model.length }}<span v-if="max">/{{ max }}</span> Characters (<Tooltip class="underline cursor-help" :inline="true" position="top-left" message="Characters include the rich text source code">?</Tooltip>)</span>
        </div>
    </div>
</template>
