<template>
    <div class="flex justify-start mx-5 my-4">
        <h1 class="text-xl font-bold text-blue-600">All Comments</h1>
    </div>
    <div class="font-sans overflow-x-auto my-2 mx-4">
        <div v-if="isLoading">Loading...</div>
        <div v-if="isError" class="text-red-500">{{ isError }}</div>
      <table class="min-w-full bg-white">
        <thead class="bg-gray-100 whitespace-nowrap">
          <tr>
            <th class="p-4 text-center text-xs font-semibold text-gray-800">
              Id
            </th>
            <th class="p-4 text-center text-xs font-semibold text-gray-800">
              Commenter
            </th>
            <th class="p-4 text-center text-xs font-semibold text-gray-800">
              Comment
            </th>
            <th class="p-4 text-center text-xs font-semibold text-gray-800">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="whitespace-nowrap">
          <tr class="hover:bg-gray-50" v-for="(comment,index) in getAllComments" :key="comment.id">
            <td class="p-4 text-[15px] text-gray-800">
              {{ index + 1 }}
            </td>
            <td class="p-4 text-[15px] text-gray-800">
              {{ comment.name }}
            </td>
            <td class="p-4 text-[15px] text-gray-800">
              {{ comment.comment }}
            </td>
            <td class="p-4">
              <button class="mr-4" title="Delete" @click="deleteComment(comment.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                  <path
                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    data-original="#000000" />
                  <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                    data-original="#000000" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>

import { computed, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
// const router = useRouter();

const getAllComments = computed(()=>store.getters["comment/allComments"])
const isLoading = computed(()=>store.getters["comment/isLoading"])
const isError = computed(()=>store.getters["comment/isError"])
console.log(getAllComments)

const getComments = async()=>{
    await store.dispatch("comment/fetchComments");
}

const deleteComment = async(id)=>{
    await store.dispatch("comment/deleteComment",id)
    await getComments()
}

onMounted(()=>{
    getComments()
})

</script>