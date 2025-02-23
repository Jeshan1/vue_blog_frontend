<template>
  <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-5 rounded-md text-left w-[80%]">
      <h2 class="text-xl text-left mb-4">{{ isEditMode ? 'Edit Blog' : 'Add Blog' }}</h2>
       <!-- Error Message Display -->
       <div v-if="props.error" class="bg-red-200 text-red-800 p-2 mb-3 rounded">
          <span>{{ props.error }}</span>
        </div>
       <!-- Title Input -->
       <input
        v-model="blogData.title"
        placeholder="Enter blog title"
        class="border p-2 w-full mb-3"
      />
      <span v-if="errorMessages.title" class="text-red-500 text-sm">{{ errorMessages.title }}</span>

      <!-- Description Input -->
      <Editor
        api-key="5q6j2krzvx5bp70hskm111h9iggk6bj2brxjm9mxiwv5hr2v"
        v-model="blogData.description"
        :init="editorConfig"
        class="mb-3"
      />
      <span v-if="errorMessages.description" class="text-red-500 text-sm">{{ errorMessages.description }}</span>

      <!-- Category Selection (Multi-Select) -->
      <label class="block font-semibold">Select Categories:</label>
      <select v-model="blogData.categories" multiple class="border p-2 w-full mb-3">
        <option v-for="category in props.categories" :key="category.id" :value="category.id">
          {{ category.cat_name }}
        </option>
      </select>
      <span v-if="errorMessages.categories" class="text-red-500 text-sm">{{ errorMessages.categories }}</span>

      <!-- Image Upload -->
      <input 
        type="file" 
        @change="handleImageUpload"
        class="border p-2 w-full mb-3"
      />

      <!-- Action Buttons -->
      <div class="flex justify-between">
        <button
          @click="saveBlog"
          class="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {{ isEditMode ? 'Update' : 'Save' }}
        </button>
        <button
          @click="closeModal"
          class="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, computed, reactive} from 'vue';
import Editor from '@tinymce/tinymce-vue'
// Props to control modal visibility, the blog being edited, and available categories
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  blogToEdit: {
    type: Object,
    default: null, // Holds the blog object for editing
  },
  categories: {
    type: Array,
    required: true, 
  },
  error: {
    type:String,
    default:null
  }, // Accept error message as a string
});

// Emit events to close the modal, add a blog, or update a blog
const emit = defineEmits(['close', 'addBlog', 'updateBlog']);

// Local state for the blog form
const blogData = reactive({
  title: "",
  description: "",
  image: null, // Store selected image
  categories: [], // Array to hold selected category IDs
});

// Local state for error messages
const errorMessages = reactive({
  title: "",
  description: "",
  categories: "",
});

// TinyMCE Configuration
const editorConfig = {
  height: 300,
  menubar: false,
  plugins: 'lists link code',
  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
};


// Computed property to check if we're editing an existing blog
const isEditMode = computed(() => props.blogToEdit !== null);

// Watch for changes in `blogToEdit` and update the form
watch(
  () => props.blogToEdit,
  (newBlogToEdit) => {
    if (newBlogToEdit) {
      blogData.title = newBlogToEdit.title;
      blogData.description = newBlogToEdit.description;
      blogData.categories = newBlogToEdit.categories ? newBlogToEdit.categories.map(cat => cat.id) : [];
       // Preserve existing image but allow updates
       blogData.image = null; // Ensure file input starts empty
      blogData.existingImage = newBlogToEdit.image; // Store existing image URL separately
    }
  },
  { immediate: true } // Ensures it runs on initial mount if there's an edit
);

// Handle image selection
const handleImageUpload = (event) => {
  blogData.image = event.target.files[0];
};

// Function to handle saving or updating the blog
const saveBlog = () => {
  // Clear previous errors
  errorMessages.title = "";
  errorMessages.description = "";
  errorMessages.categories = "";

  // Form validation
  if (!blogData.title) {
    errorMessages.title = "Title is required.";
  }
  if (!blogData.description) {
    errorMessages.description = "Description is required.";
  }
  if (blogData.categories.length === 0) {
    errorMessages.categories = "Please select at least one category.";
  }

  //If there are errors, stop further processing
  if (errorMessages.title || errorMessages.description || errorMessages.categories) {
    return;
  }

      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('description', blogData.description);
      formData.append('categories', JSON.stringify(blogData.categories));

      if (blogData.image instanceof File) {
        formData.append('image', blogData.image); // Append new file if selected
      } else if (blogData.existingImage) {
        formData.append('existingImage', blogData.existingImage); // Send existing image URL
      }

      if (isEditMode.value) {
        emit('updateBlog', { ...props.blogToEdit, ...blogData });
      } else {
        emit('addBlog', formData);
      }

      closeModal();
  
};

// Function to close the modal
const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
/* Add any modal styles if needed */
</style>
