<template>
    <document-head title="Home"/>

    <app-layout>
        <template #breadcrumbs> / <Link href="/settings" class="underline">settings</Link></template>

        <div class="mx-32">User Settings</div>
        <div class="flex flex-col space-y-4 text-center m-4">
            <Link href="/settings/email" class="shadow bg-gray-50 rounded py-1">Change Email</Link>
            <Link href="/settings/password" class="shadow bg-gray-50 rounded py-1">Change Password</Link>
            <Link href="/settings/2fa" class="shadow bg-gray-50 rounded py-1">Two-Factor Authentication</Link>
            <Link href="/settings/sessions" class="shadow bg-gray-50 rounded py-1">Browser Sessions</Link>
            <a href="#" @click="logout" class="shadow bg-gray-50 rounded py-1 text-red-500">Log Out</a>
            <span class="underline text-center"><Link href="/">Go Back</Link></span>
        </div>
    </app-layout>
</template>
<script>
import {defineComponent} from 'vue'
import {Head as DocumentHead, Link} from '@inertiajs/inertia-vue3';
import AppLayout from "@/Pages/Link/Layout.vue";

export default defineComponent({
    components: {
        AppLayout,
        DocumentHead,
        Link,
    },
    methods: {
        logout() {
            this.$inertia.post(route('auth::logout'));
        },
    }
})
</script>
