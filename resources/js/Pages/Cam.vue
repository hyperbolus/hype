<script setup>
const tools = [
    'Frames',
    'Images',
    'Amongus',
    'Hitboxes',
    'Some Other Stuff',
    'Amongus Again'
]
</script>
<template>
    <div class="flex flex-col items-center min-h-screen text-gray-700 bg-gray-50">
        <div class="flex flex-col w-full lg:max-w-5xl xl:max-w-6xl">
            <div class="flex justify-between mt-8">
                <div class="flex items-center space-x-4">
                    <div class="px-6 py-4 rounded bg-gray-200">iCreate Logo</div>
                    <div class="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer">Features</div>
                    <div class="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer">Pricing</div>
                    <div class="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer">FAQ</div>
                </div>
                <div>
                    <div class="px-4 py-2 rounded-full bg-cyan-400 text-white">Support</div>
                </div>
            </div>
            <div class="flex flex-col text-center my-48">
                <h1 class="font-bold" style="font-size: 4em">Unleash Your Creativity with <span class="font-bold text-cyan-400">Super Powers</span></h1>
                <h6 class="text-xl">The best utility mod for iOS to unleach your creativity</h6>
                <div class="flex justify-center gap-4 mt-4">
                    <div class="px-4 py-2 rounded-full text-white bg-gray-800">Buy Now</div>
                    <div class="px-4 py-2 rounded-full border border-gray-200">Discord</div>
                </div>
            </div>
        </div>
        <div class="flex justify-center py-8 bg-cyan-400 text-white w-full">
            <div class="flex flex-col space-y-4 items-center w-full lg:max-w-5xl xl:max-w-6xl">
                <h2 class="text-4xl font-bold text-center">Every Tool You'll Need</h2>
                <div class="flex flex-wrap gap-4">
                    <div v-for="(tool, index) in tools" :key="tools" class="px-2 py-1 rounded bg-cyan-300 border border-transparent cursor-pointer hover:border-cyan-200">{{ tool }}</div>
                </div>
                <div class="rounded-xl w-1/2 py-32 bg-cyan-200 text-center">Pretend This is a Screenshot</div>
            </div>
        </div>
        <div class="flex justify-center py-8 bg-gray-800 text-white w-full">
            <div class="flex flex-col space-y-4 items-center w-full lg:max-w-5xl xl:max-w-6xl">
                <h2 class="text-4xl font-bold text-center">One Simple Price</h2>
                <h6>For everything you need</h6>
                <div class="flex flex-col px-8 py-4 rounded-xl bg-cyan-400 text-white">
                    <h1 class="text-4xl font-bold py-4">$10</h1>
                    <span class="font-bold text-lg">Whole Enchilada</span>
                    <span class="text-lg">Does exactly what it says it does</span>
                    <div class="rounded-full bg-white text-gray-800 font-bold text-center px-4 py-2 my-6">Buy</div>
                    <ul class="list-disc list-inside">
                        <li>iCreate Pro</li>
                        <li>Thing 2</li>
                        <li>Thing 3</li>
                        <li>Free Updates Forever</li>
                        <li>Discord Support</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex justify-center py-8 w-full">
            <div class="flex flex-col space-y-4 items-center w-full lg:max-w-5xl xl:max-w-6xl">
                <h2 class="text-4xl font-bold text-center">Frequently Asked Questions</h2>
                <h6>If you can't find an answer, join the Discord for support</h6>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="i in ['x','y','z','i','a','f(x)']" class="py-4">
                        <h4 class="font-bold text-xl">Does iCreate do {{ i }}?</h4>
                        <p>Yes, iCreate does {{ i }} so fucking good you won't believe your got damb eyes wholes</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full lg:max-w-5xl xl:max-w-6xl">
            <div class="flex justify-between border-t border-t-gray-200 py-8 text-gray-500">
                <div>Copyright &copy; 2022 Camila3141592654 (All Rights Reserved)</div>
                <div class="flex space-x-4">
                    <span class="cursor-pointer">Twitter</span>
                    <span class="cursor-pointer">Email</span>
                </div>
            </div>
        </div>
    </div>
</template>
