import axios from "axios";


export default {
    namespaced:true,
    state: {
        categories:[],
        selectedCategory:null,
        loading:false,
        error:null
    },
    getters: {
        allCategories:(state)=>state.categories,
        selectedCategory:(state)=>state.selectedCategory,
        isLoading:(state)=>state.loading,
        isError:(state)=>state.error
    },
    mutations:{
        SET_CATEGORIES(state,categories){
            state.categories = categories
        },

        SET_SELECTED_CATEGORY(state, category){
            state.selectedCategory = category
        },
        UPDATE_CATEGORY(state, updatedCategory) {
            const index = state.categories.findIndex(cat => cat.id === updatedCategory.id);
            if (index !== -1) {
              state.categories[index] = updatedCategory;
            }
        },
        REMOVE_CATEGORY(state, categoryId){
            state.categories = state.categories.filter(category=>category.id != categoryId)
        }

    },
    actions:{
        async getCategories({commit}){
            commit("SET_LOADING", true)
            try {
                const response = await axios.get('http://localhost:8000/api/category',{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });
                commit("SET_CATEGORIES", response.data.data.data || [])
                commit("SET_ERROR", null)
                
            } catch (error) {
                console.error("Fetch error:", error.response?.data || error.message);
                commit("SET_ERROR", "Failed to fetch categories")
            }
            finally{
                commit("SET_LOADING", false)
            }
        },

        async addCategory({commit},categoryData){
            try {
                const response = await axios.post('http://localhost:8000/api/category',categoryData,
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                commit('SET_CATEGORIES', response.data.data);
    
                console.log("Added Data: ", response.data)
            } catch (error) {
                console.log(error)
            }
        },

        async deleteCategory({commit},catId){
            try {
                const response = await axios.delete(`http://localhost:8000/api/category/${catId}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })

                commit("REMOVE_CATEGORY", response.data.data)
            } catch (error) {
                console.log(error)
            }
        },

        async updateCategory({commit},updatedCategory){
            try {
                const response = await axios.put(`http://localhost:8000/api/category/${updatedCategory.id}`,updatedCategory,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                commit("UPDATE_CATEGORY", response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

    }
}