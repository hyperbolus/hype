import {useDark, useToggle} from "@vueuse/core";
import {ref} from "vue";
import {router} from "@inertiajs/vue3";
import route from "ziggy-js";

// export const isDark = ref(useDark({
//     selector: '#body'
// }));
export const isDark = ref(true);

export const toggleDark = () => {
    useToggle(isDark.value)
}

export const logout = () => {
    router.post(route('auth::logout'));
}

export const invisiblePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';
