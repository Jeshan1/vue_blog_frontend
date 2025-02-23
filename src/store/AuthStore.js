import axios from "axios";

export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null, // Store user in localStorage
        token: localStorage.getItem("token") || null,
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        isAdmin: (state) => state.user?.role === "admin", // Admin check
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        LOGOUT(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post("http://localhost:8000/api/login", credentials);
                const { token, user } = response.data;
                commit("SET_USER", user);
                commit("SET_TOKEN", token);
                return { success: true };
            } catch (error) {
                if (error.response) {
                    // Server responded with an error
                    return { success: false, message: error.response.data.message || "Login failed" };
                } else if (error.request) {
                    // No response was received from the server
                    return { success: false, message: "No response from server" };
                } else {
                    // Something went wrong while setting up the request
                    return { success: false, message: "An error occurred during login" };
                }
               
            }
        },

        async register({ commit }, userData) {
            try {
                const response = await axios.post("http://localhost:8000/api/register", userData);
                const { token, user } = response.data;
                commit("SET_USER", user);
                commit("SET_TOKEN", token);
                return { success: true };
            } catch (error) {
                return { success: false, message: error.response?.data?.message || "Registration failed" };
            }
        },

        async logout({ commit, state }) {
            try {
                await axios.post("http://localhost:8000/api/logout", {}, {
                    headers: {
                        Authorization: `Bearer ${state.token}` // Send token for authentication
                    }
                });
        
                commit("LOGOUT"); // Clear user state after successful logout
            } catch (error) {
                console.error("Logout error:", error.response?.data || error.message);
            }
        },

        // Add Google login action
        async googleLogin({ commit }, token) {
            try {
              const response = await axios.get("http://localhost:8000/api/auth/google/callback", { token });
              
              if (response.data && response.data.token && response.data.user) {
                const { token: authToken, user } = response.data;
              
                // Commit the user and token to Vuex store
                commit("SET_USER", user);
                commit("SET_TOKEN", authToken);
              
                // Optionally store token and user in localStorage as well
                localStorage.setItem("token", authToken);
                localStorage.setItem("user", JSON.stringify(user));
              
                return { success: true };
              } else {
                return { success: false, message: "Invalid response from server" };
              }
            } catch (error) {
              console.error("Error during Google login:", error);
              return { success: false, message: error.response?.data?.message || "Google login failed" };
            }
          }
          
     
    },
};
