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
    <Tooltip :caret="false" :decoration="false" :inline="true" :container-class="`${popUnder ? 'top-full' : 'pb-1 bottom-full'} right-full`">
        <Link :href="href ?? route('users.show', user.id)" class="inline-flex items-center text-ui-200 break-all">
            <UserFlag v-if="flag"/>
            <span :style="user.primary_group_id === 1 ? `color:rgb(255,75,75);background-image: url('${sparkle}');text-shadow: black 0 1px 3px;` : ''">{{ user.name }}</span>
        </Link>
        <template #content>
            <div class="y box shadow-xl !p-0 overflow-hidden bg-cover bg-center" :style="`background-image: url('${user.banner_url ?? invisiblePixel}');`">
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
</template>
