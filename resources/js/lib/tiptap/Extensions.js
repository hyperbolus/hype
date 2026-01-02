import {StarterKit} from "@tiptap/starter-kit";
import {CharacterCount, Focus, Placeholder} from "@tiptap/extensions";
import InvisibleCharacters from "@tiptap/extension-invisible-characters";
import {Document} from "@tiptap/extension-document";
import {TextAlign} from "@tiptap/extension-text-align";
import {Heading} from "@tiptap/extension-heading";
import {VueMarkViewRenderer, VueNodeViewRenderer} from "@tiptap/vue-3";
import {Table, TableCell, TableHeader, TableRow} from "@tiptap/extension-table";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {Link as ExtensionLink} from "@tiptap/extension-link";
import {Image} from "@tiptap/extension-image";
import {Youtube} from "@tiptap/extension-youtube";
import {Spoiler} from "./extensions/Spoiler.js";
import {Module} from './extensions/Module.js';
import {mergeAttributes, Node} from "@tiptap/core";
import TTHeading from "@/Components/TipTap/TTHeading.vue";
import TTAutoLink from "@/Components/TipTap/TTAutoLink.vue";
import {Liquid} from "./extensions/Liquid.js";
import {Include} from "./extensions/Include.js";
import {Footnote, References} from "./extensions/Footnotes.js";

// export const Div = Node.create({
//     name: 'div',
//
//     content: 'block*',
//
//     group: 'block',
//
//     parseHTML() {
//         return [
//             {
//                 tag: 'div',
//             }
//         ]
//     },
//
//     renderHTML({ HTMLAttributes }) {
//         return ['div', HTMLAttributes, 0]
//     },
//
//     addCommands() {
//         return {
//             addDiv: () => ({ state, tr }) => {
//                 tr.insert(state.selection.anchor, this.type.create());
//
//                 return true;
//             }
//         }
//     },
// });

export const extensions = {
    standard: [
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
            // content: "block+ footnotes?",
            // code: true,
        }),
        Focus.configure({
            mode: 'deepest'
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
        ExtensionLink.configure({
            HTMLAttributes: {
                rel: null,
                target: null,
            },
        }).extend({
            addMarkView: _ => VueMarkViewRenderer(TTAutoLink),
        }),

        // Media
        Image,
        Youtube.configure({
            origin: window.location.host,
            addPasteHandler: false,
            HTMLAttributes: {
                referrerpolicy: 'strict-origin-when-cross-origin',
            },
        }),

        // Our extensions
        Spoiler,
        Footnote,
        References,
        // TODO: Mentions

        // Other extensions
        // Node.create({
        //     name: 'whitespace',
        //
        //     priority: 2000,
        //
        //     group: 'block',
        //
        //     content: 'text*',
        //
        //     parseHTML() {
        //         return [{ tag: 'whitespace' }]
        //     },
        //
        //     renderHTML({ HTMLAttributes }) {
        //         return ['whitespace', HTMLAttributes, 0]
        //     },
        // })
    ],
    wiki: [
        Include,
        Module,
        Liquid,
    ],
}
