<template>
    <div class="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 px-10 py-20 sm:py-20 font-[sans-serif]">
      <div class="max-w-screen-xl mx-auto text-center text-white">
        <h1 class="text-5xl max-sm:text-3xl font-extrabold leading-tight mb-6">Welcome to Our Blog App</h1>
        <p class="text-lg mb-12">Proven strategies, expert insights, and the latest trends in marketing and growth.</p>
        <button type="button" class="bg-blue-600 text-white text-lg tracking-wide px-8 py-2.5 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl">Get Started</button>
      </div>
    </div>

    <div> 
        <h1 class="text-2xl font-bold text-blue-600 my-5">Our Recent Blogs</h1>
        <SliderComponent />
    </div>

</template>

<script setup>
import SliderComponent from "@/components/SliderComponent.vue";

</script>