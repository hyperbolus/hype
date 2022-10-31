<template>
    <div class="relative rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
        <template v-if="items.length">
            <div v-for="(item, index) in items" :key="index" :class="{'bg-neutral-200 dark:bg-neutral-800 font-bold': selectedIndex === index}" @click="selectItem(index)" class="flex items-center gap-4 px-2 py-1 justify-between">
                <span>{{ item.name }}</span>
                <span class="opacity-50 text-xs">ID: {{ item.id }}</span>
            </div>
        </template>
        <div class="px-2 py-1" v-else>
            No results :(
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            selectedIndex: 0,
        }
    },

    watch: {
        items() {
            this.selectedIndex = 0
        },
    },

    methods: {
        onKeyDown({ event }) {
            if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
            }

            if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
            }

            if (event.key === 'Enter') {
                this.enterHandler()
                return true
            }

            return false
        },

        upHandler() {
            this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length
        },

        enterHandler() {
            this.selectItem(this.selectedIndex)
        },

        selectItem(index) {
            const item = this.items[index]

            if (item) {
                this.command({ id: item.id, label: item.name })
            }
        },
    },
}
</script>
