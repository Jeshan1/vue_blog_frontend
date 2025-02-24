<template>
  <header class="flex border-b py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[65px] tracking-wide relative z-50">
    <div class="flex flex-wrap justify-between items-center gap-4 mx-24 w-full">
      <a href="#" class="max-sm:hidden">
        <img src="logo.png" alt="logo" class="w-20 rounded-full" />
      </a>
      <a href="#" class="hidden max-sm:block">
        <img src="logo.png" alt="logo" class="w-8" />
      </a>

      <!-- Desktop & Mobile Menu -->
      <ul class="lg:flex lg:ml-14 lg:gap-x-5 max-lg:fixed max-lg:space-y-3 max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50"
        :class="{ 'max-lg:hidden': !isMenuOpen }">
        <!-- Mobile Logo -->
        <li class="mb-6 hidden max-lg:block">
          <a href="#"><img src="logo.png" alt="logo" class="w-20" /></a>
        </li>
        <!-- Menu Items -->
        <li v-for="item in menuItems" :key="item" class="max-lg:border-b max-lg:py-3 px-3">
          <router-link :to="{ path: item }" class="lg:hover:text-[#007bff] text-black block text-[15px]">
            {{ item.replace("/", "").toUpperCase() }}
          </router-link>

        </li>

        <!-- Login/Logout Button -->
        <button class="lg:hover:text-[#007bff] text-white px-2 rounded block text-[15px] bg-blue-600" v-if="!logValue" @click="redirectToLogin">Login</button>
        <button class="lg:hover:text-[#007bff] text-white px-2 rounded block text-[15px] bg-blue-600" v-else @click="logout">Logout</button>
        
      </ul>

      <!-- Mobile Menu Toggle Button -->
      <button @click="toggleMenu"
        class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border">
        <svg v-if="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-black"
          viewBox="0 0 320.591 320.591">
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
        </svg>
        <svg v-else class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>

      <!-- Search Bar -->
      <div class="">
        <div
          class="flex max-w-xl w-full bg-gray-100 px-4 py-2 rounded border focus-within:border-blue-600 focus-within:bg-transparent transition-all">
          <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Search something..."
            class="w-full text-sm bg-transparent rounded outline-none pr-2" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
            class="cursor-pointer fill-gray-400">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';


const store = useStore();
const router = useRouter();

const isMenuOpen = ref(false);
const menuItems = ["/home", "/contact", "/feature", "/blogs", "/about"];

const logValue = ref(!!localStorage.getItem("token"));

const logout = async () => {
  await store.dispatch("auth/logout");

  // Ensure the token is removed
  localStorage.removeItem("token");

  // Update reactive state
  logValue.value = false;

  // Redirect after logout
  router.push("/home");
};

watch(() => store.getters["auth/isAuthenticated"], (newVal) => {
  logValue.value = newVal;
});

const redirectToLogin = () => {
  router.push("/login")
}


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const searchQuery = ref('');

const handleSearch = () => {
  router.push({ path: '/blogs', query: { search: searchQuery.value || undefined } });
};

// Watch for URL changes and update input field
watch(() => router.currentRoute.value.query.search, (newSearch) => {
  searchQuery.value = newSearch || '';
});

// Set initial searchQuery value based on the current URL
onMounted(() => {
  searchQuery.value = router.currentRoute.value.query.search || '';
});
</script>
