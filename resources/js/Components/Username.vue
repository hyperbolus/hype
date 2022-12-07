<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/inertia-vue3';

const props = defineProps({
    user: Object,
    href: String
})
</script>
<template>
    <Link :href="href ?? route('users.show', user.id)" class="transition-colors text-neutral-900 dark:text-neutral-200 break-all">{{ user.name }}</Link>
</template>
