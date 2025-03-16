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

export const isUser = (id) => {
    return isAuthenticated() && getUser().id === id;
}

export const isNotUser = (id) => {
    return isAuthenticated() && getUser().id !== id;
}

export const displayRating = (rating, fixed = true) => {
    return rating === null ? '-' : (fixed ? rating.toFixed(1) : rating);
}

export const xor = (str, key) => {
    return str.split('').map((char, index) => {
        String.fromCharCode(str.charCodeAt(index) ^ key.charCodeAt(index % key.toString().length))
    }).join()
}

export const saveDecrypt = () => {

}

export const saveEncrypt = () => {

}

export const difficulties = [
    "Unrated",
    "Auto",
    "Easy",
    "Normal",
    "Hard",
    "Harder",
    "Insane",
    "Easy Demon",
    "Medium Demon",
    "Hard Demon",
    "Insane Demon",
    "Extreme Demon",
];

export const face = (level) => {
    if (!level.difficulty) {
        return `https://browser.gdps.io/assets/difficulties/${difficulties[0].toLowerCase()}.png`
    }

    let name = difficulties[level.difficulty].toLowerCase().split(' ').reverse().join('-')

    if(level.epic) {
        name += '-epic'
    } else if (level.featured) {
        name += '-featured'
    }

    return `https://browser.gdps.io/assets/difficulties/${name}.png`;
};

export const trimAtWord = (string, max) => {
    // No need to trim
    if (string.length <= max) return string;

    // We hard trim at length, then trim further
    let trimmed = string.substring(0, max);
    // Heuristics are based on position of the last
    // space vs position of last character in string
    let lastSpace = trimmed.lastIndexOf(" ");

    // If the word cut isn't less than 2/3 of the text,
    // then forget about it and just split the word
    if (lastSpace > (trimmed.length / 3) * 2) {
        trimmed = trimmed.substring(0, Math.min(trimmed.length, lastSpace));
    }

    return trimmed + '...';
}

export const readonly = (e, reset) => {
    e.currentTarget.value = reset;
    return true;
}
export const invisiblePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
