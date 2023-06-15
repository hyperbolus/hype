<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {useForm} from '@inertiajs/vue3';
import route from "ziggy-js";
import Pagination from "@/Components/Pagination.vue";
import Textbox from "@/Components/Textbox.vue";

const props = defineProps({
    settings: Object
})

const newSetting = useForm({
    action: 'create',
    site: 0,
    key: null,
    value: '',
    type: 0
})

const addUser = () => {
    newSetting.post(route('system.settings'))
}

const prettify = () => {
    let json;
    try {
        json = JSON.parse(newSetting.value);
        newSetting.value = JSON.stringify(json, null, 2);
    } catch (e) {
        alert(e);
    }
}


</script>
<template>
    <admin-layout title="Users">
        <Pagination :list="settings"/>
        <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
            <div v-for="setting in settings.data" class="x justify-between px-2 py-1">
                <div class="x gap-2">
                    <span class="opacity-50">{{ setting.id }}</span>
                    <span>{{ setting.site }}</span>
                    <span>{{ setting.key }}</span>
                </div>
                <div class="x items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </div>
            </div>
        </div>
        <h2 class="font-bold text-2xl">Create New Setting</h2>
        <div class="y pane !py-4">
            <form @submit.prevent="addUser" class="y space-y-2">
                <div class="x gap-2">
                    <Input class="w-full font-mono" v-model="newSetting.key" type="text" placeholder="Setting Key"/>
                    <select class="pane !py-1 border-0">
                        <option v-for="(site, index) in $page.props.app.sites" :key="index" :value="index" :selected="index === 0">{{ index }}: {{ site }}</option>
                    </select>
                    <select v-model="newSetting.type" class="pane !py-1 border-0">
                        <option :value="0" selected>Text</option>
                        <option :value="1" selected>Integer</option>
                        <option :value="2" selected>Decimal</option>
                        <option :value="3" selected>Boolean</option>
                        <option :value="4" selected>JSON</option>
                    </select>
                </div>
                <Textbox v-model="newSetting.value" spellcheck="false" placeholder="Value"/>
                <span v-if="newSetting.type === 4" class="text-sm text-blue-500 cursor-pointer" @click="prettify">Prettify</span>
                <Button class="w-fit">Create Setting</Button>
            </form>
        </div>
    </admin-layout>
</template>
