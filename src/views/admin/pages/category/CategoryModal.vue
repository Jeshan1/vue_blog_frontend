<template>
    <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-5 rounded-md text-left">
        <h2 class="text-xl text-left">{{ isEditMode ? 'Edit Category' : 'Add Category' }}</h2>
  
        <!-- Input field for category name -->
        <input
          v-model="newCategory"
          placeholder="Enter category name"
          class="border p-2 mb-3"
        />
  
        <div class="flex justify-between">
          <button
            @click="saveCategory"
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
  import { defineProps, defineEmits, ref, watch, computed } from 'vue';
  
  // Props to control visibility of modal and the category to be edited
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    categoryToEdit: {
      type: Object,
      default: null, // For edit mode, the category to edit
    },
  });
  
  // Emit events to close the modal and add or update category
  const emit = defineEmits(['close', 'addCategory', 'updateCategory']);
  
  // Local state for the category name
  const newCategory = ref('');
  
  // Determine whether we are in edit mode
  const isEditMode = computed(() => props.categoryToEdit !== null);
  
  // Watch for categoryToEdit prop and update the form
  watch(
    () => props.categoryToEdit,
    (newCategoryToEdit) => {
      if (newCategoryToEdit) {
        newCategory.value = newCategoryToEdit.cat_name;
      }
    }
  );
  
  // Function to handle saving or updating the category
  const saveCategory = () => {
    if (newCategory.value.trim()) {
      if (isEditMode.value) {
        emit('updateCategory', {
          ...props.categoryToEdit,
          cat_name: newCategory.value,
        });
      } else {
        emit('addCategory', { cat_name: newCategory.value });
      }
      newCategory.value = ''; // Reset the input after saving
      closeModal();
    }
  };
  
  // Function to close the modal
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  /* Add any styles for modal here */
  </style>
  