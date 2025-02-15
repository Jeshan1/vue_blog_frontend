<template>
    <div class="my-10 mx-24">
         <Carousel :value="blogData.blogs" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000" class="my-4">
             <template #item="slotProps">
                 <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif]">
                     <div class="h-[256px] w-full overflow-hidden">
                         <img :src="slotProps.data.image" class="w-full h-full object-cover" />
                     </div>
                     <div class="p-6">
                         <h3 class="text-gray-800 text-xl font-bold">{{ slotProps.data.title }}</h3>
                         <p class="mt-4 text-sm text-gray-500 leading-relaxed">{{ slotProps.data.description }}</p>
                         <router-link :to="'blog/' + slotProps.data.id">
                            <button type="button" class="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
                             View
                            </button>
                         </router-link>
                     </div>
                 </div>
             </template>
         </Carousel>
    </div>
 </template>
 
 <script setup>
 import Carousel from 'primevue/carousel';
 import axios from "axios";
 import { onMounted, reactive } from 'vue';
 
 const blogData = reactive({
     blogs: []
 });
 
 const fetchAllBlogs = async () => {
     try {
         const response = await axios.get("http://localhost:8000/api/client/blogs");
         blogData.blogs = response.data.data;
         console.log(response.data.data);
     } catch (error) {
         console.log(error.message);
     }
 };
 
 onMounted(() => {
     fetchAllBlogs();
 });
 </script>
 