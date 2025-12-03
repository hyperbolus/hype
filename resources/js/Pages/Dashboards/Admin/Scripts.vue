<script setup>
import Icon from "../../../Components/Icon.vue";
import Input from "../../../Jetstream/Input.vue";
import DashboardLayout from "../../../Layouts/DashboardLayout.vue";
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    scripts: Object
});
</script>
<template>
    <dashboard-layout>
        <textarea v-if="0" class="textbox font-mono text-sm">{{ scripts }}</textarea>
        <div v-for="(script, classname) in scripts" class="y space-y-2">
            <div class="x items-center space-x-1.5 font-bold text-2xl">
                <span>{{ classname }}</span>
                <span class="font-mono font-normal text-base text-ui-500 bg-ui-900 px-1.5 py-0.5 rounded">::class</span>
            </div>
            <div v-for="method in script" class="y space-y-1 rounded-md bg-ui-900 border border-ui-700">
                <div class="font-bold text-lg border-b border-ui-700 px-2.5 py-1.5">{{ method.attributes.title ?? (method.name + '()') }}</div>
                <div class="y space-y-1 px-2 py-1">
                    <div v-if="method.attributes.description" class="x space-x-1.5 items-center rounded pr-2 bg-ui-800 p-1">
                        <span class="font-mono px-1.5 font-bold tracking-tighter py-0.5 text-sm text-ui-500 bg-ui-900 rounded">//</span>
                        <p>{{ method.attributes.description }}</p>
                    </div>
                    <p v-if="Object.keys(method.parameters).length === 0" class="italic text-ui-500">This script takes no arguments</p>
                    <label v-for="parameter in method.parameters">
                        <span class="text-sm">{{ parameter.attributes.title ?? parameter.name }}</span>
                        <Input type="text"/>
                        <span v-if="parameter.attributes.description" class="text-sm text-ui-500">{{ parameter.attributes.description }}</span>
                    </label>
                </div>
                <div class="x space-x-2 items-center bg-ui-950 p-1.5 border-t border-ui-700 rounded-b-md">
                    <Link :href="route('system.scripts.run', classname + '::' + method.name)" class="x items-center divide-x divide-ui-700 bg-ui-800 rounded">
                        <div class="px-2 py-1">
                            <Icon class="text-green-500" name="play"/>
                        </div>
                        <span class="font-mono text-sm px-2 text-ui-500">{{ method.name }}()</span>
                    </Link>
                </div>
            </div>
        </div>
    </dashboard-layout>
</template>
