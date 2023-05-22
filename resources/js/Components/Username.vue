<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    user: Object,
    href: String,
    flag: {
        type: Boolean,
        default: true
    }
})
</script>
<template>
    <Link :href="href ?? route('users.show', user.id)" class="transition-colors text-neutral-900 dark:text-ui-200 break-all">{{ user.name }}</Link>
</template>
