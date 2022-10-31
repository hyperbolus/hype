<script setup>
import {Link} from "@inertiajs/inertia-vue3";
import Username from "@/Components/Username.vue";


const props = defineProps({
    json: Object
})

const applyMarks = (marks) => {
    let classes = [];
    for (let mark in marks) {
        switch(marks[mark].type) {
            case 'bold':
                classes.push('font-bold')
                break;
            case 'italic':
                classes.push('italic')
                break;
            case 'strike':
                classes.push('line-through')
                break;
        }
    }
    return classes
}

const getTag = (json) => {
    if (json.type === 'text') {
        // we should never reach here...
        console.log('ayo the pizza here')
        return 'div'
    }

    if (json.type === 'blockquote') {
        return 'div'
    }

    if (json.type === 'paragraph') {
        return 'p'
    }

    if (json.type === 'mention') {
        return 'span'
    }

    if (json.type === 'doc') {
        return 'div'
    }
}

const typeClasses = (json) => {
    let classes = []
    if(json.type === 'blockquote') {
        classes.push(['bg-neutral-100', 'dark:bg-neutral-800', 'rounded', 'p-2', 'my-1'])
    }
    if(json.type === 'mention') {
        classes.push(['bg-neutral-100', 'dark:bg-neutral-800', 'rounded', 'px-1', 'py-0.5'])
    }
    return classes
}

</script>
<template>
    <component :is="getTag(json)" :class="typeClasses(json)">
        <template v-if="json.type === 'blockquote'">
            <span class="italics text-sm text-neutral-400">Quote:</span>
            <div class="border-t border-t-neutral-300 dark:border-t-neutral-700"></div>
        </template>
        <template v-if="json.type === 'mention'">
            <Link :href="route('users.show', json.attrs.id)">@<Username :user="{id: json.attrs.id, name: json.attrs.label}"/></Link>
        </template>
        <template v-for="node in json.content">
            <template v-if="node.type === 'text'">
                <span v-if="node.marks" :class="applyMarks(node.marks)">{{ node.text }}</span>
                <template v-else>{{ node.text }}</template>
            </template>
            <RichText v-else :json="node"/>
        </template>
    </component>
</template>
