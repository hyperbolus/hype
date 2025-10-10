<script setup>
import {computed, onMounted} from "vue";
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    slotKey: String,
    type: String,
    cta: Boolean
});

const client = 'ca-pub-2489473638447569';
const dev = import.meta.env.DEV;

const style = computed(() => {
    if (props.type === 'banner') return 'w-[300px] sm:w-[468px] md:w-[728px] lg:w-[970px]';
    if (props.type === 'skyscraper') return 'w-[160px]';
});

const height = computed(() => {
    if (props.type === 'banner') return 'h-[100px]';
    if (props.type === 'skyscraper') return 'h-[600px]';
});

onMounted(() => {
    if (dev) return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
});
</script>
<template>
    <div class="shrink-0 text-sm text-ui-500 h-fit" :class="{'hidden': !client}">
        <span class="text-sm">Advertisement</span>
        <div :class="{[style]: true, [height]: dev, 'border border-red-500 bg-red-500/25': dev}">
            <ins class="adsbygoogle block"
                 :data-ad-client="client"
                 :data-ad-slot="slotKey"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
        <span v-if="cta" class="text-sm">Don't want to see ads? <Link class="underline" :href="route('auth::login')">Sign in.</Link></span>
    </div>
</template>
