<script setup>
import {Link, useForm} from '@inertiajs/inertia-vue3';
import CommonLayout from "@/Layouts/CommonLayout.vue";
import route from 'ziggy-js'
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";

const props = defineProps({
    tags: Array,
})

const form = useForm({
    tag: ''
})

const submit = () => {
    form.post(route('tags.store'), {
        onFinish: () => form.reset(),
    });
}

</script>
<template>
    <common-layout title="Tags">
        <template #breadcrumbs>
            <Link :href="$page.props.url">Tags</Link>
        </template>
        <div class="y space-y-4 w-3/4">
            <h2 class="font-bold text-2xl capitalize">Levels Tags</h2>
            <div class="y space-y-2">
                <span class="pane" v-if="tags.length === 0">There are no tags</span>
                <Link v-else class="pane text-xl" v-for="tag in tags" :href="route('tags.show', tag.id)">{{ tag.name }}</Link>
            </div>
        </div>
        <div v-if="$page.props.auth && $page.props.user.roles.includes('admin')" class="y space-y-4 w-1/4">
            <h2 class="font-bold text-2xl capitalize">Add Tag</h2>
            <form @submit.prevent="submit" class="pane space-y-2">
                <label>
                    Tag Name:
                    <Input type="text" placeholder="..." v-model="form.tag"/>
                </label>
                <Button>Add</Button>
            </form>
        </div>
    </common-layout>
</template>
