<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";
import Avatar from "@/Components/Avatar.vue";
import UserFlag from "@/Components/UserFlag.vue";
import {invisiblePixel} from "@/util.js";
import sparkle from '@/../images/sparkle_4.gif'
import UserTitle from "@/Components/UserTitle.vue";

const props = defineProps({
    user: Object,
    href: String,
    flag: {
        type: Boolean,
        default: false
    },
    card: {
        type: Boolean,
        default: true
    },
    popUnder: Boolean
})
</script>
<template>
    <div class="inline-flex items-center text-ui-200 break-all">
        <UserFlag v-if="flag"/>
        <Tooltip :message="'Administrator'" v-if="user.primary_group_id === 1" class="mr-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-red-500 w-5 h-5">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
        </Tooltip>
        <Tooltip :message="'Verified'" v-if="user.primary_group_id === 2" class="mr-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-green-500 w-5 h-5">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
        </Tooltip>
        <Tooltip :caret="false" :decoration="false" :inline="true" :container-class="`${popUnder ? 'top-full' : 'pb-1 bottom-full'} right-full`">
            <Link v-if="user.primary_group_id === 1" :href="href ?? route('users.show', user.id)" :style="`color:rgb(255,75,75);background-image: url('${sparkle}');text-shadow: black 0 1px 3px;`">{{ user.name }}</Link>
            <Link v-else-if="user.primary_group_id === 2" :href="href ?? route('users.show', user.id)" style="filter: hue-rotate(120deg);color:rgb(255,125,125);text-shadow: black 0 1px 3px;" :style="`background-image: url('${sparkle}');`">{{ user.name }}</Link>
            <Link v-else :href="href ?? route('users.show', user.id)">{{ user.name }}</Link>
            <template #content>
                <div class="x box shadow-xl !p-0 overflow-hidden bg-cover bg-center" :style="`background-image: url('${user.banner_url ?? invisiblePixel}');`">
                    <div class="x items-center bg-black/50 space-x-4 p-4 min-w-[20rem]">
                        <Avatar width="w-16" :user="user"/>
                        <div class="y [text-shadow:black_0_1px_2px]">
                            <span class="font-bold text-lg w-fit" :style="user.primary_group_id === 1 ? `color:rgb(255,75,75);background-image: url('${sparkle}');text-shadow: black 0 1px 3px;` : ''">{{ user.name }}</span>
                            <UserTitle class="[text-shadow:black_0_1px_3px]" :user="user"/>
                        </div>
                    </div>
                </div>
            </template>
        </Tooltip>
    </div>
</template>
