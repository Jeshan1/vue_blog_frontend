<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 my-5 mx-5">
    <!-- Card -->
    <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
      <div
        class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
      >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M4 3a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2H4zM13 3a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V5a2 2 0 00-2-2h-3zM4 12a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H4zM13 12a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3z"
        ></path>
      </svg>
      
      </div>
      <div>
        <p
          class="mb-2 text-sm font-medium text-white"
        >
          Total Categories
        </p>
        <p
          class="text-lg font-semibold text-white"
        >
          {{ allDatas.categories }}
        </p>
      </div>
    </div>
    <!-- Card -->
    <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
      <div
        class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
      >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M8 3a2 2 0 00-2 2v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V5a2 2 0 00-2-2H8zM6 9h8v6H6V9z"
        ></path>
      </svg>
      
      </div>
      <div>
        <p
          class="mb-2 text-sm font-medium text-white"
        >
          Total Blogs
        </p>
        <p
          class="text-lg font-semibold text-white"
        >
          {{ allDatas.blogs }}
        </p>
      </div>
    </div>
    <!-- Card -->
    <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
      <div
        class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          ></path>
        </svg>
      </div>
      <div>
        <p
          class="mb-2 text-sm font-medium text-white"
        >
          Total Comments
        </p>
        <p
          class="text-lg font-semibold text-white"
        >
          {{ allDatas.comments }}
        </p>
      </div>
    </div>
    <!-- Card -->
    <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
      <div
        class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-white">
          Total Contacts
        </p>
        <p
          class="text-lg font-semibold text-white"
        >
          {{ allDatas.contacts }}
        </p>
      </div>
    </div>
</div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore()

const allDatas = computed(()=>store.getters["DashboardStore/getDatas"])

const getDatas = async()=>{
    await store.dispatch("DashboardStore/fetchDatas")
}

onMounted(()=>{
    getDatas()
})
</script>