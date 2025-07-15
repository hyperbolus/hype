<script setup>
import { Head, Link } from '@inertiajs/vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import SiteLogo from '@/Components/SiteLogo.vue';
import route from 'ziggy-js'

const props = defineProps({
    ban: Object
})
</script>
<template>
    <Head title="Email Verification" />

    <JetAuthenticationCard>
        <template #logo>
            <SiteLogo />
        </template>

        <p>Your access to Hyperbolus services has been restricted.</p>

        <div class="y text-sm text-ui-200 py-2">
            <p>Ban reason</p>
            <p class="mb-2 bg-ui-900 px-2 py-1 rounded-md">{{ ban?.comment ?? 'No comment provided' }}</p>
            <p>This ban expires</p>
            <p class="bg-ui-900 px-2 py-1 rounded-md">{{ ban?.expired_at ? new Date(ban?.expired_at).toLocaleDateString() : 'Never' }}</p>
        </div>

        <Link :href="route('auth::logout')" method="post" as="button" class="underline text-sm text-ui-200 hover:text-ui-400 ml-2">Log Out</Link>
    </JetAuthenticationCard>
</template>
