<template>
    <div class="bg-gray-800 text-white flex items-center justify-end p-4 fixed top-0 right-0 left-[250px]">
      <!-- Right side: User Info & Dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full" >
          User
        </button>
        
        <!-- Dropdown Menu -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
          <ul class="cursor-pointer bg-white p-4">
            <a class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">Logout</a>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  
  const store = useStore()
  const router = useRouter()
  
  const showDropdown = ref(false)
  
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }
  
  const logout = () => {
    store.dispatch("auth/logout")
    router.push("/login")
  }
  </script>
  
 
  