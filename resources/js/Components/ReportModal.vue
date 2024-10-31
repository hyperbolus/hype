<script setup>
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useSettingsStore} from "@/stores/settings.ts";
import {onMounted, ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import Errors from "@/Components/Errors.vue";

const reasons = ref({});

const props = defineProps({
    reportable_type: Number,
    reportable_id: Number,
})

const report = useForm({
    reason_id: 0,
    subject: '',
    details: '',
    url: route().current(),
    reportable_type: props.reportable_type,
    reportable_id: props.reportable_id,
})

const settings = useSettingsStore().settings['_report_reasons']

onMounted(() => {
    for (let key in settings) {
        if (!reasons.value.hasOwnProperty(settings[key].category)) {
            reasons.value[settings[key].category] = {}
        }

        reasons.value[settings[key].category][key] = settings[key];
    }
})
</script>
<template>
    <div class="p-4 bg-ui-900 text-ui-200 shadow-xl w-full md:w-[32rem] lg:w-[48rem]">
        <div class="y space-y-2 items-center" v-if="report.wasSuccessful">
            <div class="x px-4 py-2 text-emerald-400 rounded-full bg-ui-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-0.5">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                <span>Report Submitted</span>
            </div>
            <p>Thanks for keeping our community safe! Click anywhere outside this box to exit.</p>
        </div>
        <div class="y space-y-2" v-else>
            <h2 class="font-bold text-2xl">Create Report</h2>
            <label>
                Subject
                <Input v-model="report.subject" type="text" :required="true" placeholder="Required"/>
            </label>
            <label>
                Reason
                <select v-model="report.reason_id" class="block py-1 px-3 w-full border-none focus:ring-0 focus:outline-none rounded bg-ui-950">
                    <optgroup class="capitalize" v-for="(group, key) in reasons" :label="key + (key === 'legal' ? ' (High Priority)' : '')">
                        <option v-for="(reason, id) in group" :value="id">{{ reason.title }}</option>
                    </optgroup>
                </select>
            </label>
            <p>{{ settings[report.reason_id].description }}</p>
            <label>
                Details
                <textarea v-model="report.details" placeholder="Required" class="textbox !bg-ui-950"></textarea>
                <span class="x items-center text-ui-500 text-sm mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-0.5">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                    </svg>
                    <span>Please be as specific as possible</span>
                </span>
            </label>
            <Errors/>
            <Button @click="report.post(route('reports.store'), {preserveScroll: true})" class="w-fit" type="submit" :class="{ 'opacity-25': report.processing }" :disabled="report.processing">{{ report.processing ? 'Submitting...' : 'Submit Report' }}</Button>
        </div>
    </div>
</template>
