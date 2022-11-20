<template>
    <div class="space-y-2">
        <h2 class="mx-2 font-bold text-2xl">Statistics</h2>
        <div class="pane">
            <div class="flex justify-between">
                <span>Users</span>
                <span>{{ $page.props.app.stats.users }}</span>
            </div>
            <div class="flex justify-between">
                <span>Levels</span>
                <span>{{ $page.props.app.stats.levels }}</span>
            </div>
            <div class="flex justify-between">
                <span>Reviews</span>
                <span>{{ $page.props.app.stats.reviews }}</span>
            </div>
            <div class="flex justify-between">
                <span>Videos</span>
                <span>{{ $page.props.app.stats.videos }}</span>
            </div>
        </div>
    </div>
</template>
