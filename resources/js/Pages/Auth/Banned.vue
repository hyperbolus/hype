<script setup>
import { Head, Link } from '@inertiajs/vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import SiteLogo from '@/Components/SiteLogo.vue';
import route from 'ziggy-js'
</script>

<template>
    <Head title="Email Verification" />

    <JetAuthenticationCard>
        <template #logo>
            <SiteLogo />
        </template>

        <div class="mb-4 text-sm text-ui-200">Your account had been banned and your access to Hyperbolus services has been restricted</div>

        <Link :href="route('auth::logout')" method="post" as="button" class="underline text-sm text-ui-200 hover:text-ui-400 ml-2">Log Out</Link>
    </JetAuthenticationCard>
</template>
