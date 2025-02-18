<template>
    <div class="mx-40 my-36 bg-[whitesmoke] p-5 text-left">
        <h2 class="text-xl font-bold text-blue-600">Forgot Password</h2>
        <form @submit.prevent="sendResetLink">
            <div class="my-3">
                <label for="email" class="text-xl font-bold">Email:</label>
                <input type="email" id="email" v-model="resetData.email" required class="block bg-white h-10 px-4 py-2 w-full outline-none rounded" />
            </div>
            <button type="submit" class="bg-blue-600 px-4 py-2 text-white rounded">Send Reset Link</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import axios from 'axios';
import {reactive} from 'vue'

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

        console.log(response)

        if (response.data.status === 'success') {
          resetData.message = response.data.message;
        } else {
          resetData.message = response.data.message;
        }
      } catch (error) {
        resetData.message = 'An error occurred. Please try again.';
        console.error(error);
      }
}
    
  
</script>