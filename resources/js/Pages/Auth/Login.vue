<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import SiteLogo from '@/Components/SiteLogo.vue';
import Button from '@/Jetstream/Button.vue';
import Input from '@/Jetstream/Input.vue';
import Checkbox from '@/Jetstream/Checkbox.vue';
import Label from '@/Jetstream/Label.vue';
import route from 'ziggy-js'
import Errors from "@/Components/Errors.vue";

defineProps({
    status: String,
    errors: Object
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('auth::login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <AuthenticationCard>
        <template #logo>
            <SiteLogo />
        </template>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <Label for="email" value="Email" />
                <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                />
            </div>

            <div class="mt-4">
                <Label for="password" value="Password" />
                <Input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                />
            </div>

            <Errors/>

            <div class="x space-x-2 justify-between mt-4">
                <label class="flex items-center">
                    <Checkbox v-model:checked="form.remember" name="remember" />
                    <span class="ml-2 text-sm text-ui-200">Stay logged in</span>
                </label>
                <Link :href="route('auth::register')" class="text-sm underline hover:text-ui-400">Don't have an account?</Link>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link :href="route('auth::password.request')" class="text-sm underline hover:text-ui-400">Forgot your password?</Link>

                <Button class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">Log in</Button>
            </div>
        </form>
    </AuthenticationCard>
</template>
