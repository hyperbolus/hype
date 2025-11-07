<script setup>
import WikiLayout from "@/Layouts/WikiLayout.vue";
import {Link, useForm, usePage} from "@inertiajs/vue3";
import TipTap from "@/Components/TipTap.vue";
import {nextTick, onMounted, ref} from "vue";
import {isAdmin} from "@/util.js";
import DiscordInvite from "@/Components/DiscordInvite.vue";
import Textbox from "@/Components/Textbox.vue";
import Button from "../../Jetstream/Button.vue";

const props = defineProps({
    page: Object,
    title: String,
    language: String,
    namespace: String,
    editing: Boolean
})

const EMPTY = '<p></p>';
const MISSING_PAGE = '<p>This article does not exist. Do you want to create it?</p>';

const editing = ref(props.editing);
const body = ref(props.page ? props.page.revision.text.content : (props.editing ? EMPTY : MISSING_PAGE));

const edit = (e, v) => {
    const url = new URL(window.location.href);

    editing.value = v;

    if (v) {
        if (!props.page) body.value = EMPTY;
        url.searchParams.set('action', 'edit');
    } else {
        url.searchParams.delete('action');
        body.value = props.page ? props.page.revision.text.content : MISSING_PAGE;
    }

    // todo@later: breadcrumbs wont update, maybe make this an inertia visit w/ partial (none) reload (UPDATED NOTE): do a client side navigation!
    window.history.replaceState(null, '', url.toString());

    return false;
}

const revision = useForm({
    title: null,
    content: '',
    language: '',
    namespace: '',
    description: '',
});

const submitRevision = () => {
    revision.content = body.value;
    revision.title = props.title;
    revision.language = props.language;
    revision.namespace = props.namespace;
    revision[props.page ? 'patch' : 'post'](props.page ? route('wiki.update', props.page.id) : route('wiki.store'), {
        onSuccess: () => {
            editing.value = false;
            revision.reset();
        }
    });
};
</script>
<template>
    <WikiLayout :edited_at="page?.revision.created_at" :language="language" :namespace="namespace" :title="title">
        <div class="x justify-between space-x-4 border-b border-ui-700 pb-1 px-4">
            <a :href="'?action=read'" @click.prevent="edit($event, false)" class="border-b-2 border-blue-500 -mb-1">{{ namespace }}</a>
            <div class="x space-x-4">
                <a v-if="page" :href="'?action=read'" @click.prevent="edit($event, false)" class="border-b-2 border-transparent -mb-1" :class="{'border-b-blue-500': !editing}">Read</a>
                <a :href="'?action=edit'" @click.prevent="edit($event, true)" class="border-b-2 border-transparent -mb-1" :class="{'border-b-blue-500': editing}">{{ page ? 'Edit' : 'Create' }}</a>
                <Link v-if="page" :href="'?action=history'">History</Link>
            </div>
        </div>
        <TipTap v-show="!editing || (editing && isAdmin())" v-model="body" :editable="editing" :class="{'border border-ui-700 rounded-lg': editing}"/>
        <div v-if="editing && !isAdmin()" class="y space-y-2 items-center pane !py-4">
            <span class="font-bold text-2xl">Hold Up!</span>
            <p class="text-center">Wiki page editing is only available to select users. If you would like to contribute to the wiki, please join our Discord!</p>
            <DiscordInvite code="JJc8nndmFE"/>
        </div>
        <div v-if="editing && isAdmin()" class="y pane !py-4">
            <span class="text-sm">Edit Description</span>
            <Textbox v-model="revision.description" class="w-full"/>
            <Button @click="submitRevision" class="w-fit">Submit</Button>
        </div>
    </WikiLayout>
</template>
