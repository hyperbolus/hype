<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import SiteLogo from '@/Components/SiteLogo.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetLabel from '@/Jetstream/Label.vue';
import route from 'ziggy-js'
import Errors from "@/Components/Errors.vue";

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('auth::password.email'));
};
</script>

<template>
    <Head title="Forgot Password" />

    <JetAuthenticationCard>
        <template #logo>
            <SiteLogo />
        </template>

        <div class="mb-4 text-sm text-ui-200">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <JetLabel for="email" value="Email" />
                <JetInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                />
            </div>

            <Errors/>

            <div class="flex items-center justify-end mt-4">
                <JetButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Email Password Reset Link
                </JetButton>
            </div>
        </form>
    </JetAuthenticationCard>
</template>
