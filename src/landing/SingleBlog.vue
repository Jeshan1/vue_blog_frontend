<template>
  <div class="w-full py-5 flex flex-col items-center">
    <span class="text-md md:text-lg font-bold text-[#117278] flex items-center gap-1">
      <ion-icon name="heart-outline"></ion-icon>Our Insights
    </span>
    <h2 class="text-4xl sm:text-5xl md:text-7xl text-center chelsea-market-regular font-bold text-[#117278] md:mb-16 mb-10">Blogs Feeds</h2>

    <div class="px-4 md:px-[2rem] xl:px-[6rem] flex flex-col lg:flex-row gap-10 w-[100%]">
      <!-- col 1 -->
      <div class="w-[60%]">
        <!-- Blog Image -->
        <img class="w-full h-auto object-cover" :src="blogData.blog.image" alt="blog image">

        <div class="flex flex-col px-6 py-8 border-l border-r border-b">
          <!-- Author & Category -->
          <div class="flex gap-4 text-sm text-gray-700 font-semibold">
            <span class="flex gap-1 items-center"><ion-icon name="person-outline"></ion-icon>By Admin</span>
            <span v-for="category in blogData.blog.categories" :key="category.id" class="flex gap-1 items-center">
              <ion-icon class="-rotate-90" name="pricetags-outline"></ion-icon>{{ category.cat_name }}
            </span>
          </div>
          <!-- Blog Title -->
          <div class="flex justify-between">
            <h3 class="text-2xl my-3 text-left md:text-3xl font-semibold text-teal-900 chelsea-market-regular">
              {{ blogData.blog.title }}
            </h3>
            <!-- Read Aloud Button -->
            <div>
              <button @click="readAloud" class="mt-4 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                🔊 Read Aloud
              </button>
              <button @click="downloadPdf" class="mt-4 p-2 ml-2 bg-red-600 text-white rounded-md hover:bg-teal-700">
                Download pdf
              </button>
            </div>
          </div>
          <!-- Blog Description -->
          <p class="text-md my-3 text-left text-gray-500">{{ blogData.blog.description }}</p>
          <div class="flex justify-between items-center gap-4 mt-4">
            <div>
                <input type="button" value="Like" @click="likeBlog" class="px-4  py-2 rounded-lg font-bold text-white bg-green-600" />
                  <span> 👍 Like {{ total.totalLikes }} </span>
                
                <input type="button" value="Dislike" @click="dislikeBlog" class="px-4 mx-2 py-2 rounded-lg font-bold text-white bg-red-600" />
                  <span> 👎 Dislike {{ total.totalDislikes }} </span>
            </div>
            <span>Views : {{ metadata.views }}</span>
          </div>
          <!-- Social Media Share Buttons -->
          <h1 class="text-xl font-bold text-blue-600 text-left">Share in social media</h1>
          <div class="flex gap-4 mt-6">
            <a :href="facebookShareUrl" target="_blank" class="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a :href="linkedinShareUrl" target="_blank" class="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
              </svg>
            </a>
          </div>
          <div class="my-4 text-left">
            <!-- Comment Form -->
            <h1 class="text-blue-500 text-lg font-semibold">Write a comment below:</h1>
            <form @submit.prevent="submitComment">
              <input
                v-model="commentForm.name"
                type="text"
                placeholder="Type your name...."
                class="w-full p-4 my-2 rounded-xl font-bold border-2 border-blue-600"
              />
              <p v-if="v$.name.$error" class="text-red-600">{{ getErrorMessage('name') }}</p>
              <textarea
                v-model="commentForm.comment"
                cols="30"
                rows="4"
                placeholder="Type your comments..."
                class="w-full p-4 rounded-xl font-bold border-2 border-blue-600"
              ></textarea>
              <p v-if="v$.comment.$error" class="text-red-600">{{ getErrorMessage('comment') }}</p>
              <button type="submit" class="text-lg font-bold px-4 py-2 rounded-xl bg-blue-600 text-white">
                Submit
              </button>
            </form>
          </div>
          <!-- Display Comments -->
          <div class="text-left">
            <h1 class="text-blue-600 font-bold mx-2">Valuable Comments:</h1>
            <div class="p-2 rounded-lg my-3">
              <div v-if="comments.length > 0">
                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="border-2 border-blue-600 my-2 p-2 rounded-lg"
                >
                  <p class="my-2 text-sm font-thin">"{{ comment.comment }}"</p>
                  <p class="text-sm font-semibold">
                    Comment by: <span class="text-fuchsia-600">{{ comment.name }}</span>
                  </p>
                </div>
              </div>
              <div v-else>
                <h1 class="text-red-600 text-xl font-bold">No Any Comments Found.</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- col 2 (Recent Blogs) -->
      <div class="w-[40%]">
        <h1 class="text-2xl font-bold text-blue-600 hover:text-blue-800 my-5">Recent Blogs</h1>
        <div class="flex flex-col sm:flex-row gap-6 pb-6 border-b-2 border-gray-100" v-for="recentBlog in formattedRecentBlogs" :key="recentBlog.id">
          <!-- Blog Date -->
          <div class="px-6 py-2 bg-yellow-500 text-white flex flex-col items-center justify-center">
            <span class="text-7xl font-semibold">{{ recentBlog.day }}</span>
            <span class="font-semibold">{{ recentBlog.month }}</span>
          </div>
          <!-- Blog Title and Description -->
          <div class="text-left">
              <router-link :to="'blog/' + recentBlog.id">
              <h3 class="text-lg text-left md:text-lg font-semibold text-teal-900 capitalize chelsea-market-regular">{{ recentBlog.title }}</h3>
              <p class="text-md text-gray-500 tex-left">{{ recentBlog.description.split(" ").slice(0,9).join(" ") + "..." }}</p>
              </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import useVuelidate from "@vuelidate/core";
