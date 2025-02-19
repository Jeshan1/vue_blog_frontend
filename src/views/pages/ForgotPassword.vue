
<template>
  <!-- Background image container -->
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: 'url(https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg)' }">
    <!-- Form container -->
    <div class="bg-[whitesmoke] rounded text-left p-10 w-full max-w-md">
      <h2 class="text-xl font-bold text-blue-600">Forgot Password</h2>
      <form @submit.prevent="sendResetLink" class="my-5">
        <!-- Email Field -->
        <div class="relative flex items-center sm:col-span-2 my-4">
          <label for="email" class="text-[13px] bg-[whitesmoke] text-black absolute px-2 top-[-10px] left-[18px]">Email</label>
          <input
            type="email"
            id="email"
            v-model="resetData.email"
            required
            placeholder="Enter your email"
            class="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-blue-600 text-lg font-bold px-4 py-2 rounded hover:bg-blue-800 text-white w-full"
        >
          Send Reset Link
        </button>
      </form>
      <p v-if="message" class="mt-4 text-center">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {reactive} from 'vue'
import { useToast } from 'vue-toastification';

const toast = useToast()

const resetData = reactive({
    email:'',
    message:''
})

const sendResetLink = async()=>{
    try {
        const response = await axios.post('http://localhost:8000/api/send-reset-password-email', {
          email: resetData.email,
        },{
            headers:{
                'Accept':'application/json'
            }
        });

        if (response.data.status === 'success') {
          toast.success(response.data.message)
          resetData.message = response.data.message;
        } else {
          toast.error(response.data.message)
          resetData.message = response.data.message;
        }
      } catch (error) {
        resetData.message = 'An error occurred. Please try again.';
        toast.error(error.message)
        console.error(error);
      }
}
    
  
</script>