<template>
    <document-head title="Home"/>

    <app-layout>
        <template #build>
            <div style="display: none;">
                <span>build</span>
                <span class="font-mono bg-white rounded-sm text-sm mx-1 px-1">undefined</span>
                <span>on</span>
                <span class="font-mono bg-white rounded-sm text-sm mx-1 px-1">local</span>
            </div>
        </template>

        <h6 class="mx-16 italic">All-in-One Account for Everything GD</h6>
        <div class="flex flex-col space-y-4 text-center m-4">
            <template v-if="!$page.props.app.auth">
                <Link :href="route('auth::login')" class="shadow bg-gray-50 rounded py-1">Login</Link>
                <Link :href="route('auth::register')" class="shadow bg-gray-50 rounded py-1">Register</Link>
            </template>
            <template v-else>
                <template v-if="$page.props.user.linked_accounts.length > 0">
                    <a target="_blank" :href="'http://profile.gd/' + $page.props.user.linked_accounts[0].name" class="underline">Visit Your Profile</a>
                    <Link href="/settings/profile" class="shadow bg-gray-50 rounded py-1">Customize Profile</Link>
                </template>
                <template v-else>
                    <p>Link your GD Account to get a custom profile page!</p>
                    <Link href="/link" class="shadow bg-gray-50 rounded py-1">Link GD Account</Link>
                </template>
                <div class="border-b border-gray-200 m-2"></div>
                <Link href="/settings/connections" class="shadow bg-gray-50 rounded py-1">Connected Apps</Link>
                <Link href="/settings" class="shadow bg-gray-50 rounded py-1">Settings</Link>
            </template>
            <span class="flex flex-row justify-evenly">
                <Link href="/help/faq" class="underline">F.A.Q. / Help</Link> |
                <Link href="/help/terms" class="underline">Terms of Service</Link> |
                <Link href="/help/privacy" class="underline">Privacy Policy</Link>
            </span>
        </div>
    </app-layout>
</template>
<script>
import {defineComponent} from 'vue'
import {Head as DocumentHead, Link} from '@inertiajs/vue3';
import AppLayout from "@/Pages/Link/Layout.vue";

export default defineComponent({
    components: {
        AppLayout,
        DocumentHead,
        Link,
    },
})
</script>
