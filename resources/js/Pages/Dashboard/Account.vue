<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useForm} from "@inertiajs/inertia-vue3";
import route from "ziggy-js";

const props = defineProps({
    profile: Object
})

const email = useForm({
    action: 'update email',
    email: props.profile.email,
    password: null
})

const password = useForm({
    action: 'update password',
    current_password: null,
    new_password: null,
    new_password_confirmation: null,
})

const changeEmail = () => {
    email.post(route('settings.home'), {
        errorBag: 'changeEmail',
        onSuccess: () => {
            email.password = ''
        }
    })
}

const changePassword = () => {
    password.post(route('settings.home'), {
        errorBag: 'changePassword',
        onSuccess: () => {
            password.current_password = ''
            password.new_password = ''
            password. new_password_confirmation = ''
        }
    })
}

</script>
<template>
    <dashboard-layout title="Home">
        <form @submit.prevent="changeEmail" class="y box space-y-2">
            <h2 class="font-bold text-xl">Change Email</h2>
            <div>
                <span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300">Email</span>
                <Input v-model="email.email" class="mt-1" type="email" placeholder="Email"/>
            </div>
            <div>
                <span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300">Confirm Password</span>
                <Input v-model="email.password" class="mt-1" type="password" placeholder="Confirm Password"/>
            </div>
            <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors.changeEmail" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Button class="w-fit">Change Email</Button>
        </form>
        <form @submit.prevent="changePassword" class="y box space-y-2">
            <h2 class="font-bold text-xl">Change Password</h2>
            <div>
                <span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300">Current Password</span>
                <Input v-model="password.current_password" class="mt-1" type="password" placeholder="Current Password"/>
            </div>
            <div>
                <span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300">New Password</span>
                <Input v-model="password.new_password" class="mt-1" type="password" placeholder="New Password"/>
            </div>
            <div>
                <span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300">Confirm New Password</span>
                <Input v-model="password.new_password_confirmation" class="mt-1" type="password" placeholder="Confirm New Password"/>
            </div>
            <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors.changePassword" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Button class="w-fit">Change Password</Button>
        </form>
    </dashboard-layout>
</template>
