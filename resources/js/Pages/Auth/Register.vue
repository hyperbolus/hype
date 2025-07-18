<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.vue';
import SiteLogo from '@/Components/SiteLogo.vue';
import JetButton from '@/Jetstream/Button.vue';
import JetInput from '@/Jetstream/Input.vue';
import JetCheckbox from '@/Jetstream/Checkbox.vue';
import JetLabel from '@/Jetstream/Label.vue';
import route from 'ziggy-js'
import Username from "@/Components/Username.vue";
import Avatar from "@/Components/Avatar.vue";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    invite: String,
    referrer: Object
})

// TODO: change keyname to username
const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    invite: props.invite ?? null,
    terms: false,
    agecheck: false,
});

const submit = () => {
    if (navigator.webdriver || document.hasOwnProperty('$cdc_asdjflasutopfhvcZLmcfl_')) return;

    form.post(route('auth::register'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation')
        },
    });
};

// TODO: live validate username
</script>

<template>
    <Head title="Register" />

    <JetAuthenticationCard>
        <template #logo>
            <SiteLogo />
        </template>

        <div class="y space-y-2 pane mb-2" v-if="referrer">
            <span class="font-bold text-xs">You've been invited by:</span>
            <div class="x space-x-2 items-center">
                <Avatar :user="referrer"/>
                <Username :user="referrer"/>
            </div>
        </div>

        <form @submit.prevent="submit">
            <div>
                <JetLabel for="name" value="Username" />
                <JetInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="name"
                />
                <div class="x mt-1 items-center text-xs text-ui-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                        <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                    <span>Choose carefully, you will not be able to change your username later!</span>
                </div>
            </div>

            <div class="mt-1">
                <JetLabel for="email" value="Email" />
                <JetInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                />
            </div>

            <div class="mt-4">
                <JetLabel for="password" value="Password" />
                <JetInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />
            </div>

            <div class="mt-4">
                <JetLabel for="password_confirmation" value="Confirm Password" />
                <JetInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />
            </div>

            <Errors/>

            <div class="mt-4">
                <JetLabel for="terms">
                    <div class="flex items-center">
                        <JetCheckbox id="terms" v-model:checked="form.terms" name="terms" />

                        <div class="ml-2">
                            I agree to the <Link target="_blank" :href="route('legal.terms')" class="underline text-white hover:text-ui-300 text-sm">Terms of Service</Link> and <Link target="_blank" :href="route('legal.privacy')" class="underline text-sm text-white hover:text-ui-300">Privacy Policy</Link>
                        </div>
                    </div>
                </JetLabel>
            </div>

            <div class="mt-2">
                <JetLabel for="terms">
                    <div class="flex items-center">
                        <JetCheckbox id="agecheck" v-model:checked="form.agecheck" name="agecheck" />

                        <div class="ml-2">
                            I agree that I am 13 years or older
                        </div>
                    </div>
                </JetLabel>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link :href="route('auth::login')" class="underline text-sm text-ui-400 hover:text-ui-500">
                    Already registered?
                </Link>

                <JetButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Register
                </JetButton>
            </div>
        </form>
    </JetAuthenticationCard>
</template>
