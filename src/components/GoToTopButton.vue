<template>
    <div class="fixed bottom-10 right-10">
        <button  @click="ScrollToTop" class="bg-blue-600 text-xl font-bold rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" class="text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7-7-7 7"></path>
            </svg>
        </button>
    </div>
</template>

<script setup>
const ScrollToTop = ()=>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}
</script>