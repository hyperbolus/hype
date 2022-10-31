<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import Input from "@/Jetstream/Input.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import Button from "@/Jetstream/Button.vue";
import Pagination from "@/Components/Pagination.vue";
import {useForm} from "@inertiajs/inertia-vue3";
import route from 'ziggy-js'

const props = defineProps({
    forums: Object
})

const newForum = useForm({
    action: 'create',
    name: null,
    description: null,
    slug: null,
    use_slug: true,
    parent_id: null,
    category: false,
    visible: true,
    priority: null,
    password: null,
})

const addForum = () => {
    newForum.post(route('system.forums'))
}
</script>
<template>
    <admin-layout title="Forums">
        <Pagination :list="forums"/>
        <div class="y box !px-0 !py-0 divide-y dark:divide-neutral-700">
            <div v-for="forum in forums.data" class="x justify-between px-2 py-1">
                <div class="x gap-2">
                    <span class="opacity-50">{{ forum.id }}</span>
                    <span>{{ forum.name }}</span>
                </div>
                <div class="x items-center gap-2">
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
        <h2 class="font-bold text-2xl">Create New Forum</h2>
        <div class="y box !py-4">
            <form @submit.prevent="addForum" class="y space-y-2">
                <Input v-model="newForum.name" type="text" placeholder="Forum Name"/>
                <Input v-model="newForum.description" type="text" placeholder="Forum Description"/>
                <Input v-model="newForum.slug" type="text" placeholder="Custom Slug (optional)"/>
                <label class="x items-center gap-1">
                    <Checkbox v-model:checked="newForum.use_slug"/>
                    Use Slug
                </label>
                <Input type="text" placeholder="Password (optional)"/>
                <label class="x items-center gap-1">
                    <Checkbox v-model:checked="newForum.category"/>
                    Category
                </label>
                <label class="x items-center gap-1">
                    <Checkbox v-model:checked="newForum.visible"/>
                    Visible
                </label>
                <Input v-model="newForum.priority" type="number" placeholder="Priority"/>
                <Input v-model="newForum.parent_id" type="number" placeholder="Parent ID"/>
                <Button class="w-fit">Create Forum</Button>
            </form>
        </div>
    </admin-layout>
</template>
