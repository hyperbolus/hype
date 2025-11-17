<script setup>
import {computed, ref, watch} from 'vue';
import Icon from "./Icon.vue";
import HighlightJS from "./HighlightJS.vue";
import {dictionary, languages, codegen} from "../lib/codegen/codegen";
import {objFirst} from "../util";

const props = defineProps({
    responses: {
        type: Array,
        default: [],
    },
    request: {
        type: Object,
        default: {
            headers: [],
            parameters: [],
        },
    },
});

const processKV = (source, fail = []) => {
    if (typeof source !== 'object') return fail;

    let out = [];

    if (Array.isArray(source) && source.length > 0 && source[0].hasOwnProperty('key') && source[0].hasOwnProperty('value')) return source;

    for (const key in source) out.push({
        key: key,
        value: source[key],
    });

    return out;
}

const headers = ref(processKV(props.request.headers));
const parameters = ref(processKV(props.request.parameters));

const inferContentType = () => {
    switch (typeof props.request.body) {
        case 'object': return 'x-www-form-urlencoded';
        default: return props.request.body ? 'raw' : 'none';
    }
}

// request data
const url = ref(props.request.url ?? 'example.com');
const protocol = ref(props.request.protocol ?? 'https');
const method = ref(props.request.method ?? 'get');
const body = ref(processKV(props.request.body, props.request.body));
const contentType = ref(inferContentType());
const responses = ref(props.request.responses ?? []);

// ui
const tab = ref(0);
const request = ref(true);
const response = ref(0);
const showQueryInURL = ref(false);

// codegen
const language = ref(objFirst(languages));
const library = ref(objFirst(languages[language.value].libraries));

const code = computed(() => {
    if (!library.value || !language.value) return '';

    let lang = languages[language.value];
    let lib = lang.libraries[library.value];

    let _url = protocol.value + url.value;
    let query = '';

    try {
        _url = new URL(_url);
        query = _url.searchParams.toString();
        query = query ? `?${query}` : '';
    } catch (e) {
        // reset
        _url = {
            protocol: '',
            host: '',
            pathname: '',
        };
    }

    let _body = body.value;

    // if (typeof _body === 'object') {
    //     let data = {};
    //
    //     for (const parameter of body.value) data[parameter.key] = parameter.value;
    //
    //     _body = new URLSearchParams(data).toString();
    // }

    return codegen(lang, lib, {
        url: protocol.value + url.value,
        _url: _url,
        scheme: _url.protocol,
        host: _url.host,
        path: _url.pathname,
        query: query,
        // FIXME: this is for HTTP because idk but maybe we should leave blank like the others
        fullpath: (_url.pathname ?? '/') + query,
        method: lib.capitalMethod ? method.value.toString().toUpperCase() : method.value,
        parameters: dictionary(lang, lib, parameters.value),
        headers: dictionary(lang, lib, headers.value),
        body: _body,
    });
});

const mirrorParams = (fromURL) => {
    if (!showQueryInURL.value) return;

    let query = new URLSearchParams(fromURL && url.value.includes('?') ? url.value.split('?')[1] : '');

    if (fromURL) {
        parameters.value = [];
        query.forEach((v, k) => parameters.value.push({ key: k, value: v }));
    } else {
        for (const param of parameters.value) if (param.key) query.append(param.key, param.value)
        url.value = url.value.split('?')[0] + (query.size ? '?' + query.toString() : '')
    }
}

watch(showQueryInURL, (v) => {
    if (v) {
        mirrorParams(false);
    } else {
        url.value = url.value.split('?')[0];
    }
});

watch(contentType, (v, o) => {
    if (v === 'x-www-form-urlencoded' && o === 'none') {
        body.value = [];
        return
    }

    if (v === 'raw' && o === 'none') return;

    if (v === 'none') {
        body.value = ''
    } else if (v === 'raw' && o === 'x-www-form-urlencoded') {
        let text = {};

        for (const parameter of body.value) text[parameter.key] = parameter.value;

        body.value = JSON.stringify(text, null, 4);

        if (body.value === '{}') body.value = '';
    } else if (v === 'x-www-form-urlencoded' && o === 'raw') {
        try {
            let data = JSON.parse(body.value);
            let out = [];

            for (const key in data) {
                out.push({
                    key: key,
                    value: data[key],
                });
            }

            body.value = out;

        } catch (e) {
            body.value = [];
        }
    }


});

