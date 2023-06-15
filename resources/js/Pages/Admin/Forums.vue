<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import Input from "@/Jetstream/Input.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import Button from "@/Jetstream/Button.vue";
import Pagination from "@/Components/Pagination.vue";
import {useForm} from "@inertiajs/vue3";
import route from 'ziggy-js'
import InlineForumEditor from "@/Components/InlineForumEditor.vue";

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
        <div class="y pane !px-0 !py-0 divide-y divide-ui-700/50 overflow-clip">
            <div v-for="forum in forums.data" class="y">
                <InlineForumEditor :forum="forum"/>
            </div>
        </div>
        <h2 class="font-bold text-2xl">Create New Forum</h2>
        <div class="y pane !py-4">
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
