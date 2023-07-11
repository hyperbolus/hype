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

export const getUser = () => {
    return usePage().props.user;
}

export const displayRating = (rating) => {
    return rating ? rating.toFixed(1) : '-';
}

export const trimAtWord = (string, max) => {
    if (string.length <= max) return string;

    let trimmed = string.substring(0, max);
    let lastSpace = trimmed.lastIndexOf(" ");

    // If the word cut isn't less than 2/3 of the text,
    // then forget about it and just split the word
    if (lastSpace > (trimmed.length / 3) * 2) {
        trimmed = trimmed.substring(0, Math.min(trimmed.length, lastSpace));
    }

    return trimmed + '...';
}

export const invisiblePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';
