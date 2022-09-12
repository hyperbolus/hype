<template>
    <div class="space-y-2">
        <h2 class="mx-2 font-bold text-2xl">Statistics</h2>
        <div class="rounded px-4 py-2 bg-neutral-900 border border-neutral-700">
            <div class="flex justify-between">
                <span>Members</span>
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
