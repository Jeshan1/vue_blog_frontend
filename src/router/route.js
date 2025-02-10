import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Dashboard from "../views/admin/pages/DashboardContent.vue";
import Category from "@/views/admin/pages/category/CategoryContent.vue";
import Blog from "@/views/admin/pages/blog/BlogContent.vue";
import Comment from "@/views/admin/pages/comments/CommentContent.vue";
import AdminLayout from "@/views/admin/AdminLayout.vue";
import Login from "@/views/pages/LoginPage.vue";
import Register from "@/views/pages/RegisterPage.vue";


const routes = [
    {
        path:'/login',
        name:'Login',
        component:Login
    },
    {
        path:'/register',
        name:'Register',
        component:Register
    },
    {
        path:'/admin',
        component:AdminLayout,
        meta:{requiresAuth:true, requiresAdmin:true},
        children:[
            {
                path:'dashboard',
                name:"Dashboard",
                component:Dashboard,
                meta:{requiresAuth:true, requiresAdmin:true},
            },
            {
                path:'categories',
                name:'Category',
                component:Category,
                meta:{requiresAuth:true, requiresAdmin:true}
            },
            {
                path:'blogs',
                name:'Blog',
                component:Blog,
                meta:{requiresAuth:true, requiresAdmin:true}
            },
            {
                path:'comments',
                name:'Comment',
                component:Comment,
                meta:{requiresAuth:true, requiresAdmin:true}
            }
        ]
    },
    
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

// function getUserRole(){
//     return localStorage.getItem('userRole')
// }
// function isAdmin(){
//     return getUserRole() === 'admin'
// }

// Global Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    const user = store.getters["auth/getUser"];
    const isAdmin = user?.role === "admin"; // Assuming user object has a "role" property
    if (to.meta.requiresAuth) {
        if (isAuthenticated) {
            if (to.meta.requiresAdmin && !isAdmin) {
                next("/login"); // Redirect non-admins to login
            } else {
                next();
            }
        } else {
            next("/login"); // Redirect unauthorized users to login
        }
    } else {
        next();
    }
});

export default router

