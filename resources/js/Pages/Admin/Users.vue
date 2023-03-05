<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {useForm, router} from '@inertiajs/vue3';
import route from "ziggy-js";
import Pagination from "@/Components/Pagination.vue";

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
    <admin-layout title="Users">
        <Pagination :list="users"/>
        <div class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700">
            <div v-for="user in users.data" class="x justify-between px-2 py-1">
                <div class="x gap-2">
                    <span class="opacity-50">{{ user.id }}</span>
                    <span>{{ user.name }}</span>
                </div>
                <div class="x items-center gap-2">
                    <div title="Impersonate User" class="cursor-pointer" @click="impersonate(user.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
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
    </admin-layout>
</template>
