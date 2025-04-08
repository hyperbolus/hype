<script setup>
import UserLayout from "@/Pages/Users/Partials/UserLayout.vue";
import QueryResults from "@/Components/QueryResults.vue";
import PostTicket from "@/Components/PostTicket.vue";

const props = defineProps({
    profile: Object,
    posts: Object,
    sorting: Object
});
</script>
<template>
    <UserLayout :profile="profile">
        <QueryResults title="Posts" :sorting="sorting" :results="posts" v-slot="{ item }" container-classes="y space-y-2">
            <PostTicket :post="item"/>
        </QueryResults>
    </UserLayout>
</template>
