<script setup>
const props = defineProps({
    time: String,
    length: Boolean
})

// https://muffinman.io/blog/javascript-time-ago-function/
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const getFormattedDate = (date, prefomattedDate = false, hideYear = false) => {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${ minutes }`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${ prefomattedDate } at ${ hours }:${ minutes }`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${ day }, ${ month } at ${ hours }:${ minutes }`;
    }

    // 10. January 2017. at 10:20
    return `${ day }, ${ month } ${ year }, at ${ hours }:${ minutes }`;
}

const timeAgo = (dateParam) => {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${ seconds } seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${ minutes } minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}

const timeLength = (seconds) => {
    if (!seconds) {
        return 'none'
    }

    let time = ''
    const years = Math.floor(seconds / 22896000) // 60 * 60 * 24  * 265
    seconds -= years * 22896000;
    const months = Math.floor(seconds / 2592000) // 60 * 60 * 24 * 30
    seconds -= months * 2592000;
    const days = Math.floor(seconds / 86400) // 60 * 60 * 24
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600) // 60 * 60
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60)

    if (years > 0) {
        time += years + ' year' + (years > 1 ? 's' : '') + ', '
    }

    if (months > 0) {
        time += months + ' month' + (months > 1 ? 's' : '') + ', '
    }

    if (days > 0) {
        time += days + ' day' + (days > 1 ? 's' : '')
    }

    if (hours > 0 && years === 0) {
        if (days > 0) {
            time += ', '
        }
        time += hours + ' hour' + (hours > 1 ? 's' : '')
    }

    if (minutes > 0 && months === 0) {
        if (days > 0 || hours > 0) {
            time += ', '
        }
        time += minutes + ' minute' + (minutes > 1 ? 's' : '')
    }

    return time;
}
</script>
<template>
    {{ length ? timeLength(time) : timeAgo(time) }}
</template>
