<script setup>
import Dash from "@/Layouts/Dash.vue";
import {onMounted, ref} from "vue";
import LevelViewer from "@/Components/LevelViewer.vue";
import {inflate} from "pako";

const props = defineProps({
    levelData: String
})

const parser = new DOMParser();
const data = parser.parseFromString(props.levelData, 'application/xml').firstChild;
const level = {};
for (let i = 0; i < data.children.length; i++) {
    level[data.children[i].innerHTML] = data.children[++i].innerHTML;
}

level['k4'] = level['k4'].replaceAll('-', '+').replaceAll('_', '/')

let _ = new Uint8Array(atob(level['k4']).split('').map(char => char.charCodeAt(0)));
_ = inflate(_);
let dc = new TextDecoder();
_ = dc.decode(_);
</script>
<template>
    <Dash :fullwidth="true" :decorations="false">
        <div class="y relative grow w-full">
            <LevelViewer :level-data="_" :decoration="false">
                <div class="x space-x- 2 justify-between">

                </div>
                <div class="x space-y-2 justify-center">
                    <div class="select-none rounded text-red-500 bg-ui-800 border border-ui-700 px-1.5 py-0.5">This feature is a work-in-progress. There are still many bugs.</div>
                </div>
            </LevelViewer>
        </div>
    </Dash>
</template>
