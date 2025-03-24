<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import SiteLogo from '@/Components/SiteLogo.vue';
import JetButton from '@/Jetstream/Button.vue';
import route from 'ziggy-js'

const props = defineProps({
    status: String,
});

const form = useForm({});

const submit = () => {
    form.post(route('auth::verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <Head title="Email Verification" />

    <JetAuthenticationCard>
        <template #logo>
            <SiteLogo />
        </template>

        <div class="mb-4 text-sm text-ui-200">Before continuing, we need you to verify your email. If you haven't received an email, you can request another one using the button below. Just be sure to check your spam folder first!</div>

        <div v-if="verificationLinkSent" class="mb-4 font-medium text-sm text-green-600">A new verification link has been sent to the email address you provided in your profile settings.</div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Resend Verification Email
                </JetButton>

                <div>
                    <Link :href="route('settings.account')" class="underline text-sm text-ui-200 hover:text-ui-400">Edit Email</Link>
                    <Link :href="route('auth::logout')" method="post" as="button" class="underline text-sm text-ui-200 hover:text-ui-400 ml-2">Log Out</Link>
                </div>
            </div>
        </form>
    </JetAuthenticationCard>
</template>
