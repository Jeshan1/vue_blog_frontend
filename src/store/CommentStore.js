import axios from 'axios'

export default {
    namespaced:true,
    state:{
        comments:[],
        loading:false,
        errorr:null
    },
    getters:{
        allComments:(state)=>state.comments,
        isLoading:(state)=>state.loading,
        isError:(state)=>state.errorr
    },
    mutations:{
        SET_COMMENTS(state,comments){
            state.comments = comments
        },
        SET_LOADING(state,isLoading){
            state.loading = isLoading
        },
        SET_ERROR(state,isError){
            state.error = isError
        },
        SET_REMOVE(state,id){
            state.comments = state.comments.filter((comment)=>comment.id!== id)
        }
    },
    actions:{
        async fetchComments({commit}){
            commit("SET_LOADING",true)
            try {
                const response = await axios.get('http://localhost:8000/api/comments',
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        },
                        withCredentials:true
                    }
                )

                commit("SET_COMMENTS", response.data.data.data)
                console.log(response.data.data.data)
                commit("SET_LOADING",false)
                console.log(response.data.data)
            } catch (error) {
                commit("SET_ERROR", error.message)
                console.log(error.message)
            }
        },

        async deleteComment({commit},id){
            try {
                const response = await axios.delete(`http://localhost:8000/api/comments/${id}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials:true
                })
                commit("SET_REMOVE", id)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}