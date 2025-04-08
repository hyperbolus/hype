<script setup>
import Username from "@/Components/Username.vue";
import AppLayout from "@/Layouts/Dash.vue";
import Avatar from "@/Components/Avatar.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import QueryResults from "@/Components/QueryResults.vue";
import route from "ziggy-js";

const props = defineProps({
    users: Object,
    sorting: Object
})
</script>
<template>
    <app-layout>
        <QueryResults :url="route('users.index')" :sorting="sorting" :results="users" v-slot="{ item }" title="Users" container-classes="flex flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="x pane transition shadow hover:shadow-lg hover:bg-opacity-75 justify-between items-center px-4 py-2">
                <div class="x items-center">
                    <Avatar width="w-12" class="mr-4" :user="item"/>
                    <div class="y space-y-1">
                        <span><Username class="font-bold text-lg" :user="item"/> <span class="hidden text-ui-400 text-sm">({{ item.pronouns }})</span></span>
                        <div class="x space-x-3">
                            <Tooltip message="Reviews" container-class="x items-center space-x-1">
                                <div class="x items-center space-x-1">
                                    <Icon class="w-5" name="pencil-square"/>
                                    <span class="text-sm">{{ item.reviews_count }}</span>
                                </div>
                            </Tooltip>
                            <Tooltip message="Reputation" container-class="x items-center space-x-1">
                                <div class="x items-center space-x-1">
                                    <Icon class="w-5" name="scale"/>
                                    <span class="text-sm">{{ item.reputation }}</span>
                                </div>
                            </Tooltip>
                            <Tooltip message="Credits" container-class="x items-center space-x-1">
                                <div class="x items-center space-x-1">
                                    <Icon class="w-5" name="currency-dollar"/>
                                    <span class="text-sm">{{ item.credits }}</span>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </QueryResults>
    </app-layout>
</template>
