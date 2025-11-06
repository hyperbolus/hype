<script setup>
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {useForm, router} from '@inertiajs/vue3';
import route from "ziggy-js";
import Pagination from "@/Components/Pagination.vue";
import Icon from "../../../Components/Icon.vue";
import DashboardLayout from "../../../Layouts/DashboardLayout.vue";

const props = defineProps({
    users: Object
})

const newUser = useForm({
    action: 'create',
    user_id: null,
    username: null,
    email: null,
    password: null,
    confirm_password: null,
    referrer_id: null,
})

const addUser = () => {
    newUser.post(route('system.users'))
}

const impersonate = (id) => {
    router.post(route('system.users'), {
        action: 'impersonate',
        user: id,
    })
}
</script>
<template>
    <dashboard-layout>
        <Pagination :list="users"/>
        <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
            <div v-for="user in users.data" class="x justify-between px-2 py-1">
                <div class="x gap-2">
                    <span class="opacity-50">{{ user.id }}</span>
                    <span>{{ user.name }}</span>
                </div>
                <div class="x items-center gap-2">
                    <div title="Impersonate User" class="cursor-pointer" @click="impersonate(user.id)">
                        <Icon class="w-5" name="user"/>
                    </div>
                    <Icon class="w-5" name="scale"/>
                    <Icon class="w-5" name="pencil-square"/>
                    <Icon class="w-5" name="x-mark"/>
                </div>
            </div>
        </div>
        <h2 class="font-bold text-2xl">Create New User</h2>
        <div class="y pane !py-4">
            <form @submit.prevent="addUser" class="y space-y-2">
                <Input v-model="newUser.username" type="text" placeholder="Username"/>
                <Input v-model="newUser.email" type="text" placeholder="Email"/>
                <Input v-model="newUser.password" type="password" placeholder="Password"/>
                <Input v-model="newUser.confirm_password" type="password" placeholder="Confirm Password"/>
                <Input v-model="newUser.referrer_id" type="number" placeholder="Referrer ID"/>
                <Input v-model="newUser.user_id" type="number" placeholder="User ID"/>
                <Button class="w-fit">Create User</Button>
            </form>
        </div>
    </dashboard-layout>
</template>
