<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";
import Avatar from "@/Components/Avatar.vue";
import UserFlag from "@/Components/UserFlag.vue";
import sparkle from '@/../images/sparkle_2.gif'
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
        color: 'rgb(255 75 75)',
        sparkle: true,
    },
    2: {
        name: 'Moderator',
        badge: 'check-badge',
        color: '#a467ea',
        sparkle: true,
    },
    3: {
        name: 'Verified',
        badge: 'check-badge',
        color: 'rgb(34 197 94)',
        sparkle: true,
    },
    4: {
        name: 'Wiki Contributor',
        badge: 'open-book',
        color: '#8eb3ff',
        sparkle: true,
    }
};

const group = groups[props.user.primary_group_id ?? 0];
const style = computed(() => {
    let a = ['text-shadow: black 0 1px 3px;'];

    if (group.color) a.push(`color:${group.color};`);
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
            <Link v-if="link" :href="link" :style="style" class="relative">
                <span class="z-10 relative">{{ user.name }}</span>
                <div v-if="group.sparkle" class="absolute inset-0" :style="`background-color:${group.color};mask-image:url('${sparkle}');`"></div>
            </Link>
            <span v-else :style="style">{{ user.name }}</span>
            <template #content>
                <div class="x box shadow-xl !p-0 overflow-hidden bg-cover bg-center">
                    <div class="x items-center bg-black/50 space-x-4 p-4 min-w-[20rem]">
                        <Avatar width="w-16" :user="user"/>
                        <div class="y [text-shadow:black_0_1px_3px]">
                            <div class="font-bold text-lg w-fit relative" :class="{'line-through': user.banned_at}" :style="style">
                                <span class="z-10 relative">{{ user.name }}</span>
<!--                                <div v-if="group.sparkle" class="absolute inset-0" :style="`background-color:${group.color};mask-image:url('${sparkle}');`"></div>-->
                            </div>
                            <UserTitle class="[text-shadow:black_0_1px_3px]" :user="user"/>
                        </div>
                    </div>
                </div>
            </template>
        </Tooltip>
        <template v-else>
            <Link v-if="link" :href="link" :style="style" class="relative">
                <span class="z-10 relative">{{ user.name }}</span>
                <div v-if="group.sparkle" class="absolute inset-0" :style="`background-color:${group.color};mask-image:url('${sparkle}');`"></div>
            </Link>
            <div v-else :style="style" class="relative">
                <span class="z-10 relative">{{ user.name }}</span>
                <div v-if="group.sparkle" class="absolute inset-0" :style="`background-color:${group.color};mask-image:url('${sparkle}');`"></div>
            </div>
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
