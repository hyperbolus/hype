<script setup>
import JetActionMessage from '@/Jetstream/ActionMessage.vue'
import JetButton from '@/Jetstream/Button.vue'
import JetConfirmationModal from '@/Jetstream/ConfirmationModal.vue'
import JetDangerButton from '@/Jetstream/DangerButton.vue'
import JetDialogModal from '@/Jetstream/DialogModal.vue'
import JetInput from '@/Jetstream/Input.vue'
import JetCheckbox from '@/Jetstream/Checkbox.vue'
import JetInputError from '@/Jetstream/InputError.vue'
import JetLabel from '@/Jetstream/Label.vue'
import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue'
import {ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";

const props = defineProps({
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
});

const createApiTokenForm = useForm({
    name: '',
    permissions: props.defaultPermissions,
});

const updateApiTokenForm = useForm({
    permissions: []
});

const deleteApiTokenForm = useForm({});

const displayingToken = ref(false);
const managingPermissionsFor = ref(null);
const apiTokenBeingDeleted = ref(null);

const createApiToken = () => {
    createApiTokenForm.post(route('settings::tokens.store'), {
        preserveScroll: true,
        onSuccess: () => {
            displayingToken.value = true
            createApiTokenForm.reset()
        }
    })
}

const manageApiTokenPermissions = (token) => {
    updateApiTokenForm.permissions = token.abilities

    managingPermissionsFor.value = token
}

const updateApiToken = () => {
    updateApiTokenForm.put(route('settings::tokens.update', managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (managingPermissionsFor.value = null),
    })
}

const confirmApiTokenDeletion = (token) => {
    apiTokenBeingDeleted.value = token
}

const deleteApiToken = () => {
    deleteApiTokenForm.delete(route('settings::tokens.destroy', apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => (apiTokenBeingDeleted.value = null),
    })
}
</script>
<template>
    <div>
        <!-- Generate API Token -->
        <div class="mt-5 md:mt-0">
            <form @submit.prevent="createApiToken">
                <div class="px-4 py-5 sm:p-6 shadow glass sm:rounded-tl-md sm:rounded-tr-md">
                    <div class="grid grid-cols-6 gap-6">
                        <!-- Token Name -->
                        <div class="col-span-6 sm:col-span-4">
                            <jet-label for="name" value="Name" />
                            <jet-input id="name" type="text" class="mt-1 block w-full" v-model="createApiTokenForm.name" autofocus />
                            <jet-input-error :message="createApiTokenForm.errors.name" class="mt-2" />
                        </div>

                        <!-- Token Permissions -->
                        <div class="col-span-6" v-if="availablePermissions.length > 0">
                            <jet-label for="permissions" value="Permissions" />

                            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div v-for="permission in availablePermissions" :key="permission">
                                    <label class="flex items-center">
                                        <jet-checkbox :value="permission" v-model:checked="createApiTokenForm.permissions"/>
                                        <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center glass justify-end px-4 py-3 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                    <jet-action-message :on="createApiTokenForm.recentlySuccessful" class="mr-3">
                        Created.
                    </jet-action-message>

                    <jet-button :class="{ 'opacity-25': createApiTokenForm.processing }" :disabled="createApiTokenForm.processing">
                        Create
                    </jet-button>
                </div>
            </form>
        </div>

        <div v-if="tokens.length > 0">

            <!-- Manage API Tokens -->
            <div class="mt-10 sm:mt-0">
                <div class="space-y-6">
                    <div class="flex items-center justify-between pane" v-for="token in tokens" :key="token.id">
                        <div>
                            {{ token.name }}
                        </div>

                        <div class="flex items-center">
                            <div class="text-sm text-gray-400" v-if="token.last_used_ago">
                                Last used {{ token.last_used_ago }}
                            </div>

                            <button class="cursor-pointer ml-6 text-sm text-gray-400 underline"
                                    @click="manageApiTokenPermissions(token)"
                                    v-if="availablePermissions.length > 0"
                            >
                                Permissions
                            </button>

                            <button class="cursor-pointer ml-6 text-sm text-red-500" @click="confirmApiTokenDeletion(token)">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Token Value Modal -->
        <jet-dialog-modal :show="displayingToken" @close="displayingToken = false">
            <template #title>
                API Token
            </template>

            <template #content>
                <div>
                    Please copy your new API token. For your security, it won't be shown again.
                </div>

                <div class="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500" v-if="$page.props.app.flash.token">
                    {{ $page.props.app.flash.token }}
                </div>
            </template>

            <template #footer>
                <jet-secondary-button @click="displayingToken = false">
                    Close
                </jet-secondary-button>
            </template>
        </jet-dialog-modal>

        <!-- API Token Permissions Modal -->
        <jet-dialog-modal :show="managingPermissionsFor" @close="managingPermissionsFor = null">
            <template #title>
                API Token Permissions
            </template>

            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="permission in availablePermissions" :key="permission">
                        <label class="flex items-center">
                            <jet-checkbox :value="permission" v-model:checked="updateApiTokenForm.permissions"/>
                            <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
                        </label>
                    </div>
                </div>
            </template>

            <template #footer>
                <jet-secondary-button @click="managingPermissionsFor = null">
                    Cancel
                </jet-secondary-button>

                <jet-button class="ml-3" @click="updateApiToken" :class="{ 'opacity-25': updateApiTokenForm.processing }" :disabled="updateApiTokenForm.processing">
                    Save
                </jet-button>
            </template>
        </jet-dialog-modal>

        <!-- Delete Token Confirmation Modal -->
        <jet-confirmation-modal :show="apiTokenBeingDeleted" @close="apiTokenBeingDeleted = null">
            <template #title>
                Delete API Token
            </template>

            <template #content>
                Are you sure you would like to delete this API token?
            </template>

            <template #footer>
                <jet-secondary-button @click="apiTokenBeingDeleted = null">
                    Cancel
                </jet-secondary-button>

                <jet-danger-button class="ml-3" @click="deleteApiToken" :class="{ 'opacity-25': deleteApiTokenForm.processing }" :disabled="deleteApiTokenForm.processing">
                    Delete
                </jet-danger-button>
            </template>
        </jet-confirmation-modal>
    </div>
</template>