import { required,minLength,maxLength } from "@vuelidate/validators";
import axios from "axios";
import { onMounted, reactive, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";


const toast = useToast();
const route = useRoute();

const blogData = reactive({
  blog: {},
  recentBlogs: [],
});

const commentForm = ref({
  name: "",
  comment: "",
});

const comments = ref([]);

// Use reactive for metadata
let metadata = reactive({
  views: 0,
  likes: 0,
  dislikes: 0,
});

const isAuthenticated = computed(() => !!localStorage.getItem("token"));

const formattedRecentBlogs = computed(() => {
  if (!blogData.recentBlogs || blogData.recentBlogs.length === 0) return [];
  return blogData.recentBlogs.map((recent) => {
    const date = new Date(recent.created_at);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[monthIndex];
    return {
      ...recent,
      day,
      month,
    };
  });
});

const facebookShareUrl = computed(() => {
  if (!blogData.blog.id) return "#";
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`http://localhost:8000/blogs/${blogData.blog.id}`)}`;
});

const linkedinShareUrl = computed(() => {
  if (!blogData.blog.id) return "#";
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`http://localhost:8000/blogs/${blogData.blog.id}`)}`;
});

const fetchSingleBlog = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/client/blogs/${route.params.id}`);
    const { blog, recentBlogs } = response.data;
    blogData.blog = blog;
    blogData.recentBlogs = recentBlogs;
  } catch (error) {
    toast.error("Failed to fetch blog details. Please try again later.");
    console.error(error.message);
  }
};

const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/client/comment/${route.params.id}`);
    if (response.data.status === 200) {
      comments.value = response.data.data;
    } else {
      toast.error("Failed to fetch comments.");
    }
  } catch (error) {
    toast.error("Error fetching comments.");
    console.error(error);
  }
};

const rules = {
  name:{required,minLength:minLength(3),maxLength:maxLength(20)},
  comment:{required,minLength:minLength(5),maxLength:maxLength(300)}
}

