<script setup>
import {Link, router} from '@inertiajs/vue3';

const props = defineProps({
    list: Object,
    small: Boolean
})

// TODO: use calculation to figure out when to use small logic!!!

const promptPage = () => {
    let page = prompt('Jump to page number:');
    if (!page || !Number.isInteger(parseInt(page))) return;
    let first = props.list.first_page_url.toString();
    let url = first.substring(0, first.length - 1) + page;
    router.get(url);
}
// TODO: logic for showing insta hop. maybe remove or use elipses to determine if they should show?
</script>
<template>
    <div class="x justify-center">
        <div class="x items-center pane overflow-hidden !py-0 !px-0 !rounded-md w-fit">
            <template v-if="list.current_page !== 1">
                <Link v-if="false && list.current_page - 1 !== 1" :href="list.first_page_url" class="hidden sm:flex px-1 hover:text-ui-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clip-rule="evenodd" />
                    </svg>
                </Link>
                <Link :href="list.prev_page_url" class="hidden sm:flex px-1 hover:text-ui-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                </Link>
            </template>
            <template v-for="(link, index) in list.links.slice(1, -1)">
                <span v-if="link.label === '...'" @click="promptPage" class="cursor-pointer hover:text-ui-500" title="Jump to specific page">{{ link.label }}</span>
                <template v-else>
                    <template v-if="list.links[index + 2].label === '...' || list.links[index].label === '...'">
                        <Link v-if="!small" :href="link.url" class="hidden sm:inline px-2 transition-colors hover:text-ui-500" :class="{'bg-ui-700': link.active}">
                            {{ link.label }}
                        </Link>
                    </template>
                    <Link v-else :href="link.url" class="px-2 transition-colors hover:text-ui-500" :class="{'bg-ui-700': link.active}">
                        {{ link.label }}
                    </Link>
                </template>
            </template>
            <template v-if="list.current_page !== list.last_page">
                <Link :href="list.next_page_url" class="hidden sm:flex px-1 hover:text-ui-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </Link>
                <Link v-if="false && list.current_page + 1 !== list.links.length - 2" :href="list.last_page_url" class="hidden sm:flex px-1 hover:text-ui-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </Link>
            </template>
        </div>
    </div>
</template>
