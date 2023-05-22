<script setup>
import {onMounted, ref} from "vue";
import bg from '../../images/card_background.png'

const props = defineProps({
    image: String,
    alt: String,
    classes: String|Array,
    holo: Boolean
})

const card = ref(null)
const open = ref(false)

onMounted(() => {
    if (props.image) {
        card.value.style.setProperty('--url', `url('${bg}')`)
    }
})

const lerp = (min, max, alpha) => {
    return min * (1.0 - alpha) + (max * alpha)
}

const reset = () => {
    card.value.style.setProperty('--mx', '50%')
    card.value.style.setProperty('--my', '50%')
    card.value.style.setProperty('--posx', '50%')
    card.value.style.setProperty('--posy', '50%')
    card.value.style.setProperty('--pos', '50% 50%')
    card.value.style.setProperty('--hyp', 1)
    card.value.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
}

const tilt = (e) => {
    if (!props.holo) return;
    requestAnimationFrame(() => {
        let x = e.clientX / window.innerWidth
        let y = e.clientY / window.innerHeight
        card.value.style.setProperty('--mx', `${lerp(0, 100, x).toFixed(2)}%`)
        card.value.style.setProperty('--my', `${lerp(0, 100, y).toFixed(2)}%`)
        card.value.style.setProperty('--posx', `${lerp(35, 65, x).toFixed(2)}%`)
        card.value.style.setProperty('--posy', `${lerp(-65, -35, y).toFixed(2)}%`)
        card.value.style.setProperty('--pos', `${lerp(35, 65, x).toFixed(2)}% ${lerp(-65, -35, y).toFixed(2)}%`)
        card.value.style.setProperty('--hyp', Math.max(Math.abs(lerp(-1, 1, x)), Math.abs(lerp(-1, 1, y))).toFixed(2))
        card.value.style.transform = `perspective(1000px) rotateX(${lerp(-15, 15, y).toFixed(2)}deg) rotateY(${-lerp(-35, 35, x).toFixed(2)}deg)`
    })
}
</script>
<template>
    <div class="cursor-pointer" @click="open = true">
        <img v-if="image" class="rounded" :class="classes" :alt="alt" :src="image"/>
        <slot/>
        <teleport to="#body">
            <div @mousemove="tilt" ref="container" @click="open = false" class="cursor-pointer items-center justify-center z-[100] fixed inset-0 bg-neutral-900/50 dark:bg-ui-1000/50" :class="open ? 'flex' : 'hidden'">
                <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="transform opacity-0 scale-50"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-50">
                    <div v-show="open" class="card rounded overflow-clip relative" ref="card">
                        <img v-if="image" :alt="alt" :src="image"/>
                        <slot v-if="open" name="content"/>
                        <div v-if="holo" ref="shine" class="_sparkle absolute inset-0 w-full h-full"></div>
                        <div v-if="holo" class="_glare absolute inset-0 w-full h-full"></div>
                    </div>
                </transition>
            </div>
        </teleport>
    </div>
</template>
<style scoped>

._sparkle, ._sparkle::after {
    mix-blend-mode: color-dodge;
    background-color: transparent;
    z-index: 3;
    transform: translateZ(1px);
    --inspiration: 'https://poke-holo.simey.me/ <3 amazing';
    --space: 5%;
    --angle: 133deg;
    --imgsize: 20%;
    background-image: var(--url),
        repeating-linear-gradient( 0deg, rgb(255, 119, 115) calc(var(--space)*1), rgba(255,237,95,1) calc(var(--space)*2), rgba(168,255,95,1) calc(var(--space)*3), rgba(131,255,247,1) calc(var(--space)*4), rgba(120,148,255,1) calc(var(--space)*5), rgb(216, 117, 255) calc(var(--space)*6), rgb(255, 119, 115) calc(var(--space)*7) ),
        repeating-linear-gradient( var(--angle), #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10% , #0e152e 12% ),
        radial-gradient( farthest-corner circle at var(--mx) var(--my), rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120% );
    background-blend-mode: exclusion, hue, hard-light;
    background-size: var(--imgsize), 1100% 1100%, 600% 600%, 200% 200%;
    background-position: center center, 0% var(--posy), var(--posx) var(--posy), var(--posx) var(--posy);
    filter: brightness(calc((var(--hyp)*0.3) + 0.5)) contrast(2) saturate(1.5);
}
._sparkle::after {
    content: "";
    height: 100%;
    display: block;
    background-size: var(--imgsize), 200% 400%, 300% 100%, 200% 100%;
    background-position: center center, 0% var(--posy), calc(calc( var(--posx) * -2) + 150%) calc( var(--posy) * -1), var(--posx) var(--posy);
    filter: brightness(calc((var(--hyp)*0.5) + .8)) contrast(1.6) saturate(1.4);
    mix-blend-mode: exclusion;

}
._glare {
    mix-blend-mode: overlay;
    background-position: var(--posx) var(--posy);
    background-image: radial-gradient(farthest-corner circle at var(--mx) var(--my),rgba(255,255,255,.75) 0%,rgba(99,99,99,.35) 45%,rgba(0,0,0,1) 120%);
}
.card > div {
    opacity: 1;
}
.card {
    --posy: 50%;
    --posx: 50%;
    --mx: 50%;
    --my: 50%;
    --hyp: 0;
    --url: 0;
}
</style>
