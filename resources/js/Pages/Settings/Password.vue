<template>
    <app-layout>
        <template #breadcrumbs> / <Link href="/settings" class="underline">settings</Link> / <Link href="/settings/password" class="underline">password</Link></template>

        <span class="mx-32">Change Password</span>
        <form @submit.prevent="updatePassword">
            <jet-label for="current_password" value="Current Password" class="text-left mt-2"/>
            <jet-input id="current_password" type="password" class="mt-1 block w-full"
                       v-model="form.current_password" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.current_password" class="mt-2"/>

            <jet-label for="password" value="New Password" class="text-left mt-2"/>
            <jet-input id="password" type="password" class="mt-1 block w-full" v-model="form.password"
                       ref="password" autocomplete="new-password"/>
            <jet-input-error :message="form.errors.password" class="mt-2"/>

            <jet-label for="password_confirmation" value="Confirm Password" class="text-left mt-2"/>
            <jet-input id="password_confirmation" type="password" class="mt-1 block w-full"
                       v-model="form.password_confirmation" autocomplete="new-password"/>
            <jet-input-error :message="form.errors.password_confirmation" class="mt-2"/>


            <div class="flex items-center justify-between pt-4">
                <span class="underline mt-2 text-center"><Link href="/settings">Go Back</Link></span>

                <div class="flex flex-row align-middle text-right">
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
import JetActionMessage from '@/Jetstream/ActionMessage.vue'
import JetButton from '@/Jetstream/Button.vue'
import JetFormSection from '@/Jetstream/FormSection.vue'
import JetInput from '@/Jetstream/Input.vue'
import JetInputError from '@/Jetstream/InputError.vue'
import JetLabel from '@/Jetstream/Label.vue'
import AppLayout from '@/Pages/Beta/Layout'
import {Head as DocumentHead, Link} from '@inertiajs/inertia-vue3'

export default defineComponent({
    components: {
        AppLayout,
        JetActionMessage,
        JetButton,
        JetFormSection,
        JetInput,
        JetInputError,
        JetLabel,
        DocumentHead,
        Link
    },

    data() {
        return {
            form: this.$inertia.form({
                current_password: '',
                password: '',
                password_confirmation: '',
            }),
        }
    },

    methods: {
        updatePassword() {
            this.form.put(route('auth::user-password.update'), {
                errorBag: 'updatePassword',
                preserveScroll: true,
                onSuccess: () => this.form.reset(),
                onError: () => {
                    if (this.form.errors.password) {
                        this.form.reset('password', 'password_confirmation')
                        this.$refs.password.focus()
                    }

                    if (this.form.errors.current_password) {
                        this.form.reset('current_password')
                        this.$refs.current_password.focus()
                    }
                }
            })
        },
    },
})
</script>
