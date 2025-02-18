<template>
    <div>
      <h2>Reset Password</h2>
      <form @submit.prevent="resetPassword">
        <div>
          <label for="password">New Password:</label>
          <input type="password" id="password" v-model="resetData.password" required />
        </div>
        <div>
          <label for="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            v-model="resetData.password_confirmation"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';

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
          // Redirect to login page after successful reset
          router.push('/login');
        } else {
          resetData.message = response.data.message;
        }
      } catch (error) {
        resetData.message = 'An error occurred. Please try again.';
        console.error(error);
    }
}
 
   

</script>

