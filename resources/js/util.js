import {useDark, useToggle} from "@vueuse/core";
import {ref} from "vue";
import {router, usePage} from "@inertiajs/vue3";
import route from "ziggy-js";
import {useSettingsStore} from "@/stores/settings.ts";

// export const isDark = ref(useDark({
//     selector: '#body'
// }));
export const isDark = ref(true);

export const getGame = () => {
    return useSettingsStore().settings['game'] ? useSettingsStore().settings['game']['value'] : '';
}

export const toggleDark = () => {
    useToggle(isDark.value)
}

export const logout = () => {
    router.post(route('auth::logout'));
}

export const isAdmin = () => {
    return isAuthenticated() && usePage().props.user.roles.includes('admin')
}

export const isAuthenticated = () => {
    return usePage().props.auth;
}

export const invisiblePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';
