<script setup>
import {EditorContent, useEditor} from '@tiptap/vue-3'
import {nextTick, ref, watch} from "vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import {generateHTML, generateJSON} from "@tiptap/html";
import {Codemirror} from "vue-codemirror";
import {basicSetup, EditorView} from "codemirror";
import {lua} from "@codemirror/legacy-modes/mode/lua"
import {html} from "@codemirror/lang-html"
import {StreamLanguage} from "@codemirror/language";
import {githubDark} from "@fsegurai/codemirror-theme-github-dark";
import {liquid as codemirrorLiquid} from "@codemirror/lang-liquid";
import {extensions} from "../lib/tiptap/Extensions.js";

const props = defineProps({
    editable: {
        type: Boolean,
        default: true,
    },
    max: Number,
    language: {
        type: String,
        default: 'html'
    },
    wiki: Boolean,
    liquid: Boolean
});

const toc = ref([]);

const model = defineModel();

const mounted = ref(false);

const _extensions = props.wiki ? [...extensions.standard, ...extensions.wiki] : extensions.standard;

const editor = useEditor({
    extensions: _extensions,
    content: model.value,
    immediatelyRender: true,
    parseOptions: {
        preserveWhitespace: 'full',
    },
    onUpdate: (props) => {
        let top = {
            id: -1,
            title: '(Top)',
            level: 0,
            anchor: '',
            children: [],
        };

        let headings = [];
        let levels = [top];

        let footnotes = {};
        let n = 0;

        let unset = [];

        let { view } = props.editor;

        props.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'heading') headings.push(node)
            if (node.type.name === 'footnote') {
                // If we don't have this node's group yet create a new blank one
                if (!footnotes.hasOwnProperty(node.attrs.group)) footnotes[node.attrs.group] = {};

                if (node.attrs.name === '#####') unset.push({node, pos});

                // If we haven't seen this named node yet then append it
                if (!footnotes[node.attrs.group].hasOwnProperty(node.attrs.name)) {
                    footnotes[node.attrs.group][node.attrs.name] = {
                        id: n++,
                        content: node.content.content?.[0]?.text ?? ''
                    }
                }
            }
        });

        if (unset.length > 0) {
            let tr = view.state.tr.setMeta('addToHistory', false);

            for (let i = 0; i < unset.length; i++) tr.setNodeAttribute(unset[i].pos, 'name', `${n++}`);

            view.dispatch(tr);

            // WORST HACK OF ALL TIME
            // forces re-render
            // still not sure if this is tiptap needs to rerender or the vue component
            source.value = true;
            nextTick(() => source.value = false)
        }

        props.editor.storage.footnote.footnotes = footnotes;

        for (let heading of headings) {
            let content = '';

            for (let c of heading.content.content) content += c?.text ?? '';

            let node = {
                id: 0,
                title: content,
                level: heading.attrs.level,
                anchor: content.replaceAll(' ', '_'),
                children: [],
            };

            while (node.level <= levels[levels.length - 1].level) levels.pop();

            levels[levels.length - 1].children.push(node);
            // I made this awesome system that nests all the headings and now im gonna nerf it :/
            if (node.level === 1) levels.push(node);
        }

        let nodes = top.children;
        top.children = [];

        toc.value = [top, ...nodes];

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

const source = ref(props.language !== 'html' || props.liquid);

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
        editor.value.commands.setContent(v, {
            parseOptions: {
                preserveWhitespace: 'full',
            }
        });
    } else {
        changing.value = false;
    }
});

const codemirrorExtensions = [
    basicSetup,
    EditorView.lineWrapping,
    githubDark,
    (() => {
        let lang;

        switch (props.language) {
            case 'lua':
                lang = StreamLanguage.define(lua);
                break;
            case 'html':
            default:
                lang = html();
        }

        if (props.liquid) return codemirrorLiquid({
            base: lang,
            tags: [
                {label: 'invoke'},
                {label: 'template'},
            ]
        });

        return lang;
    })()
];

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
                'References': {icon: 'bookmark-square', click: 'addReferences'},
                'Table': {icon: 'table-cells', click: _ => editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()},
                ...(props.wiki ? {
                    'Template': {icon: 'puzzle-piece', click: 'addInclude'},
                    'Liquid': {icon: 'code-bracket', click: 'addLiquid'},
                    'Module': {icon: 'command-line', click: 'addInvoke'},
                }: {})
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
        'Source': {icon: 'code-bracket', click: _ => source.value = !source.value || props.language !== 'html' || props.liquid, active: _ => source.value},
        'Whitespace': {icon: 'backspace', click: 'toggleInvisibleCharacters', active: _ => editor.value.storage.invisibleCharacters.visibility()},
    }
];

const buttonStyle = b => ({
    'bg-ui-700': b.active ? (typeof b.active === 'string' ? editor.value.isActive(b.active) : b.active()) : false,
    'px-2 py-1.5 rounded cursor-pointer': true,
});

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
                                <Icon :name="child.icon" scale="size-5" type="outline" size="24"/>
                                <span class="text-sm">{{ name }}</span>
                            </div>
                        </template>
                    </Dropdown>
                    <Icon v-else :name="button.icon" @click="buttonClick(button)" :class="buttonStyle(button)" type="outline" size="24"/>
                </Tooltip>
            </div>
        </div>

        <Codemirror
            :disabled="!editable"
            v-if="source"
            v-model="model"
            placeholder="Code goes here..."
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="codemirrorExtensions"
            :class="{'cm-noedit': !editable}"
        />
        <EditorContent
            v-else-if="mounted"
            class="tiptap-parent prose-ui grow"
            :class="{'p-4 bg-ui-900': editable}"
            :editor="editor"
        />
        <div v-else-if="model" class="tiptap-parent prose-ui">
            <div class="tiptap ProseMirror" v-html="generateHTML(generateJSON(model, _extensions), _extensions)"></div>
        </div>

        <div v-if="editable && typeof model === 'string'" class="x justify-between text-sm border-t border-ui-700 w-full px-2 py-0.5 space-x-2">
            <div>
                <span v-show="source">{{ liquid ? 'liquid-' : '' }}{{ language }}</span>
            </div>
            <div class="x space-x-2">
                <span>{{ model.split(' ').length }} Words</span>
                <span>{{ model.length }}<span v-if="max">/{{ max }}</span> Characters (<Tooltip class="underline cursor-help" :inline="true" position="top-left" message="Characters include the rich text source code">?</Tooltip>)</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.tiptap-parent {
    @apply w-full prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside prose-p:p-1 prose-blockquote:pl-2 prose-blockquote:border-l-2 prose-blockquote:border-l-ui-600 !prose-invert;
}
</style>
<style>
/* Scrolling nodes into view can get obstructed by sticky toolbar */
html {
    scroll-padding-top:4rem;
}
</style>

