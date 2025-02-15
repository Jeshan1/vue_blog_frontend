<template>
    <div class="w-full py-5 flex flex-col items-center">
      <span class="text-md md:text-lg font-bold text-[#117278] flex items-center gap-1"><ion-icon name="heart-outline"></ion-icon>Our Insights</span>
      <h2 class="text-4xl sm:text-5xl md:text-7xl text-center chelsea-market-regular font-bold text-[#117278] md:mb-16 mb-10">Blogs Feeds</h2>

      <div class="px-4 md:px-[2rem] xl:px-[6rem] flex flex-col lg:flex-row gap-10 w-[60%]">
          <!-- col 1 -->
          <div class="lg:w-[80%] xl:w-[60%]">
              <!-- Blog Image -->
              <img class="w-full h-auto object-cover" :src="blogData.blog.image" alt="blog image">

              <div class="flex flex-col px-6 py-8 border-l border-r border-b">
                  <!-- Author & Category -->
                  <div class="flex gap-4 text-sm text-gray-700 font-semibold">
                  <span class="flex gap-1 items-center"><ion-icon name="person-outline"></ion-icon>By Admin</span>
                  <span v-for="category in blogData.blog.categories" :key="category.id" class="flex gap-1 items-center"><ion-icon class="-rotate-90" name="pricetags-outline"></ion-icon>{{ category.cat_name }}</span>
                  </div>
                  <!-- Blog Titile -->
                  <h3 class="text-2xl my-3 text-left md:text-3xl font-semibold text-teal-900 chelsea-market-regular">{{ blogData.blog.title}}</h3>
                  <!-- Blog Description -->
                  <p class="text-md my-3 text-left text-gray-500">{{ blogData.blog.description }}</p>
              </div>
            
          </div>


          <!-- col 2 -->
          <div class="w-[40%]">
            <h1 class="text-2xl font-bold text-blue-600 hover:text-blue-800 my-5">Recent Blogs</h1>
            <div class="flex flex-col sm:flex-row gap-6 pb-6 border-b-2 border-gray-100" v-for="recentBlog in formattedRecentBlogs" :key="recentBlog.id">
              <!-- Blog Date -->
              <div class="px-6 py-2 bg-yellow-500 text-white flex flex-col items-center justify-center">
                <span class="text-7xl font-semibold">{{ recentBlog.day }}</span>
                <span class="font-semibold">{{ recentBlog.month }}</span>
              </div>
              <!--  -->
              <div class="flex flex-col justify-between">
                <!-- Author & Category -->
                <div class="flex md:gap-4 gap-2 text-sm text-gray-700 font-semibold">
                  <span class="flex gap-1 items-center"><ion-icon name="person-outline"></ion-icon>By Admin</span>
                  <!-- <span class="flex gap-1 items-center" v-for="cat in recentBlog.categories" :key="cat.id"><ion-icon class="-rotate-90" name="pricetags-outline"></ion-icon>{{ cat.cat_name }}</span> -->
                </div>
                <!-- Blog Titile -->
                <h3 class="text-lg text-left md:text-lg font-semibold text-teal-900 capitalize chelsea-market-regular">{{ recentBlog.title }}</h3>
                <!-- Blog Description -->
                <p class="text-md text-gray-500">{{ recentBlog.description }}</p>
              </div>
            </div>
          </div>
  </div>
</div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const blogData = reactive({
    blog:{},
    recentBlogs:[]
})

// day and month computed and return by formatting 
const formattedRecentBlogs = computed(()=>{
  return blogData.recentBlogs.map((recent)=>{
  const date = new Date(recent.created_at)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[monthIndex];

  return {
    ...recent,
    day,
    month
  }
})
})


const fetchSingleBlog = async()=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/client/blogs/${route.params.id}`);
        const {blog,recentBlogs} = response.data
        blogData.blog = blog
        blogData.recentBlogs = recentBlogs
        console.log(response.data.data)
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(()=>{
    fetchSingleBlog()
})
</script>