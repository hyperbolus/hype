<script setup>
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {useForm} from '@inertiajs/vue3';
import route from "ziggy-js";
import Pagination from "@/Components/Pagination.vue";
import Icon from "../../../Components/Icon.vue";
import DashboardLayout from "../../../Layouts/DashboardLayout.vue";

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
    <dashboard-layout>
        <Pagination :list="settings"/>
        <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
            <div v-for="setting in settings.data" class="x justify-between px-2 py-1">
                <div class="x items-center gap-2">
                    <span class="text-ui-500 text-sm">{{ setting.id }}</span>
                    <span>{{ setting.name ?? setting.key }}</span>
                </div>
                <div class="x items-center gap-2">
                    <Icon class="w-5" name="pencil-square"/>
                    <Icon class="w-5" name="x-mark"/>
                    <Icon v-if="setting.public" class="w-5" name="eye"/>
                    <Icon v-else class="w-5 text-red-500" name="eye-slash"/>
                </div>
            </div>
        </div>
        <h2 class="font-bold text-2xl">Create New Setting</h2>
        <div class="y pane !py-4">
            <form @submit.prevent="addUser" class="y space-y-2">
                <div class="x gap-2">
                    <Input class="w-full font-mono" v-model="newSetting.key" type="text" placeholder="Setting Key"/>
                    <select v-model="newSetting.type" class="pane !py-1 border-0">
                        <option :value="0" selected>Text</option>
                        <option :value="1" selected>Integer</option>
                        <option :value="2" selected>Decimal</option>
                        <option :value="3" selected>Boolean</option>
                        <option :value="4" selected>JSON</option>
                    </select>
                </div>
                <textarea class="textbox" v-model="newSetting.value" spellcheck="false" placeholder="Value"/>
                <span v-if="newSetting.type === 4" class="text-sm text-blue-500 cursor-pointer" @click="prettify">Prettify</span>
                <Button class="w-fit">Create Setting</Button>
            </form>
        </div>
    </dashboard-layout>
</template>
