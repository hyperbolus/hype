<script setup>
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager.vue'
import CommonLayout from '@/Layouts/CommonLayout.vue'

defineProps([
    'tokens',
    'availablePermissions',
    'defaultPermissions',
])
</script>
<template>
    <common-layout title="API Tokens">
        <div>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                API Tokens
            </h2>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <api-token-manager :tokens="tokens"
                                   :available-permissions="availablePermissions"
                                   :default-permissions="defaultPermissions" />
            </div>
        </div>
    </common-layout>
</template>
