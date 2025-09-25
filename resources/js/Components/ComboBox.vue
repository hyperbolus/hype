<script setup>
import {ref, useTemplateRef, watch} from "vue";
import Icon from "@/Components/Icon.vue";
import {onClickOutside, useMagicKeys, whenever} from "@vueuse/core";

const props = defineProps({
    options: Object,
    multiple: Boolean,
    unique: {
        type: Boolean,
        default: true
    },
    keyName: {
        type: String,
        default: null
    }
})

const input = useTemplateRef('input');
const base = useTemplateRef('base');

const focused = ref(false);
const dropdown = ref(false);

const highlighted = ref(-1);

const selected = defineModel()

const query = ref('');
const results = ref([]);
const resultsCount = ref(0);

const updateResults = () => {
    results.value = [];
    resultsCount.value = 0;

    let i = 0;
    for (let opt in props.options) {
        let source = props.options[opt|0];
        if (props.keyName) source = source[props.keyName];
        if (source.toLowerCase().includes(query.value.toString().toLowerCase())) {
            if (props.unique && selected.value.includes(opt|0)) continue;
            if (i++ < 25) results.value.push(opt|0);
            resultsCount.value++;
        }
    }
};

watch(query, updateResults, {immediate: true});

const deleteSelection = (i = null) => {
    if (highlighted.value === -1 && focused.value && input.value.selectionStart === 0) i = selected.value.length - 1;

    // deleted highlight if we havent been given anything
    if (typeof i !== 'number') i = highlighted.value;

    // delete that index in the array (if its there)
    if (selected.value.hasOwnProperty(i|0)) {
        selected.value.splice(i|0, 1);

        // snap to end of array if the highlighted index has been deleted
        if (highlighted.value >= selected.value.length) highlighted.value = selected.value.length - 1;

        updateResults();
    }
}

const addSelection = (i) => {
    i = i|0;
    if (!props.unique || !selected.value.includes(i)) selected.value.push(i);

    query.value = '';
    updateResults();

    if (selectModeDropdown.value) {
        if (highlighted.value >= results.value.length) highlighted.value = results.value.length - 1;
        if (results.value.length === 0) input.value.focus();
    }
}

const prev = () => {
    if (selectModeDropdown.value && highlighted.value === 0) {
        input.value.focus();
    } else {
        // move back if active (not -1)
        if (highlighted.value > 0) highlighted.value--;

        // if moving left at cursor pos 0 select the last pill
        if (focused.value && input.value.selectionStart === 0) {
            highlighted.value = selected.value.length - 1;

            // blur input but only if there is something to the left in the first place
            if (selected.value.length > 0) input.value.blur();
        }
    }
};

const next = () => {
    if (selectModeDropdown.value) {
        if (highlighted.value < results.value.length - 1) highlighted.value++;
    } else {
        if (highlighted.value !== -1) highlighted.value++;
        if (highlighted.value === selected.value.length) {
            input.value.focus();
            selectModeDropdown.value = false;
        }
    }
};

// todo: trigger arrows also if held down not only on 'keydown'
const {left, right, up, down, escape, backspace, 'delete': del, enter, space} = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if ((focused.value || highlighted.value !== -1) && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && e.type === 'keydown') {
            e.preventDefault();
        }
    },
});

// todo: make this work as one thing maybe?
whenever(backspace, deleteSelection);
whenever(del, deleteSelection);

whenever(left, prev);
whenever(right, next);

const selectModeDropdown = ref(false);

whenever(down, () => {
    if (results.value.length === 0) return;
    if (!focused.value && highlighted.value === -1) return;
    if (!selectModeDropdown.value) highlighted.value = -1;
    input.value.blur();
    selectModeDropdown.value = true;
    next();
});
whenever(up, () => {
    if (!selectModeDropdown.value) return;
    prev();
});

whenever(escape, _ => {
    highlighted.value = -1;
    dropdown.value = false;
    input.value.blur();
});

whenever(enter, () => {
    if (selectModeDropdown.value) addSelection(results.value[highlighted.value|0]);
});

onClickOutside(base, () => dropdown.value = false);
</script>
<template>
    <div ref="base" class="relative w-fit">
        <div @click="input.focus()" class="flex flex-wrap gap-2 bg-ui-900 p-1.5 rounded z-0">
            <div v-for="(selection, i) in selected" @click.stop="highlighted = i" class="x items-center space-x-1 bg-ui-800 px-2 py-1 text-sm cursor-pointer rounded-md border border-transparent" :class="{'border-blue-600': highlighted === i && !selectModeDropdown}">
                <Icon name="x-mark" class="size-5 hover:text-red-500" @click.stop="deleteSelection(i)"/>
                <span>{{ keyName ? options[selection]?.[keyName] : options[selection] }}</span>
            </div>
            <input ref="input" @focusin="highlighted = -1; focused = true; dropdown = true; selectModeDropdown = false;" @focusout="focused = false;" v-model="query" type="text" class="p-0 border-none bg-transparent focus-visible:ring-0 pr-2" :class="{'pl-2': selected.length === 0}"/>
        </div>
        <div v-show="dropdown" class="y absolute top-full mt-1 h-fit w-full bg-ui-900 rounded-lg border border-ui-700 shadow-xl z-10">
            <span v-if="results.length === 0" class="px-2 py-0.5">No Results</span>
            <button v-for="(result, i) in results" @click="addSelection(result)" class="text-left px-2 py-0.5 last:rounded-b-lg first:rounded-t-lg hover:bg-ui-800" :class="{'bg-ui-800': highlighted === i && selectModeDropdown}">{{ keyName ? options[result]?.[keyName] : options[result] }}</button>
            <span v-if="resultsCount > results.length" class="px-2 py-0.5 text-sm text-ui-500">{{ resultsCount - results.length }} More</span>
        </div>
    </div>
</template>
