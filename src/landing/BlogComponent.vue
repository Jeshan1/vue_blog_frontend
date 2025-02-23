<template>
  <h1 class="mx-24 my-5 text-xl font-bold">All Blogs</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-24">
    <div
      class="bg-white shadow-lg rounded-lg overflow-hidden mx-auto w-full max-w-sm font-sans"
      v-for="blog in blogData.blogs"
      :key="blog.id"
    >
      <!-- Image Section with Proper Fit -->
      <div class="h-64 w-full">
        <img :src="blog.image" class="w-full h-full object-cover" />
      </div>

      <!-- Content Section -->
      <div class="p-6 text-left">
        <h3 class="text-gray-800 text-xl font-bold">{{ blog.title }}</h3>
        <p class="mt-4 text-sm text-gray-500 leading-relaxed">
          {{ blog.description.split(' ').slice(0, 20).join(' ') + '...' }}
        </p>
        <router-link
          :to="'blog/' + blog.id"
          class="mt-4 inline-block px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 transition"
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
      let apiUrl = "http://localhost:8000/api/client/blogs"; 
  
      if (searchValue) {
        apiUrl = "http://localhost:8000/api/client/blogs/search";
      }
  
      const response = await axios.get(apiUrl, {
        params: { search: searchValue }, 
      });
  
      blogData.blogs = response.data.data; 
      console.log("Fetched Blogs:", blogData.blogs); 
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