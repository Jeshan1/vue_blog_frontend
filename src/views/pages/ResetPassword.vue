
<template>
  <!-- Background image container -->
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: 'url(https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg)' }">
    <!-- Form container -->
    <div class="bg-slate-100 rounded text-left p-10 w-full max-w-md">
      <h2 class="text-xl font-bold text-blue-600">Reset Password</h2>
      <form @submit.prevent="resetPassword" class="my-5">
        <!-- Password Field -->
        <div class="relative flex items-center sm:col-span-2 my-4">
          <label for="password" class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Password</label>
          <input
            type="password"
            id="password"
            v-model="resetData.password"
            autocomplete="new-password"
            placeholder="Enter password"
            class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
            viewBox="0 0 128 128"
          >
            <path
              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
              data-original="#000000"
            ></path>
          </svg>
        </div>

        <!-- Password Confirmation Field -->
        <div class="relative flex items-center sm:col-span-2 my-4">
          <label class="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Password Confirmation</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="resetData.password_confirmation"
            required
            autocomplete="new-password"
            placeholder="Enter password"
            class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
            viewBox="0 0 128 128"
          >
            <path
              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
              data-original="#000000"
            ></path>
          </svg>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-blue-600 text-lg font-bold px-4 py-2 rounded hover:bg-blue-800 text-white w-full"
        >
          Reset Password
        </button>
      </form>
      <p v-if="message" class="mt-4 text-center">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast()

const route = useRoute()
const router = useRouter()
const resetData = reactive({
    password:'',
    password_confirmation:'',
    message:''
})

const resetPassword = async()=>{
    try {
        const token = route.params.token; // Get token from URL
        const response = await axios.post(`http://localhost:8000/api/reset-password/${token}`, {
          password: resetData.password,
          password_confirmation: resetData.password_confirmation,
        },{
            headers:{
                'Accept':'application/json'
            }
        });

        if (response.data.status === 'success') {
          resetData.message = response.data.message;
          toast.success(response.data.message)
          // Redirect to login page after successful reset
          router.push('/login');
        } else {
          resetData.message = response.data.message;
          toast.error(response.data.message)
        }
      } catch (error) {
        resetData.message = 'An error occurred. Please try again.';
        console.error(error);
    }
}
 
   

</script>

