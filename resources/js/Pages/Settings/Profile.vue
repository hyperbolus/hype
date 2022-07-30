<template>
    <app-layout>
        <template #breadcrumbs> / <Link href="/settings" class="underline">settings</Link> / <Link href="/settings/profile" class="underline">profile</Link></template>

        <span class="mx-32">Custom Profile</span>
        <form @submit.prevent="updateProfile">
            <input type="file" @input="form.plus_avatar = $event.target.files[0]" />
            <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                {{ form.progress.percentage }}%
            </progress>

            <input type="file" @input="form.plus_background = $event.target.files[0]" />
            <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                {{ form.progress.percentage }}%
            </progress>

            <jet-label for="plus_bio" value="Bio" class="text-left mt-2"/>
            <jet-input id="plus_bio" type="text" class="mt-1 block w-full" v-model="form.plus_bio" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_bio" class="mt-2"/>

            <jet-label for="" value="Discord" class="text-left mt-2"/>
            <jet-input id="plus_discord" type="text" class="mt-1 block w-full" v-model="form.plus_discord" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_discord" class="mt-2"/>

            <jet-label for="" value="Website" class="text-left mt-2"/>
            <jet-input id="plus_website" type="text" class="mt-1 block w-full" v-model="form.plus_website" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_website" class="mt-2"/>

            <jet-label for="" value="Video" class="text-left mt-2"/>
            <jet-input id="plus_video" type="text" class="mt-1 block w-full" v-model="form.plus_video" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_video" class="mt-2"/>

            <jet-label for="" value="Email" class="text-left mt-2"/>
            <jet-input id="plus_email" type="text" class="mt-1 block w-full" v-model="form.plus_email" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_email" class="mt-2"/>

            <jet-label for="" value="Pronouns" class="text-left mt-2"/>
            <jet-input id="plus_pronouns" type="text" class="mt-1 block w-full" v-model="form.plus_pronouns" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_pronouns" class="mt-2"/>

            <jet-label for="" value="Location" class="text-left mt-2"/>
            <jet-input id="plus_location" type="text" class="mt-1 block w-full" v-model="form.location" ref="current_password" autocomplete="current-password"/>
            <jet-input-error :message="form.errors.plus_location" class="mt-2"/>

            <div class="flex items-center justify-between pt-4">
                <span class="underline mt-2 text-center"><Link href="/">Go Back</Link></span>

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

    props: {

    },

    data() {
        return {
            form: this.$inertia.form({
                profile_name: this.$page.props.user.linked_accounts[0].name,
                plus_bio: this.$page.props.user.linked_accounts[0].plus_bio,
                plus_discord: this.$page.props.user.linked_accounts[0].plus_discord,
                plus_website: this.$page.props.user.linked_accounts[0].plus_website,
                plus_video: this.$page.props.user.linked_accounts[0].plus_video,
                plus_email: this.$page.props.user.linked_accounts[0].plus_email,
                plus_pronouns: this.$page.props.user.linked_accounts[0].plus_pronouns,
                plus_location: this.$page.props.user.linked_accounts[0].plus_location,
                plus_avatar: null,
                plus_background: null
            }),
        }
    },

    methods: {
        updateProfile() {
            this.form.post('/settings/profile', {
                errorBag: 'updateProfile',
                preserveScroll: true,
                onSuccess: () => {

                },
                onError: () => {

                }
            })
        },
    },
})
</script>
