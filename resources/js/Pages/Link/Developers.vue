<template>
    <document-head title="Linked Apps"/>

    <app-layout>
        <template #breadcrumbs> / <Link href="/settings" class="underline">settings</Link> / <Link href="/connections" class="underline">connections</Link></template>

        <h6 class="mx-32">Linked Apps</h6>
        <span v-if="clients.length === 0" class="font bold">You have no clients connected.</span>
        <div v-else class="flex flex-col space-y-4 text-center m-4">
            <div v-for="token in clients" class="flex flex-row justify-between border-b border-gray-200 bg-gray-50 rounded px-2 py-1" :class="token.revoked ? 'bg-gray-200' : ''">
                <span :class="token.revoked ? 'text-gray-500' : ''">{{ token.name }}</span>
                <span v-if="token.revoked" class="text-red-800">REVOKED</span>
                <span v-else @click="deleteToken(token.id)" class="text-red-500 hover:underline hover:cursor-pointer">Delete</span>
            </div>
        </div>
        <span class="underline text-center"><Link href="/">Go Back</Link></span>
    </app-layout>
</template>
<script>
import {defineComponent} from 'vue'
import {Head as DocumentHead, Link} from '@inertiajs/inertia-vue3';
import AppLayout from "@/Pages/Beta/Layout";
import {Inertia} from "@inertiajs/inertia";

export default defineComponent({
    components: {
        AppLayout,
        DocumentHead,
        Link,
    },
    props: {
        clients: Array
    },
    methods: {
        requestClient(token) {
            axios.delete('/settings/connection/' + token);
            Inertia.reload({ only: ['clients'] });
        }
    }
})
</script>