const getErrorMessage = (field) => {
  if (!v$.value[field].$dirty) return ""; // Don't show errors unless the field is touched
  if (v$.value[field].required.$invalid) return `${field === "name" ? "Name" : "Comment"} is required.`;
  if (v$.value[field].minLength.$invalid) return `${field === "name" ? "Name" : "Comment"} must be at least ${v$.value[field].minLength.$params.min} characters.`;
  if (v$.value[field].maxLength.$invalid) return `${field === "name" ? "Name" : "Comment"} must be less than ${v$.value[field].maxLength.$params.max} characters.`;
  return "";
};


const v$ = useVuelidate(rules,commentForm)

const submitComment = async () => {
  const isvalid = await v$.value.$validate()
  if (!isAuthenticated.value) {
    toast.error("You must be logged in to post a comment.");
    return;
  }
  if (!isvalid) {
    toast.error("Please correct the errors before submitting.");
    return;
  }
  try {
    const response = await axios.post(
      `http://localhost:8000/api/client/comment/${blogData.blog.id}`,
      commentForm.value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === 201) {
      toast.success(response.data.message);
      commentForm.value = { name: "", comment: "" };
      v$.value.$reset()
      fetchComments();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
};

const total = reactive({
   totalLikes:0,
   totalDislikes:0,
   totalViews:0
})

const fetchMetadata = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/client/blog/metadata/${route.params.id}`);
    total.totalLikes = response.data.total_likes,
    total.totalDislikes = response.data.total_dislikes,
    total.totalViews = response.data.total_views
  } catch (error) {
    toast.error("Failed to fetch metadata.");
    console.error(error);
  }
};

const incrementViews = async () => {
  try {
    const response = await axios.post(`http://localhost:8000/api/client/blog/view/${route.params.id}`);
    metadata.views += response.data.data; // Update views count
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
};

const likeStatus = ref(false);
const dislikeStatus = ref(false);

const likeBlog = async () => {
  if (!isAuthenticated.value) {
    toast.error("You must be logged in to like a blog.");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/api/client/blog/like/${route.params.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.status === 201) {
      likeStatus.value = true; // Mark the blog as liked
      metadata.likes = response.data.likes; // ✅ Correctly update likes count
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to like the blog.";
    toast.error(errorMessage);
    console.error("Error liking blog:", error.response?.data || error.message);
  }
};


const dislikeBlog = async () => {
  if (!isAuthenticated.value) {
    toast.error("You must be logged in to dislike a blog.");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/api/client/blog/dislike/${route.params.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.status === 201) {
      dislikeStatus.value = true; // Mark the blog as disliked
      metadata.dislikes = response.data.dislikes; // ✅ Correctly update dislikes count
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to dislike the blog.";
    toast.error(errorMessage);
    console.error("Error disliking blog:", error.response?.data || error.message);
  }
};


const readAloud = () => {
  if ("speechSynthesis" in window) {
    const text = blogData.blog.description;
    if (!text) {
      toast.error("No text available to read.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang.includes("en-US"));
    utterance.voice = selectedVoice || voices[0];
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  } else {
    toast.error("Sorry, your browser does not support text-to-speech.");
  }
};

const loadVoices = () => {
  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = () => {
      console.log("Voices updated.");
    };
  } else {
    console.warn("Speech synthesis not supported.");
  }
};

const downloadPdf = async() => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/client/blog/${route.params.id}/pdf`,
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "blog.pdf");
    document.body.appendChild(link);
    link.click();
    toast.success("PDF downloaded");
  } catch {
    toast.error("Failed to download PDF");
  }
}

const loading = ref(true); // Add a loading state

onMounted(async () => {
  try {
    await fetchSingleBlog();
    await fetchComments();
    await fetchMetadata();
    await incrementViews();
    loadVoices();
  } catch (error) {
    toast.error("An error occurred while loading the page.");
    console.error(error);
  } finally {
    loading.value = false; // Set loading to false once data is fetched
  }
});
</script>