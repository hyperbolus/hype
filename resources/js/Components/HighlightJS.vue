<script setup>
import {computed} from "vue";
import hljs from "highlight.js/lib/core";
import 'highlight.js/styles/github-dark-dimmed.min.css'
import python from 'highlight.js/lib/languages/python';
import php from 'highlight.js/lib/languages/php';
import javascript from 'highlight.js/lib/languages/javascript';
import http from 'highlight.js/lib/languages/http';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import Icon from "./Icon.vue";

hljs.registerLanguage('python', python)
hljs.registerLanguage('php', php)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('http', http)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)

hljs.registerLanguage('shell', function (hljs) {
    return {
        name: 'Shell',
        keywords: {
            $pattern: /^[a-z]+[\s$]/,
            keyword: '--header --request --url'
        },
        contains: [
            {
                className: 'string',
                begin: '\'',
                end: '\'',
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                ]
            }
        ]
    }
})

hljs.registerLanguage('plain', function () {
    return {
        name: 'Plain',
    }
})

const props = defineProps({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: '',
    },
    lineNumbers: Boolean,
    copyable: {
        type: Boolean,
        default: true,
    }
});

const missingLanguage = computed(() => !hljs.getLanguage(props.language))

const highlightedCode = computed(() => {
    if (missingLanguage.value) return `Language "${props.language}" not supported`

    return hljs.highlight(props.code, {
        language: props.language,
        ignoreIllegals: true,
    }).value
});

// TODO@later: use proxy scroll bars to fix this weird nesting absolute overflow bs nonsense
</script>
<template>
    <div class="relative bg-ui-950">
        <button v-if="copyable" class="p-1 bg-ui-800 rounded hover:bg-ui-700 w-fit border border-ui-700 absolute z-10 top-2 right-4 text-ui-500">
            <Icon class="size-4" name="clipboard-document"/>
        </button>
        <div class="relative overflow-y-auto" data-scroll>
            <div class="x relative w-full">
                <div class="y z-10 font-mono py-2 text-sm select-none text-right bg-ui-900 text-ui-500 border-r border-ui-700" :class="{'invisible': !lineNumbers}">
                    <span v-for="line in (code.match(/\n/g) || []).length + 1" :key="line" class="pl-2 pr-1 last:mb-2">{{ line }}</span>
                </div>
                <div class="grid absolute inset-0 overflow-scroll bg-ui-950 z-0" data-scroll>
                    <pre><code class="!p-2 text-sm hljs" :class="{'ml-7': lineNumbers, [language]: true}" v-html="highlightedCode"></code></pre>
                    <textarea readonly data-dummy :class="{'ml-7': lineNumbers}">{{ code }}</textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
[data-scroll] {
    @apply [scrollbar-width:thin];
}

.hljs {
    @apply bg-ui-950;
}

textarea[data-dummy] {
    @apply text-transparent h-full z-10 font-mono absolute inset-0 focus:ring-0 bg-transparent border-0 p-2 text-sm caret-ui-500 [grid-area:1/1/2/2] resize-none;
}
</style>
