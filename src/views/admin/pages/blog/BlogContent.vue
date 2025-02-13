<template>
    <div class="flex justify-between p-5">
        <h1 class="text-xl font-bold">Blogs</h1>
        <button @click="openAddModal" class="bg-blue-600 text-xl font-bold px-4 py-2 rounded text-white hover:bg-blue-800 outline-none border-no">Add Blog</button>
    </div>
    <div class="font-[sans-serif] overflow-x-auto">
      <div v-if="isLoading">Loading...</div>
     <div v-if="isError" class="text-red-500">{{ isError }}</div>
      <table class="min-w-full bg-white mx-4">
        <thead class="bg-gray-800 whitespace-nowrap">
          <tr>
            <th class="p-4 text-center text-sm font-medium text-white">
              Id
            </th>
            <th class="p-4 text-center text-sm font-medium text-white">
              Blog Title
            </th>
            <th class="p-4 text-center text-sm font-medium text-white">
              Blog Description
            </th>
            <th class="p-4 text-center text-sm font-medium text-white">
              Categories
            </th>
            <th class="p-4 text-center text-sm font-medium text-white">
              Image
            </th>
            <th class="p-4 text-center text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="whitespace-nowrap">
          <tr class="even:bg-blue-50 py-4" v-for="(blog,index) in allBlogs" :key="blog.id">
            <td class="p-4 text-sm text-black flex-1">
              {{ index + 1 }}
            </td>
            <td class="p-4 text-sm text-black flex-1">
              {{ blog.title }}
            </td>
            <td class="p-4 text-sm text-black flex-1">
              {{ blog.description }}
            </td>
            <td class="text-sm text-black">
               <span v-for="category in blog.categories" :key="category.id">{{ category.cat_name }},</span> 
              
            </td>
            <td class="p-4 text-sm text-black text-cener table m-auto">
              <img :src="blog.image" alt="Blog Image" class="w-32 h-32">
            </td>
            <td class="p-4">
              <button class="mr-4" title="Edit" @click="openEditModal(blog)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-blue-500 hover:fill-blue-700"
                  viewBox="0 0 348.882 348.882">
                  <path
                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                    data-original="#000000" />
                  <path
                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                    data-original="#000000" />
                </svg>
              </button>
              <button class="mr-4" title="Delete" @click="handleDeleteBlog(blog.id)">
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
      <BlogModal
            :isOpen="isModalOpen"
            :blogToEdit="blogToEdit"
            @close="closeModal"
            @addBlog="handleAddBlog"
            @updateBlog="handleUpdateBlog"
            :categories="allCategories"
        />

    </div>
</template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useToast } from "vue-toastification";
  import BlogModal from "./BlogModal.vue";
  
  const store = useStore();
  const toast = useToast();
  
  const isModalOpen = ref(false);
  const blogToEdit = ref(null);
  
  // Computed properties
  const allBlogs = computed(() => store.getters["blog/allBlogs"]);
  const isLoading = computed(() => store.getters["blog/isLoading"]);
  const isError = computed(() => store.getters["blog/isError"]);
  const allCategories = computed(()=>store.getters["category/allCategories"])
  
  // Fetch blogs on mount
  onMounted(() => {
    store.dispatch("blog/getBlogs");
  });

  //open add modal
  const openAddModal = () => {
    isModalOpen.value = true;
    blogToEdit.value = null; // Reset to null
};

  // Open Edit Modal
  const openEditModal = (blog) => {
    blogToEdit.value = blog;
    isModalOpen.value = true;
  };
  
  // Close Modal
  const closeModal = () => {
    isModalOpen.value = false;
    blogToEdit.value = ""
  };
  
  // Add Blog
  const handleAddBlog = async (blogData) => {
    try {
      await store.dispatch("blog/addBlog", blogData);
      toast.success("Blog Added Successfully");
      store.dispatch("blog/getBlogs");
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };
  
//   Delete Blog
  const handleDeleteBlog = async (id) => {
    try {
      await store.dispatch("blog/deleteBlog", id);
      toast.success("Blog Deleted Successfully");
      store.dispatch("blog/getBlogs");
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  // Update Blog
  const handleUpdateBlog = async (updatedBlog) => {
    try {
        if (!updatedBlog.id) {
            console.error("Blog ID is undefined!");
            toast.error("Invalid Blog ID");
            return;
        }

        if (!updatedBlog.title || !updatedBlog.description) {
            console.error("Title or Description is missing!");
            toast.error("Title and Description are required.");
            return;
        }
        
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Trick Laravel into treating this as a PUT request
        formData.append('title', updatedBlog.title);
        formData.append('description', updatedBlog.description);
        formData.append('categories', JSON.stringify(updatedBlog.categories));

        if (updatedBlog.image && typeof updatedBlog.image !== "string" && updatedBlog.image instanceof File) {
            formData.append('image', updatedBlog.image);
        }

        console.log("Updating blog with ID:", updatedBlog.id); // Debugging

        await store.dispatch("blog/updateBlog", {
            id: updatedBlog.id,
            formData: formData, // Now includes _method=PUT
        });

        toast.success("Blog Updated Successfully");
        store.dispatch("blog/getBlogs");
    } catch (error) {
        console.error("Error updating blog:", error);
        toast.error(error.message);
    }
  }

  </script>
  