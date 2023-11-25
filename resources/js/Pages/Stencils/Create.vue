<script setup>
import {useForm} from "@inertiajs/vue3";
import AppLayout from "@/Layouts/Dash.vue";
import Label from "@/Jetstream/Label.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import route from "ziggy-js";
import Errors from "@/Components/Errors.vue";

const data = window.location.hash.substring(1, window.location.hash.length);

const form = useForm({
    name: '',
    description: '',
    object_string: data ?? '',
})

const submit = () => {
    form.post(route('stencils.store'))
}
</script>
<template>
    <app-layout title="New Stencil">
        <form @submit.prevent="submit" class="y space-y-2">
            <h1 class="font-bold text-3xl">New Stencil</h1>
            <div class="y space-y-2 pane">
                <Label>
                    Name
                    <Input v-model="form.name" placeholder="Hyper's Core Blocks v1" type="text"/>
                </Label>

                <Label>
                    Description
                    <textarea v-model="form.description" placeholder="Some core block design" class="block placeholder-ui-500 rounded border-none w-full bg-ui-950"></textarea>
                </Label>

                <Label>
                    Object String
                    <textarea :readonly="!!data" v-model="form.object_string" class="block read-only:text-ui-500 text-sm rounded border-none w-full font-mono bg-ui-950"></textarea>
                </Label>

                <Errors/>

                <Button class="w-fit">Submit Stencil</Button>
            </div>
        </form>
    </app-layout>
</template>
