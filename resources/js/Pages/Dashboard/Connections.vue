<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {useForm} from "@inertiajs/vue3";
import Lightbox from "@/Components/Lightbox.vue";
import Link from "@/Pages/Link/Link.vue";

const linkGD = useForm({

})

</script>
<template>
    <dashboard-layout title="Connections">
        <form @submit.prevent="void(0)" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Manage Connections</h2>
            <ul v-if="$page.props.errors.linkGD" class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors.linkGD" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Lightbox>
                <Button class="w-fit">Link GD Account</Button>
                <template #content>
                    <Link @click.stop/>
                </template>
            </Lightbox>
        </form>
    </dashboard-layout>
</template>
