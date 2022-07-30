<template>
    <app-layout>
        <template #breadcrumbs> / <Link href="/settings" class="underline">settings</Link> / <Link href="/settings/email" class="underline">email</Link></template>

        <span class="mx-32">Change Email</span>
        <form @submit.prevent="updateProfileInformation">
            <jet-label for="email" value="Email" class="text-left"/>
            <jet-input id="email" type="email" class="mt-1 block w-full" v-model="form.email"/>
            <jet-input-error :message="form.errors.email" class="mt-2"/>
            <span class="text-sm text-gray-300">Note: if you change your email, you must verify it again</span>
            <div class="flex items-center justify-between mt-4 align-middle">
                <span class="underline text-center"><Link href="/settings">Go Back</Link></span>

                <div class="text-right flex flex-row">
                    <jet-action-message :on="form.recentlySuccessful" class="mr-3">
                        Saved.
                    </jet-action-message>

                    <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Save
                    </jet-button>
                </div>
            </div>
        </form>
    </app-layout>
</template>

<script>
import {defineComponent} from 'vue'
import AppLayout from "@/Pages/Link/Layout.vue";
import {Head as DocumentHead, Link} from '@inertiajs/inertia-vue3'
import JetButton from '@/Jetstream/Button.vue'
import JetFormSection from '@/Jetstream/FormSection.vue'
import JetInput from '@/Jetstream/Input.vue'
import JetInputError from '@/Jetstream/InputError.vue'
import JetLabel from '@/Jetstream/Label.vue'
import JetActionMessage from '@/Jetstream/ActionMessage.vue'
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue'

export default defineComponent({
    components: {
        JetActionMessage,
        JetButton,
        JetFormSection,
        JetInput,
        JetInputError,
        JetLabel,
        JetSecondaryButton,
        Link,
        DocumentHead,
        AppLayout
    },

    props: ['user'],

    data() {
        return {
            form: this.$inertia.form({
                _method: 'PUT',
                email: this.user.email,
            }),
        }
    },

    methods: {
        updateProfileInformation() {
            this.form.post(route('auth::user-profile-information.update'), {
                errorBag: 'updateProfileInformation',
                preserveScroll: true,
            });
        },
    },
})
</script>
