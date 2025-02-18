import axios from "axios";

export default {
  namespaced: true,
  state: {
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: []
  },
  getters: {
    allBlogs: (state) => state.blogs,
    selectedBlog: (state) => state.selectedBlog,
    isLoading: (state) => state.loading,
    isError: (state) => state.error
  },
  mutations: {
    SET_BLOGS(state, blogs) {
      state.blogs = blogs;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SELECTED_BLOG(state, blog) {
      state.selectedBlog = blog;
    },
    UPDATE_BLOG(state, updatedBlog) {
      const index = state.blogs.findIndex((blog) => blog.id === updatedBlog.id);
      if (index !== -1) {
        state.blogs[index] = updatedBlog;
      }
    },
    REMOVE_BLOG(state, blogId) {
      state.blogs = state.blogs.filter((blog) => blog.id !== blogId);
    },
    ADD_BLOG(state, blog) {
      state.blogs.push(blog);
    }
  },
  actions: {
    async getBlogs({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await axios.get("http://localhost:8000/api/blog", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        commit("SET_BLOGS", response.data.data.data || []);
        commit("SET_ERROR", null);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
        commit("SET_ERROR", "Failed to fetch blogs");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addBlog({ commit }, blogData) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/blog",
          blogData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        commit("ADD_BLOG", response.data.data);
        console.log(response.data.message)
      } catch (error) {
        console.error(error);
        const errorData = error.response.data
        commit("SET_ERROR",errorData.message)
      }
    },

    async deleteBlog({ commit }, blogId) {
      try {
        await axios.delete(`http://localhost:8000/api/blog/${blogId}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        commit("REMOVE_BLOG", blogId);
      } catch (error) {
        console.error(error);
      }
    },

    async updateBlog({ commit },{id,formData}) {
      if (!id) {
        console.error("Missing blog ID!");
        return;
      }

      try {
        for(var pair of formData.entries()){
          console.log(pair[0],pair[1])
        }
        const response = await axios.post(
          `http://localhost:8000/api/blog/${id}`,formData,{
            headers:{
              'Authorization':`Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials:true
          }
        );
        commit("UPDATE_BLOG", response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  }
};