<template>
  <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-5 rounded-md text-left">
      <h2 class="text-xl text-left">{{ isEditMode ? 'Edit Category' : 'Add Category' }}</h2>

      <!-- Input field for category name -->
      <div :class="{error:$v.newCategory.$errors.length}">
        <input v-model="newCategory" placeholder="Enter category name" class="border p-2 mb-3"/>
        <div v-for="error in $v.newCategory.$errors" :key="error.$uid">
            <p class="text-red-600 text-sm text-left">{{ error.$message }}</p>
        </div>
      </div>

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
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';

const toast = useToast()
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


// Validation
const rules = computed(() => ({
  newCategory: { required },
}));

const $v = useVuelidate(rules, { newCategory });

// Function to handle saving or updating the category
const saveCategory = async() => {
  const isValid = await $v.value.$validate();
  if (!isValid) {
    toast.error('Please fill all the required fields correctly.', { position: "top-right", timeout: 2000 });
    return;
  }
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
