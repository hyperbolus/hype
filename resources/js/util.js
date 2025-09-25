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

export const siteName = () => {
    switch (getGame()) {
        case 'geometrydash': return 'Hyperbolus';
        case 'soundodger': return 'Hyperdodger';
    }
}
export const toggleDark = () => {
    useToggle(isDark.value)
}

export const logout = () => {
    router.post(route('auth::logout'));
}

export const isSameDay = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    let today = new Date();
    return today.getMonth() === date.getMonth() && today.getDate() === date.getDate();
}

export const capitalize = (str = '') => str.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');

export const ordinal = (n) => {
    const category = new Intl.PluralRules("en", {type: "ordinal"}).select(n);
    return n + {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th"
    }[category];
}

export const writtenNumber = (n = 0) => ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][n]

export const yearsSince = (date) => Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24 * 365.25));
export const isAdmin = () => {
    return isAuthenticated() && usePage().props.user.roles.includes('admin')
}

export const isModerator = () => {
    return isAuthenticated() && usePage().props.user.roles.includes('moderator')
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

export const displayRating = (rating, digits = 1) => {
    return rating === null ? '-' : rating.toFixed(digits);
}

const hexToRgb = (hex = '#000000') => {
    // Remove the '#' if it exists
    hex = hex.replace("#", "");

    // Handle short form hex (e.g., "abc")
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
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
    if (!level.difficulty) return `https://browser.gdps.io/assets/difficulties/${difficulties[0].toLowerCase()}.png`

    let name = difficulties[level.difficulty].toLowerCase().split(' ').reverse().join('-')

    if (level.epic > 2) {
        name += '-mythic'
    } else if (level.epic > 1) {
        name += '-legendary'
    } else if (level.epic > 0) {
        name += '-epic'
    } else if (level.featured) {
        name += '-featured'
    }

    return `https://browser.gdps.io/assets/difficulties/${name}.png`;
};

export const difficulty = (level) => {
    let difficulty = '';

    if (level.epic > 2) {
        difficulty += 'Mythic ';
    } else if (level.epic > 1) {
        difficulty += 'Legendary ';
    } else if (level.epic > 0) {
        difficulty += 'Epic ';
    } else if (level.featured) {
        difficulty += 'Featured ';
    }

    difficulty += difficulties[level.difficulty];

    difficulty += level.stars > 0 ? ` ${level.stars} ★` : ' (unrated)';

    return difficulty;
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

export const readingTime = (text, wpm = 200) => Math.ceil(text.split(/\s+/).length / wpm);

export const toHHMMSS = (n) => {
    n = n | 0;
    let hours = Math.floor(n / 3600);
    let minutes = Math.floor((n - (hours * 3600)) / 60);
    let seconds = n - (hours * 3600) - (minutes * 60);

    let time = '';
    if (hours > 0) time += `${hours}:`.padStart(3, '0')
    time += `${minutes}:`.padStart(hours > 0 ? 3 : 2, '0')
    time += `${seconds}`.padStart(2, '0')

    return time;
}

export const readonly = (e, reset) => {
    e.currentTarget.value = reset;
    return true;
}
export const invisiblePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
