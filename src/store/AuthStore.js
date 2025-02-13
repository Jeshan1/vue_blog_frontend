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

        logout({ commit }) {
            commit("LOGOUT");
        },
    },
};
