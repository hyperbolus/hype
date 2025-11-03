<script setup>
import Icon from "./Icon.vue";
import {onMounted, ref, useTemplateRef} from "vue";
import {useMutationObserver} from "@vueuse/core/index";

const props = defineProps({
    fullwidth: {
        type: Boolean,
        default: false
    }
})

const blocked = ref(false);
const trolling = ref(false);
const picker = ref();
const badAttr = ref('');

onMounted(() => {
    // can also be null when adsense isn't configured
    blocked.value = window.as_loaded === false;

    useMutationObserver(document.body.parentElement, (mut) => {
        if (!blocked.value) return;

        if (mut[0].type === 'childList'
            && mut[0].target.tagName === 'HTML'
            && mut[0].addedNodes.length > 0
            && mut[0].addedNodes[0].src === ''
            && mut[0].addedNodes[0].tagName === 'IFRAME') {
            // remove uBo picker
            // doing .remove() actually breaks the picker lol...
            picker.value = mut[0].addedNodes[0];
            picker.value.style.scale = '0';

            // do a little trolling
            trolling.value = true;

            let rect = plea.value.firstChild.getBoundingClientRect();

            let data = {
                x: rect.left,
                y: rect.top,

                xVel: -4,
                yVel: 4,

                width: plea.value.firstChild.clientWidth,
                height: plea.value.firstChild.clientHeight,

                time: 0
            };

            let draw = () => {
                if (!trolling.value) return;
                let canvas = document.getElementById('trolling');
                let ctx = canvas.getContext('2d');
                ctx.clearRect(0,0,canvas.width = canvas.clientWidth,canvas.height = canvas.clientHeight);

                // resize box
                data.width = plea.value.firstChild.clientWidth + (Math.sin(data.time / 83) - 1) * plea.value.firstChild.clientWidth / 2;
                data.height = plea.value.firstChild.clientHeight + Math.cos(data.time / 59) * 80;

                // move box
                data.x += data.xVel;
                data.y += data.yVel;

                // top & left
                if (data.x < 0 && data.xVel < 0) data.xVel = -data.xVel;
                if (data.y < 0 && data.yVel < 0) data.yVel = -data.yVel;

                // right & bottom
                if (data.x + data.width > canvas.width && data.xVel > 0) data.xVel = -data.xVel;
                if (data.y + data.height > canvas.height && data.yVel > 0) data.yVel = -data.yVel;

                // set draw style
                ctx.fillStyle = 'rgba(255,63,63,0.20)';
                ctx.strokeStyle = '#F00';

                // clear then draw box then outline
                ctx.fillRect(data.x, data.y, data.width, data.height);
                ctx.strokeRect(data.x, data.y, data.width, data.height);

                data.time++;
                requestAnimationFrame(draw);
            }

            requestAnimationFrame(draw);
        }
    }, {
        attributes: false,
        childList: true,
        subtree: false
    });

    useMutationObserver(plea, (mut) => {
        if (mut[0]) {
            if (badAttr.value !== '') {
                badAttr.value = '';
                return;
            }

            // TODO@later: (regression) make sure this doesnt conflict with any other functionality
            if (mut[0].type === 'attributes') {
                badAttr.value = mut[0].attributeName;
                mut[0].target.removeAttribute(mut[0].attributeName);
            }

            console.log(mut);

            // plea.value.style.display = 'inherit';
            altMessage.value = (altMessage.value + 1) % retorts.value.length;
        }
    }, {
        attributes: true,
        childList: false,
        subtree: false
    });
});

const plea = useTemplateRef('plea');

const retorts = ref([
    'ok i guess ill starve.',
    '`#blacklist_me_to_hide_notice > div` hides this. if you hate fun. but so does supporting us on',
    'himmel the hero loved supporting hyperbolus...',
    'you know who else hates supporting free and open source software? people who hate yuri.',
    'blocking ads *and* the ad blocking plea??',
    'not like there are other perks when you support us on',
]);
const altMessage = ref(-1);

const endTrolling = () => {
    trolling.value = false;
    if (picker.value) picker.value.style.scale = '';
}
</script>
<template>
    <div ref="plea" v-if="blocked" id="block_me_to_hide_notice" class="x justify-center w-full text-sm select-none" :class="{'bg-ui-950 border-t border-ui-900': fullwidth, 'mt-2': !fullwidth}">
        <div class="w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-sm py-1 text-center px-4" :class="fullwidth ? '' : 'border-y border-ui-800 bg-ui-900 md:mx-4 md:rounded-lg md:border-x'">
            <p v-if="altMessage === -1">We noticed you're using an <span class="inline-flex flex-row-reverse font-bold text-transparent bg-gradient-to-r from-red-400 to-fuchsia-500 bg-clip-text"><span>ocker</span><span>d bl</span><span>a</span></span>. Visit our <a target="_blank" href="https://patreon.com/hyperbolus" class="font-bold underline text-[#FF424D]">Patreon</a> to support our work and enjoy an ad-free experience!</p>
            <p v-else>{{ retorts[altMessage] }} <a target="_blank" href="https://patreon.com/hyperbolus" class="font-bold underline text-[#FF424D]">Patreon</a></p>
        </div>
    </div>
    <teleport to="#teleports">
        <div v-show="trolling" class="fixed z-50 h-screen w-screen bg-black/50">
            <canvas class="absolute inset-0 w-full h-full" id="trolling"></canvas>
            <div class="y bg-ui-950 border border-ui-700 w-96 px-0.5 text-xs absolute bottom-12 right-16">
                <div class="x">
                    <div class="px-2 pt-2 font-bold">__</div>
                    <div class="grow polka"></div>
                    <Icon @click="endTrolling" class="w-6 m-0.5 cursor-pointer" size="24" type="outline" name="x-mark"/>
                </div>
                <textarea readonly class="bg-black h-16 text-xs text-white p-1 resize-none border-ui-700">#block_me_to_hide_notice > div</textarea>
                <div class="x space-x-1 p-0.5">
                    <button @click="endTrolling" class="button">Ha. Go away.</button>
                    <div class="grow"></div>
                    <button class="button text-white !bg-[#FF424D]">Patreon</button>
                </div>
                <p class="bg-ui-1000 text-base border border-ui-700 p-1">Reminder, you can hide ads and adblock notices by supporting us on Patreon :) 😘~<3</p>
                <span class="text-ui-500">Cosmetic Filters</span>
                <div class="y mx-4 font-mono text-ui-500">
                    <span>#Neutregena.Ultra-Sheer.SPF-50</span>
                    <span>###Olay.Smoothening.Facial.Cleanser</span>
                    <span>##Jergens.Ultra-Healing.Moisturizer</span>
                </div>
            </div>
        </div>
    </teleport>
</template>
<style>
.polka {
    background-image:
        radial-gradient(rgb(255, 255, 255, 0.3) 10%, transparent 10%),
        radial-gradient(rgb(255, 255, 255, 0.3) 10%, transparent 10%);
    background-position: -2px -2px, 2px 2px;
    background-size: 7px 7px;
}
</style>
