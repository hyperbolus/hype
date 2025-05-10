<script setup>
import {Link} from '@inertiajs/vue3'
import route from "ziggy-js";
import Tooltip from "@/Components/Tooltip.vue";

const props = defineProps({
    user: Object,
    curve: Object
});
</script>
<template>
    <div class="y pane !pl-2">
        <div class="x justify-between items-center space-x-2">
            <h1 class="px-2">Rating Curve</h1>
            <Tooltip message="This user's ratings do not affect site-wide level averages">
                <span v-if="[5977, 5799, 6570].includes(user.id)" class="rounded bg-red-500 text-white text-xs font-bold px-1">DEWEIGHTED</span>
            </Tooltip>
        </div>
        <div class="flex flex-col-reverse">
            <Link v-for="(count, score) in curve" :href="`${route('users.reviews', user.id)}?overall=${score}-${score}`" class="x items-center group">
                <span class="text-sm text-ui-500 w-5 mr-2 text-center">{{ score }}</span>
                <div class="x items-center w-full">
                    <div class="bg-ui-800 rounded overflow-hidden grow">
                        <div class="bg-blue-500 p-0.5" :class="{'invisible': count === 0}" :style="`width: ${count / Math.max(...curve) * 100}%;`"></div>
                    </div>
                    <!-- TODO: make it so blue bar does not change and is proportionally correct instead of shrinking and being inaccurate -->
                    <div class="max-w-0 group-hover:max-w-[10rem] group-hover:px-2 transition-all duration-300 ease-out overflow-hidden text-sm">{{ count }}&nbsp;Ratings</div>
                </div>
            </Link>
        </div>
    </div>
</template>
