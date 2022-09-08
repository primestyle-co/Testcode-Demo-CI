import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: "/",
        component: () =>
            import(
                /* webpackChunkName: "AuthLayout" */ "../layouts/AuthLayout.vue"
            ),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("../views/Home.vue"),
            },
            {
                path: "/posts",
                name: "posts",
                component: () => import("../views/post/List.vue"),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "posts/create",
                name: "posts_create",
                component: () => import("../views/post/Create.vue"),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "posts/:id",
                name: "post_update",
                component: () => import("../views/post/Create.vue"),
                props: true,
                meta: {
                    requiresAuth: true
                }
            },
        ],
    },
    {
        component: () => import("../layouts/GuestLayout.vue"),
        children: [
            {
                path: "/login",
                name: "login",
                component: () => import("../views/auth/Login.vue"),
                meta: {
                    requiresGuest: true
                }
            },
            {
                path: "/register",
                name: "register",
                component: () => import("../views/auth/Register.vue"),
                meta: {
                    requiresGuest: true
                }
            },
        ],
    },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.auth.login) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.state.auth.login) {
      next({ name: 'posts' })
    } else {
      next() // go to wherever I'm going
    }
  }  else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router;
