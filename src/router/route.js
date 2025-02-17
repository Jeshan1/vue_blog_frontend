import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Dashboard from "../views/admin/pages/DashboardContent.vue";
import Category from "@/views/admin/pages/category/CategoryContent.vue";
import Blog from "@/views/admin/pages/blog/BlogContent.vue";
import Comment from "@/views/admin/pages/comments/CommentContent.vue";
import AdminLayout from "@/views/admin/AdminLayout.vue";
import Login from "@/views/pages/LoginPage.vue";
import Register from "@/views/pages/RegisterPage.vue";
import Contact from "@/views/admin/pages/contacts/ContactContent.vue";
import LayoutPage from "@/landing/LayoutPage.vue";
import Home from "@/landing/HomeComponent.vue";
import SingleBlog from "@/landing/SingleBlog.vue";
import BlogClient from "@/landing/BlogComponent.vue";
import ContactComponent from "@/landing/ContactComponent.vue";

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
        path: "/",
        component: LayoutPage, // Ensure LayoutPage is always loaded
        children: [
            {
                path: "/home",
                name: "Home",
                component: Home,
                meta: { requiresAuth: false }, // Allow guests to access home
            },
            {
                path:"/blogs",
                name:"BlogClient",
                component:BlogClient,
                meta:{requiresAuth:false}
            },
            {
                path:"/blog/:id",
                component:SingleBlog,
                props:true,
                meta:{requiresAuth:false}
            },
            {
                path:'/contact',
                name:'ContactComponent',
                component:ContactComponent,
                meta:{requiresAuth:false}
            }
        ]
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
            },
            {
                path:'contacts',
                name:'Contact',
                component:Contact,
                meta:{requiresAuth:true, requiresAdmin:true}
            }
        ]
    },
    
]


const router = createRouter({
    history:createWebHistory(),
    routes
})


// Global Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    const user = store.getters["auth/getUser"];
    const isAdmin = user?.role === "admin"; 

    if (to.meta.requiresAuth) {
        if (isAuthenticated) {
            if (to.meta.requiresAdmin && !isAdmin) {
                next("/home"); // Redirect non-admins to home layout instead of login
            } else {
                next();
            }
        } else {
            // If the user logs out from the admin dashboard, send them to home instead of login
            if (from.path.startsWith("/admin")) {
                next(); 
            } else {
                next("/login"); 
            }
        }
    } else {
        next();
    }
});


export default router

