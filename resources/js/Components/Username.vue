<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";
import Avatar from "@/Components/Avatar.vue";

const props = defineProps({
    user: Object,
    href: String,
    flag: {
        type: Boolean,
        default: true
    }
})
</script>
<template>
    <Tooltip :caret="false" :decoration="false" container-class="pb-1 bottom-full">
        <Link :href="href ?? route('users.show', user.id)" class="transition-colors text-ui-200 break-all">{{ user.name }}</Link>
        <template #content>
            <div class="y box shadow-xl !p-0 overflow-hidden">
                <div class="bg-ui-600 py-12 bg-cover bg-center" :style="`background-image: url('${user.banner_url}');`"></div>
                <div class="x space-x-2 bg-ui-800 px-2 min-w-[20rem]">
                    <Avatar class="h-20 -mt-12 mb-2" :user="user"/>
                    <div class="y">
                        <div class="x space-x-2">
                            <span class="font-bold text-lg">{{ user.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Tooltip>
</template>
