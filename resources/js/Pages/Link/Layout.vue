<template>
    <document-head title="Home"/>

    <div class="bg-gray-100 p-4 min-h-screen flex justify-center items-center">
        <div class="h-fit">
            <div class="flex flex-col text-center shadow bg-white rounded-lg p-4 text-gray-600">
                <h1 class="text-lg font-bold">DashLink</h1>
                <slot/>
            </div>
            <footer class="flex flex-row justify-between text-gray-400 mt-1">
                <span>~/ <Link class="underline" href="/">dashlink</Link><slot name="breadcrumbs"/></span>
                <slot name="build"/>
            </footer>
        </div>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
import {Head as DocumentHead, Link} from '@inertiajs/inertia-vue3';

export default defineComponent({
    props: ['jetstream', 'app', 'user', 'errorBags', 'errors'],
    components: {
        DocumentHead,
        Link,
    },
    data() {
        return {
            home: false,
        }
    }
})
</script>
