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
              <a v-if="isLoginForm" href="#" class="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <div class="mt-6">
              <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {{ isLoginForm ? 'Sign In' : 'Register' }}
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
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const admin = computed(()=>store.getters["auth/isAdmin"])
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

  const action = isLoginForm.value ? "auth/login" : "auth/register"; // Ensure 'auth' is used if using namespaced modules
  const payload = isLoginForm.value
    ? { email: form.email, password: form.password }
    : { name: form.username, email: form.email, password: form.password };

  try {
    const response = await store.dispatch(action, payload);
    
    if (response.success == true) {
      if (admin.value) {
        router.push("/admin/dashboard")
      }
      else if(!admin.value){
        router.push("/home")
      }
      else{
        errorMessage.value = "Unauthorized role"
      }
    }
    else{
        errorMessage.value = response;
    }

  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

</script>