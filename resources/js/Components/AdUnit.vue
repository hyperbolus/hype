<script setup>
import {computed, nextTick, onMounted, ref} from "vue";
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    slotKey: String,
    type: String,
    cta: Boolean,
    adStyle: String
});

const client = 'ca-pub-2489473638447569';
const dev = import.meta.env.DEV;

const style = computed(() => {
    if (props.adStyle) return '';
    if (props.type === 'banner') return 'w-[300px] sm:w-[468px] md:w-[728px] lg:w-[970px]';
    if (props.type === 'skyscraper') return 'w-[160px]';
});

const height = computed(() => {
    return ''; // Fuck you adsense

    if (props.adStyle) return '';
    if (props.type === 'banner') return 'h-[100px]';
    if (props.type === 'skyscraper') return 'h-[600px]';
});

const mounted = ref(false);

onMounted(() => {
    mounted.value = true;

    if (dev) return;

    nextTick(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    })
});
</script>
<template>
    <div class="shrink-0 text-sm text-ui-500 h-fit" :class="{'hidden': !client}">
        <span v-if="cta" class="text-sm">Advertisement</span>
        <div :class="{[style]: true, [height]: dev, 'border border-red-500 bg-red-500/25': dev}">
            <ins :style="adStyle" class="inline-block" :class="{'adsbygoogle': mounted}"
                 :data-ad-client="client"
                 :data-ad-slot="slotKey"
                 data-ad-format="auto"
                 data-full-width-responsive="false"></ins>
        </div>
        <span v-if="cta" class="text-sm">Don't want to see ads? <a class="underline" href="https://patreon.com/hyperbolus">Support us on Patreon.</a></span>
    </div>
</template>
