<template>
    <h1 class="mx-24 my-5 text-xl font-bold">All Blogs</h1>
    <div class="grid grid-cols-3 gap-4 mx-24">
      <div
        class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4"
        v-for="blog in blogData.blogs"
        :key="blog.id"
      >
        <div class="min-h-[256px]">
          <img :src="blog.image" class="w-full" />
        </div>
  
        <div class="p-6">
          <h3 class="text-gray-800 text-xl font-bold">{{ blog.title }}</h3>
          <p class="mt-4 text-sm text-gray-500 leading-relaxed">
            {{ blog.description }}
          </p>
          <router-link
            :to="'blog/' + blog.id"
            class="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600 inline-block"
          >
            View More
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { onMounted, reactive, watch } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  
  const blogData = reactive({
    blogs: [],
  });
  
  const fetchAllBlogs = async () => {
    try {
      const searchValue = route.query.search || "";
      let apiUrl = "http://localhost:8000/api/client/blogs"; // Default API for all blogs
  
      if (searchValue) {
        apiUrl = "http://localhost:8000/api/client/blogs/search"; // API for searched blogs
      }
  
      const response = await axios.get(apiUrl, {
        params: { search: searchValue }, // Pass the search query parameter
      });
  
      blogData.blogs = response.data.data; // Update the blogs data
      console.log("Fetched Blogs:", blogData.blogs); // Debugging: Log the fetched data
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };
  
  // Fetch blogs on component mount
  onMounted(() => {
    fetchAllBlogs();
  });
  
  // Watch for changes in the search query parameter
  watch(
    () => route.query.search,
    () => {
      fetchAllBlogs();
    }
  );
  </script>