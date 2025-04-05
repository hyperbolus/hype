<script setup>
const props = defineProps({
    curve: Object
});
</script>
<template>
    <div class="y pane !pl-2">
        <h1 class="px-2">Rating Curve</h1>
        <div class="flex flex-col-reverse">
            <div v-for="(count, score) in curve" class="x items-center group">
                <span class="text-sm text-ui-500 w-5 mr-2 text-center">{{ score }}</span>
                <div class="x items-center w-full">
                    <div class="bg-ui-800 rounded overflow-hidden grow">
                        <div class="bg-blue-500 p-0.5" :class="{'invisible': count === 0}" :style="`width: ${count / Math.max(...curve) * 100}%;`"></div>
                    </div>
                    <!-- TODO: make it so blue bar does not change and is proportionally correct instead of shrinking and being inaccurate -->
                    <div class="max-w-0 group-hover:max-w-[10rem] group-hover:px-2 transition-all duration-300 ease-out overflow-hidden text-sm">{{ count }}&nbsp;Ratings</div>
                </div>
            </div>
        </div>
    </div>
</template>
