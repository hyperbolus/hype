<script setup>
import {ref} from 'vue';
import {Link} from '@inertiajs/vue3'

const props = defineProps({
    to: String,
});

const getHost = url => new URL(url).host;
const isExternal = ref((() => {
    let result;

    try {
        result = getHost(window.location) !== getHost(props.to);
    } catch (e) {
        result = true;
    }

    return result;
})());
</script>
<template>
    <a v-if="isExternal" :href="to"><slot/></a>
    <Link v-else :href="to"><slot/></Link>
</template>