const currentTab = computed(() => {
    switch (tab.value) {
        case 0: return headers.value;
        case 1: return parameters.value;
        case 2: return body.value;
    }
});
</script>
<template>
    <div class="x items-start gap-2">
        <div class="y w-1/2 shrink-0 space-y-2 p-2 bg-ui-900 border border-ui-700 rounded-lg text-sm">
            <div class="x items-center gap-2 !mt-0.5">
                <select v-model="method">
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                </select>
                <div class="x items-center pr-2 bg-ui-950 rounded-md grow">
                    <select v-model="protocol" class="prefix">
                        <option value="https://">https://</option>
                        <option value="http://">http://</option>
                    </select>
                    <input type="text" @input="mirrorParams(true)" v-model="url" class="grow focus-visible:ring-0 pr-0 pl-2"/>
                </div>
                <button @click="showQueryInURL = !showQueryInURL" class="group p-1 bg-ui-800 rounded hover:bg-ui-700 w-fit border border-ui-700 text-ui-500 hover:text-red-500">
                    <Icon class="size-4" v-show="showQueryInURL" name="eye"/>
                    <Icon class="size-4" v-show="!showQueryInURL"  name="eye-slash"/>
                </button>
            </div>

            <div class="x gap-1.5">
                <button v-for="(name, i) in ['headers', 'parameters', 'body']" @click="tab = i" class="border-b-2 border-ui-700 px-2 py-0.5 capitalize" :class="{'border-b-blue-500': tab === i}">{{ name }}<span v-if="i !== 2"> ({{ (i === 0 ? headers : parameters).length }})</span></button>
            </div>

            <template v-if="tab === 2">
                <select v-model="contentType">
                    <option>none</option>
                    <option>raw</option>
                    <option>x-www-form-urlencoded</option>
                </select>

                <textarea v-if="contentType === 'raw'" rows="5" placeholder="Empty" class="h-full rounded-md bg-ui-950 focus-visible:ring-0 focus-visible:border-ui-700 border-ui-700 placeholder:text-ui-600 text-sm px-2 py-1" v-model="body"></textarea>
            </template>

            <div v-if="tab !== 2 || (tab === 2 && contentType === 'x-www-form-urlencoded')" class="x items-center space-x-2" v-for="(item, i) in currentTab">
                <input type="text" @input="mirrorParams(false)" v-model="item.key" class="w-1/2" :placeholder="tab === 0 ? 'Header' : 'Parameter'"/>
                <input type="text" @input="mirrorParams(false)" v-model="item.value" class="w-1/2" placeholder="Value"/>
                <button @click="currentTab.splice(i, 1) && mirrorParams(false)" class="bg-ui-800 rounded text-red-500 hover:text-white hover:bg-red-500 border border-ui-700 hover:border-red-600">
                    <Icon class="size-5" name="x-mark"/>
                </button>
            </div>
            <p v-if="tab !== 2 && (tab === 0 ? headers : parameters).length === 0" class="bg-ui-950 px-2 py-1 text-center text-ui-500 rounded-lg select-none">No {{ tab === 0 ? 'Headers' : 'Parameters' }}</p>
            <p v-if="tab === 2 && contentType === 'x-www-form-urlencoded' && Object.keys(body).length === 0" class="bg-ui-950 px-2 py-1 text-center text-ui-500 rounded-lg select-none">No Body Data</p>
            <button v-if="tab !== 2 || (tab === 2 && contentType === 'x-www-form-urlencoded')" @click="currentTab.push({key: '', value: ''})" class="p-0.5 bg-ui-800 rounded hover:bg-ui-700 w-fit mx-1 border border-ui-700">
                <Icon class="size-4" name="plus"/>
            </button>
        </div>
        <div class="y w-1/2 border border-ui-700 rounded-lg divide-y divide-ui-700">
            <div class="x items-center space-x-2 bg-ui-900 p-2 pl-2 rounded-t-lg">
                <select v-model="request">
                    <option :value="true">Request</option>
                    <option v-if="responses.length > 0" :value="false">Response</option>
                </select>
                <div class="grow"></div>
                <select v-model="language" @change="library = objFirst(languages[language].libraries)" v-if="request">
                    <option v-for="(lang, key) in languages" :value="key">{{ lang.name }}</option>
                </select>
                <select v-model="library" v-if="request">
                    <option v-for="(lib, key) in languages[language].libraries" :value="key">{{ lib.name }}</option>
                </select>
                <label v-if="!request" class="x items-center rounded-md bg-ui-800 pl-2.5 focus-within:ring-1 ring-blue-500">
                    <span class="p-1 rounded-full -mr-1 z-10" :style="`background:${responses[response].color};`"></span>
                    <select v-model="response" class="focus:ring-0">
                        <option v-for="(res, i) in responses" :value="i">{{ res.name }}</option>
                    </select>
                </label>
            </div>
            <div v-if="request && languages[language]?.libraries[library]?.install" class="p-2 bg-ui-950">
                <div class="x items-center bg-ui-800 rounded-md font-mono">
                    <span class="pl-2 select-none text-sm pr-[1ch]">$</span>
                    <textarea readonly rows="1" class="resize-none bg-transparent border-0 w-full text-sm pr-2 pl-0 focus-visible:ring-0 py-1">{{ languages[language].libraries[library].install ?? 'error, couldn\'t find install command' }}</textarea>
                </div>
            </div>
            <HighlightJS class="rounded-b-lg overflow-hidden" :language="request ? language : (responses[response].language ?? 'plain')" :code="request ? code : responses[response].body" :line-numbers="true"/>
        </div>
    </div>
</template>
<style scoped>
input {
    @apply rounded-md bg-ui-950 border-none py-1 text-sm;
}

select:not(.prefix) {
    @apply border-none bg-ui-800 rounded-md text-sm py-1 pr-8 ring-blue-500;
}

select.prefix {
    @apply border-0 bg-ui-800 py-1 pl-2 pr-6 text-sm rounded-l-md focus:ring-0;
}

select.prefix {
    background-position: right 0.2rem center;
}
</style>
