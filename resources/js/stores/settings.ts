import { defineStore } from 'pinia'
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref(usePage<SettingsProps>().props.app.settings)

    return {settings}
})
