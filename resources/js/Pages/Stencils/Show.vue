<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {useClipboard} from "@vueuse/core";
import Button from "@/Jetstream/Button.vue";
import Label from "@/Jetstream/Label.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    stencil: Object
})

const { copy, copied, isSupported } = useClipboard({legacy: true})
</script>
<template>
    <app-layout :title="stencil.name">
        <div class="y space-y-2 w-full">
            <div>
                <h2 class="font-bold text-3xl">{{ stencil.name }}</h2>
                <div class="x items-center space-x-1 text-sm">
                    <span>Posted by</span>
                    <Username :user="stencil.author"/>
                    <span>, {{ new Date(stencil.created_at).toISOString().replace('T', ', ').replace('.000Z', '') }}, ID: {{ stencil.id }}</span></div>
            </div>
            <Label>
                About This Stencil
                <p class="pane">{{ stencil.description }}</p>
            </Label>
            <div v-if="isSupported">
                <Button @click='copy(stencil.object_string)'>{{ copied ? 'Copied!' : 'Copy Object String' }}</Button>
            </div>
            <textarea v-else class="rounded border-none bg-ui-900">{{ stencil.object_string }}</textarea>
        </div>
    </app-layout>
</template>
