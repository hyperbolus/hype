<script setup>
import {Link, useForm} from '@inertiajs/vue3';
import AppLayout from "@/Layouts/Dash.vue";
import route from 'ziggy-js'
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {computed, onBeforeMount, ref} from "vue";

const props = defineProps({
    tags: Array,
});

const form = useForm({
    tag: ''
});

const submit = () => {
    form.post(route('tags.store'), {
        onSuccess: () => form.reset(),
    });
};

const buckets = ref({});
const directory = ref([]);

onBeforeMount(() => {
    const sorted = Object.keys(props.tags).sort((a, b) => {
        return props.tags[a].name.localeCompare(props.tags[b].name);
    });

    let _buckets = {};

    for (let tag in sorted) {
        let key = props.tags[tag].name.substring(0, 1).toUpperCase();

        if (!/[a-zA-Z]/g.test(key)) key = '#';

        if (!_buckets.hasOwnProperty(key)) {
            _buckets[key] = [];
        }

        _buckets[key].push(tag);
    }

    buckets.value = _buckets;
    directory.value = Object.keys(buckets.value).sort();
});

const format = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
});

const tiny = n => format.format(n);
</script>
<template>
    <app-layout>
        <div class="flex flex-col space-y-2 md:w-3/4">
            <h1 class="font-bold text-2xl capitalize">Levels Tags</h1>
            <div class="columns-1 sm:columns-2 lg:columns-3">
                <div v-for="bucket in directory" class="flex flex-col pb-2 gap-1 break-inside-avoid-column">
                    <h2 class="text-4xl font-bold text-center">{{ bucket }}</h2>
                    <Link v-for="tag in buckets[bucket]" :href="route('tags.show', tag)" class="flex justify-between bg-ui-900 rounded-lg px-2 py-1">
                        <span class="grow">{{ tags[tag].name }}</span>
                        <span class="text-ui-500">{{ tiny(tags[tag].levels_count) }}</span>
                    </Link>
                </div>
            </div>
        </div>
        <div v-if="$page.props.auth && $page.props.user.roles.includes('admin')" class="flex flex-col space-y-2 md:w-1/4">
            <h2 class="font-bold text-2xl capitalize">Add Tag</h2>
            <div class="rounded-lg bg-ui-900 p-3 space-y-2">
                <label>
                    <Input type="text" placeholder="Tag Name" v-model="form.tag"/>
                </label>
                <Button @click="submit()">Add</Button>
            </div>
        </div>
    </app-layout>
</template>
