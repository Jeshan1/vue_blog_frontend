import axios from "axios"

export default {
    namespaced:true,
    state:{
        datas:[],
        loading:false,
        error:null
    },
    getters:{
        getDatas:(state)=>state.datas,
        isLoading:(state)=>state.loading,
        isError:(state)=>state.error
    },
    mutations:{
        SET_DATAS(state,datas){
            state.datas = datas
        },
        SET_LOADING(state,loading){
            state.loading = loading
        },
        SET_ERROR(state,error){
            state.error = error
        }
    },
    actions:{
        async fetchDatas({commit}){
            commit("SET_LOADING",true)
            try {
                const response = await axios.get("http://localhost:8000/api/dashboard",{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials:true
                })

                commit("SET_DATAS", response.data.data)
                console.log(response.data.data)
            } catch (error) {
                commit("SET_ERROR",error.message)
            }
        }
    }
}