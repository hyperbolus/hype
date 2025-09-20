<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";
import Avatar from "@/Components/Avatar.vue";
import UserFlag from "@/Components/UserFlag.vue";
import {invisiblePixel} from "@/util.js";
import sparkle from '@/../images/sparkle_4.gif'
import UserTitle from "@/Components/UserTitle.vue";
import Icon from "@/Components/Icon.vue";
import {computed} from "vue";

const props = defineProps({
    user: Object,
    href: {
        type: [String, Boolean],
        default: null,
    },
    flag: {
        type: Boolean,
        default: false
    },
    card: {
        type: Boolean,
        default: true
    },
    badge: {
        type: Boolean,
        default: true
    },
    popUnder: Boolean
});

const link = props.href ?? route('users.show', props.user.id)

const groups = {
    0: {},
    1: {
        name: 'Administrator',
        badge: 'check-badge',
        color: 'rgb(255, 75, 75)',
        sparkle: true,
        style: '',
    },
    2: {
        name: 'Verified',
        badge: 'check-badge',
        color: 'rgb(255,125,125)',
        sparkle: true,
        style: 'filter: hue-rotate(120deg);',
    },
    3: {
        name: 'Moderator',
        badge: 'check-badge',
        color: '#f59e0b',
        sparkle: true,
        style: '',
    }
};

const group = groups[props.user.primary_group_id ?? 0];
const style = computed(() => {
    let a = ['text-shadow: black 0 1px 3px;'];

    if (group.color) a.push(`color:${group.color};`);
    if (group.sparkle) a.push(`background-image: url('${sparkle}');`);
    if (group.style) a.push(group.style);

    return a.join('');
});
</script>
<template>
    <div class="inline-flex items-center text-ui-200 break-all">
        <UserFlag v-if="flag" :user="user" size="md" class="mr-1.5"/>
        <Tooltip v-if="group.badge" :inline="true" :message="group.name" class="w-3.5 ml-1 mr-1 badge-cover" :style="`color: ${group.color};`">
            <Icon class="scale-[205%] size-2.5 badge" :name="group.badge"/>
        </Tooltip>
        <Tooltip v-if="card" :caret="false" :decoration="false" :inline="true" :container-class="`${popUnder ? 'top-full' : 'pb-1 bottom-full'} right-full`">
            <Link v-if="link" :href="link" :style="style">{{ user.name }}</Link>
            <span v-else :style="style">{{ user.name }}</span>
            <template #content>
                <div class="x box shadow-xl !p-0 overflow-hidden bg-cover bg-center" :style="`background-image: url('${user.banner_url ?? invisiblePixel}');`">
                    <div class="x items-center bg-black/50 space-x-4 p-4 min-w-[20rem]">
                        <Avatar width="w-16" :user="user"/>
                        <div class="y [text-shadow:black_0_1px_3px]">
                            <span class="font-bold text-lg w-fit" :class="{'line-through': user.banned_at}" :style="style">{{ user.name }}</span>
                            <UserTitle class="[text-shadow:black_0_1px_3px]" :user="user"/>
                        </div>
                    </div>
                </div>
            </template>
        </Tooltip>
        <template v-else>
            <Link v-if="link" :href="link" :style="style">{{ user.name }}</Link>
            <span v-else :style="style">{{ user.name }}</span>
        </template>
    </div>
</template>
<style>
.text-xs .badge {
    @apply size-2
}

.text-sm .badge {
    @apply size-2
}

.text-2xl .badge {
    @apply size-3
}

.text-xs .badge-cover {
    @apply mr-0 ml-0.5
}

.text-sm .badge-cover {
    @apply mr-0
}

.text-2xl .badge-cover {
    @apply mr-1.5
}
</style>
