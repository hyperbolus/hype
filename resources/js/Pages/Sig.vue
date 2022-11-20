<script setup>
import { ref } from 'vue'

const scroll = (id) => {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'})
}

const member = ref(null);
</script>
<template>
<div class="y items-center bg-neutral-900">
    <div id="header" class="x relative items-center justify-center w-full bg-rose-500 h-screen">
        <h1 class="text-6xl font-bold">TITLE TEXT</h1>
        <div @click="scroll('main')" class="absolute bottom-20 bg-neutral-900 rounded-full p-3 animate-bounce transition-[padding] origin-center cursor-pointer hover:p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
    </div>
    <svg class="rotate-180 text-neutral-900 bg-rose-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
    </svg>
    <div class="w-full z-10 bg-neutral-900 text-white -mt-1 p-1"><!-- Dirty trick to cover up imperfect svg (https://shapedivider.app/) --></div>
    <div id="main" class="flex flex-col md:flex-row relative gap-4 w-full p-8 lg:p-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-white !pt-8">
        <div class="sticky top-4 h-fit bg-neutral-800 rounded p-2 shadow-xl">
            <div class="font-bold uppercase text-xs mb-1">ON THIS PAGE</div>
            <ul class="flex md:flex-col items-center justify-around md:items-start border-l-2 border-l-rose-500 pl-2 md:space-y-2 px-4">
                <li @click="scroll('header')" class="cursor-pointer transition hover:opacity-50">Home</li>
                <li @click="scroll('s-1')" class="cursor-pointer transition hover:opacity-50">About</li>
                <li @click="scroll('s-2')" class="cursor-pointer transition hover:opacity-50">Topics</li>
                <li @click="scroll('s-3')" class="cursor-pointer transition hover:opacity-50">Members</li>
            </ul>
        </div>
        <div class="space-y-8 flex-grow">
            <div id="s-1" class="y space-y-2">
                <h1 class="font-bold text-2xl">About The Web Development SIG</h1>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et odio in felis rhoncus pharetra. Vivamus et viverra tellus. Donec in vehicula magna, at varius leo. Nunc in nisi sem. Sed volutpat venenatis viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus porttitor condimentum tristique. Sed imperdiet tortor nunc, nec sagittis eros sagittis in. Cras congue, sapien eu lacinia gravida, mi ipsum molestie lorem, et accumsan nulla nisl a elit. Fusce metus nibh, congue sit amet odio non, imperdiet euismod orci. Suspendisse potenti. Ut interdum ac risus bibendum finibus. Morbi ut blandit ex, vitae auctor sem. Duis viverra nisl ornare sapien facilisis, sed fringilla turpis elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed in nunc ante. Morbi bibendum bibendum massa, at laoreet felis commodo at. Praesent feugiat augue in quam ornare faucibus. Aenean gravida dignissim nulla, ac condimentum diam scelerisque ut. Aliquam erat volutpat. Suspendisse vehicula accumsan dolor, sit amet volutpat erat dictum semper. Sed nec lacinia purus. Donec non justo justo. Quisque faucibus feugiat gravida. Mauris semper blandit magna sagittis scelerisque. Etiam maximus purus quis suscipit blandit. Nam efficitur lacus a turpis egestas convallis. In blandit, dui quis sagittis vestibulum, ipsum mi tincidunt nisl, vitae tincidunt mi tellus ut diam. Integer tristique sollicitudin ante in egestas. Praesent nec metus non tellus lacinia pellentesque tempus non turpis. Nunc eget condimentum tellus. </p>
            </div>
            <div id="s-2" class="space-y-2">
                <h1 class="font-bold text-2xl">Topics Covered</h1>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div v-for="i in ['HTML', 'CSS', 'JavaScript', 'HTML', 'CSS', 'JavaScript']" class="rounded border border-neutral-700 p-4 space-y-2">
                        <div class="x items-center space-x-2">
                            <div class="bg-neutral-800 w-fit p-2 rounded border border-neutral-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                            </div>
                            <h2 class="font-bold text-xl">{{ i }}</h2>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et odio in felis rhoncus pharetra. Vivamus et viverra tellus. Donec in vehicula magna, at varius leo.</p>
                    </div>
                </div>
            </div>
            <div id="s-3" class="y space-y-2">
                <h1 class="font-bold text-2xl">Members</h1>
                <div class="flex flex-col lg:flex-row gap-4">
                    <div class="shrink-0 h-fit rounded border border-neutral-700 divide-y divide-neutral-700">
                        <label class="x items-center p-4 transition" :class="{'bg-neutral-800': member === 0}">
                            <input v-model="member" class="hidden" type="radio" name="member" :value="0">
                            <img alt="Profile Picture" src="https://i.pravatar.cc/200?0" class="rounded-full w-8 h-8 mr-2"/>
                            <span class="font-bold text-xl">Alice Allison</span>
                        </label>
                        <label class="x items-center p-4 transition" :class="{'bg-neutral-800': member === 1}">
                            <input v-model="member" class="hidden" type="radio" name="member" :value="1">
                            <img alt="Profile Picture" src="https://i.pravatar.cc/200?1" class="rounded-full w-8 h-8 mr-2"/>
                            <span class="font-bold text-xl">Bob Bobbertson</span>
                        </label>
                        <label class="x items-center p-4 transition" :class="{'bg-neutral-800': member === 2}">
                            <input v-model="member" class="hidden" type="radio" name="member" :value="2">
                            <img alt="Profile Picture" src="https://i.pravatar.cc/200?2" class="rounded-full w-8 h-8 mr-2"/>
                            <span class="font-bold text-xl">Eve Everson</span>
                        </label>
                    </div>
                    <div class="relative">
                        <Transition
                            enter-active-class="z-10 transition ease-out duration-300"
                            enter-from-class="transform opacity-0 scale-90"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="z-0 absolute transition ease-in duration-200"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-90">
                            <div v-if="member === 0" class="flex flex-col bg-neutral-900 lg:flex-row items-center gap-4 grow rounded border border-neutral-700 p-4">
                                <div class="shrink-0 w-full lg:w-1/3">
                                    <div class="y items-center space-y-4">
                                        <img alt="Profile Picture" src="https://i.pravatar.cc/200?0" class="rounded-full"/>
                                        <h1 class="font-bold text-3xl">Alice Allison</h1>
                                        <div class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                                <a href="#" class="underline">Website</a>
                                            </div>
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                                                </svg>
                                                <a href="#" class="underline">GitHub</a>
                                            </div>
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                                </svg>
                                                <span>Backend</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="font-bold text-2xl">About Me</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, felis eget
                                        tempus eleifend, elit tortor sagittis tortor, ac dictum augue urna nec ex. Nunc euismod
                                        lobortis enim, iaculis euismod libero dapibus vitae. Mauris nec faucibus leo. Vivamus in
                                        magna facilisis, commodo nunc cursus, fermentum diam. Fusce volutpat enim in sodales congue.
                                        Aliquam erat volutpat. Proin mollis nunc ut rhoncus scelerisque. Duis sem enim, faucibus
                                        non magna at, suscipit faucibus nibh. Pellentesque pretium, sem ac ornare vestibulum, magna
                                        sapien iaculis massa, id sodales est enim ac ante. Aenean posuere nisl ac lectus rhoncus,
                                        eget mollis velit pretium. Quisque risus risus, lacinia sit amet tellus ut, molestie tempor
                                        nulla. Curabitur sit amet nulla et diam elementum venenatis at sed sem. Fusce vestibulum vel
                                        leo vitae congue. Fusce condimentum dolor vel tortor tempor accumsan. Nullam non commodo
                                        neque.</p>
                                </div>
                            </div>
                            <div v-else-if="member === 1" class="flex flex-col bg-neutral-900 lg:flex-row items-center gap-4 grow rounded border border-neutral-700 p-4">
                                <div class="shrink-0 w-full lg:w-1/3">
                                    <div class="y items-center space-y-4">
                                        <img alt="Profile Picture" src="https://i.pravatar.cc/200?1" class="rounded-full"/>
                                        <h1 class="font-bold text-3xl">Bob Bobbertson</h1>
                                        <div class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                                <a href="#" class="underline">Website</a>
                                            </div>
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                                                </svg>
                                                <a href="#" class="underline">GitHub</a>
                                            </div>
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                                </svg>
                                                <span>Backend</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="font-bold text-2xl">About Me</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, felis eget
                                        tempus eleifend, elit tortor sagittis tortor, ac dictum augue urna nec ex. Nunc euismod
                                        lobortis enim, iaculis euismod libero dapibus vitae. Mauris nec faucibus leo. Vivamus in
                                        magna facilisis, commodo nunc cursus, fermentum diam. Fusce volutpat enim in sodales congue.
                                        Aliquam erat volutpat. Proin mollis nunc ut rhoncus scelerisque. Duis sem enim, faucibus
                                        non magna at, suscipit faucibus nibh. Pellentesque pretium, sem ac ornare vestibulum, magna
                                        sapien iaculis massa, id sodales est enim ac ante. Aenean posuere nisl ac lectus rhoncus,
                                        eget mollis velit pretium. Quisque risus risus, lacinia sit amet tellus ut, molestie tempor
                                        nulla. Curabitur sit amet nulla et diam elementum venenatis at sed sem. Fusce vestibulum vel
                                        leo vitae congue. Fusce condimentum dolor vel tortor tempor accumsan. Nullam non commodo
                                        neque.</p>
                                </div>
                            </div>
                            <div v-else-if="member === 2" class="flex flex-col bg-neutral-900 lg:flex-row items-center gap-4 grow rounded border border-neutral-700 p-4">
                                <div class="shrink-0 w-full lg:w-1/3">
                                    <div class="y items-center space-y-4">
                                        <img alt="Profile Picture" src="https://i.pravatar.cc/200?2" class="rounded-full"/>
                                        <h1 class="font-bold text-3xl">Eve Everson</h1>
                                        <div class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                                <a href="#" class="underline">Website</a>
                                            </div>
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                                                </svg>
                                                <a href="#" class="underline">GitHub</a>
                                            </div>
                                            <div class="x space-x-1 items-center text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                                </svg>
                                                <span>Backend</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="font-bold text-2xl">About Me</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, felis eget
                                        tempus eleifend, elit tortor sagittis tortor, ac dictum augue urna nec ex. Nunc euismod
                                        lobortis enim, iaculis euismod libero dapibus vitae. Mauris nec faucibus leo. Vivamus in
                                        magna facilisis, commodo nunc cursus, fermentum diam. Fusce volutpat enim in sodales congue.
                                        Aliquam erat volutpat. Proin mollis nunc ut rhoncus scelerisque. Duis sem enim, faucibus
                                        non magna at, suscipit faucibus nibh. Pellentesque pretium, sem ac ornare vestibulum, magna
                                        sapien iaculis massa, id sodales est enim ac ante. Aenean posuere nisl ac lectus rhoncus,
                                        eget mollis velit pretium. Quisque risus risus, lacinia sit amet tellus ut, molestie tempor
                                        nulla. Curabitur sit amet nulla et diam elementum venenatis at sed sem. Fusce vestibulum vel
                                        leo vitae congue. Fusce condimentum dolor vel tortor tempor accumsan. Nullam non commodo
                                        neque.</p>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="x justify-between text-neutral-500 py-4 w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <div>Webdev SIG &copy; 2022</div>
        <div>Back to Top</div>
    </div>
</div>
</template>
