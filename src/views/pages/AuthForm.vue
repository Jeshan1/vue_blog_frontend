<template>
  <div class="font-[sans-serif]">
    <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div class="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div class="border border-gray-300 rounded-lg p-6 max-w-md shadow-lg max-md:mx-auto">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="mb-8">
              <h3 class="text-gray-800 text-3xl font-bold">{{ formTitle }}</h3>
              <p class="text-gray-500 text-sm mt-4">{{ formDescription }}</p>
            </div>

            <div v-if="!isLoginForm">
              <label class="text-gray-800 text-sm mb-2 block text-left">User name</label>
              <input v-model="form.username" type="text" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Enter user name" />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block text-left">Email</label>
              <input v-model="form.email" type="email" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Enter email" />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block text-left">Password</label>
              <input v-model="form.password" type="password" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Enter password" />
            </div>

            <div v-if="!isLoginForm">
              <label class="text-gray-800 text-sm mb-2 block text-left">Confirm Password</label>
              <input v-model="form.confirmPassword" type="password" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Confirm password" />
            </div>

            <div class="flex justify-between text-sm">
              <router-link v-if="isLoginForm" to="/forgot-password" class="text-blue-600 hover:underline">Forgot password?</router-link>
            </div>

            <div class="mt-6">
              <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {{ isLoginForm ? 'Sign In' : 'Register' }}
              </button>
              <button @click="googleLogin" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 my-2">
                Sign In With Google
              </button>
            </div>

            <p class="text-sm text-center text-gray-500 mt-4">
              {{ isLoginForm ? "Don't have an account?" : "Already have an account?" }}
              <a href="#" class="text-blue-600 font-semibold hover:underline ml-1" @click.prevent="toggleForm">
                {{ isLoginForm ? 'Register here' : 'Sign in' }}
              </a>
            </p>
          </form>
        </div>

        <div class="max-md:mt-8">
          <img src="https://readymadeui.com/login-image.webp" class="w-full object-cover" alt="Auth Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted,watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
// import { useToast } from "vue-toastification";

// const toast = useToast();
const store = useStore();
const router = useRouter();
const admin = computed(() => store.getters["auth/isAdmin"]);
const isLoginForm = ref(true);
const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const errorMessage = ref("");

const formTitle = computed(() => (isLoginForm.value ? "Sign In" : "Register"));
const formDescription = computed(() =>
  isLoginForm.value
    ? "Sign in to your account and explore a world of possibilities."
    : "Create an account to start your journey with us."
);

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
  errorMessage.value = "";
};

const handleSubmit = async () => {
  if (!isLoginForm.value && form.password !== form.confirmPassword) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  const action = isLoginForm.value ? "auth/login" : "auth/register";
  const payload = isLoginForm.value
    ? { email: form.email, password: form.password }
    : { name: form.username, email: form.email, password: form.password };

  try {
    const response = await store.dispatch(action, payload);

    if (response.success) {
      if (admin.value) {
        router.push("/admin/dashboard");
      } else {
        router.push("/home");
      }
    } else {
      errorMessage.value = response.message || "An error occurred";
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    errorMessage.value = "An error occurred. Please try again.";
  }
};


const googleLogin = () => {
  window.location.href = "http://localhost:8000/api/auth/google";
};

const handleRedirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const user = urlParams.get("user");

  if (token && user) {
    try {
      // Decode the user string from URL-encoded format
      const decodedUser = JSON.parse(decodeURIComponent(user));
      
      // Save the token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      // Optionally, you can set the axios default authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Optionally, clean up the URL (remove token and user)
      window.history.replaceState({}, "", window.location.pathname);

      // Redirect to the home page
      router.push("/home");
    } catch (error) {
      console.error("Error decoding user or token:", error);
    }
  }
};




onMounted(() => {
  handleRedirect();
});

watch(() => window.location.search, () => {
  handleRedirect();
});

</script>