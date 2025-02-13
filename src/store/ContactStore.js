import axios from 'axios'

export default {
    namespaced:true,
    state:{
        contacts:[],
        loading:false,
        errorr:null
    },
    getters:{
        allContacts:(state)=>state.contacts,
        isLoading:(state)=>state.loading,
        isError:(state)=>state.errorr
    },
    mutations:{
        SET_CONTACTS(state,contacts){
            state.contacts = contacts
        },
        SET_LOADING(state,isLoading){
            state.loading = isLoading
        },
        SET_ERROR(state,isError){
            state.error = isError
        },
        SET_REMOVE(state,id){
            state.contacts = state.contacts.filter((contact)=>contact.id!== id)
        }
    },
    actions:{
        async fetchContacts({commit}){
            commit("SET_LOADING",true)
            try {
                const response = await axios.get('http://localhost:8000/api/contacts',
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        },
                        withCredentials:true
                    }
                )

                commit("SET_CONTACTS", response.data.data.data)
                console.log(response.data.data.data)
                commit("SET_LOADING",false)
                console.log(response.data.data)
            } catch (error) {
                commit("SET_ERROR", error.message)
                console.log(error.message)
            }
        },

        async deleteContact({commit},id){
            try {
                const response = await axios.delete(`http://localhost:8000/api/contacts/${id}`,{
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