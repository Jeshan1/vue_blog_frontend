<template>
    <div class="font-[sans-serif] p-4">
      <div class="max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(186,186,186,0.7)] rounded-3xl overflow-hidden">
        <div class="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-blue-400"></div>
        <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400"></div>

        <div class="grid md:grid-cols-2 gap-8 py-8 px-6">
          <div class="text-center flex flex-col items-center justify-center">
            <img src="https://readymadeui.com/signin-image.webp" class="shrink-0 aspect-[250/196] object-contain" />
          </div>

          <form @submit.prevent="submitForm" class="rounded-tl-3xl rounded-bl-3xl max-md:-order-1">
            <h2 class="text-2xl text-blue-600 font-bold text-center mb-6">Contact us</h2>
            <div class="max-w-md mx-auto space-y-3 relative">
              <input v-model="contactData.name" type='text' placeholder='Name'
                class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-none border border-gray-100 focus:border-blue-600 focus:bg-transparent transition-all" />
              <input v-model="contactData.email" type='email' placeholder='Email'
                class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-none border border-gray-100 focus:border-blue-600 focus:bg-transparent transition-all" />
              <input v-model="contactData.subject" type='text' placeholder='Write your subject...'
                class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-none border border-gray-100 focus:border-blue-600 focus:bg-transparent transition-all" />
              <textarea v-model="contactData.message" placeholder='Message' rows="6"
                class="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-none border border-gray-100 focus:border-blue-600 focus:bg-transparent transition-all"></textarea>

              <button type='submit'
                class="text-white w-full relative bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-6 py-3 !mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' class="mr-2 inline" viewBox="0 0 548.244 548.244">
                  <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast()

const contactData = reactive({
      name:"",
      email:"",
      subject:"",
      message:""
})

const submitForm = async()=>{
     try {
        const response = await axios.post("http://localhost:8000/api/client/contact",contactData);

        if(response.data.status == "success"){
            contactData.name = ""
            contactData.email = ""
            contactData.subject = ""
            contactData.message = ""
            toast.success(response.data.message, {
                position: "top-right", 
                timeout: 2000,
            });
        }
        else{
            toast.error(response.data.message, {
                position: "top-right", 
                timeout: 2000,
            });
        }
        
     } catch (error) {
        console.log(error.message)
        toast.error(error.message, {
                position: "top-right", 
                timeout: 2000,
            });
     }
}


</script>