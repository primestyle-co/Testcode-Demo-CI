import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

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
        component: () =>
          import("../views/Home.vue"),
      },
      {
        path: "/posts",
        component: () =>
          import(
            "../views/post/List.vue"
          ),
      },
      {
        path: "posts/create",
        component: () =>
          import(
            "../views/post/Create.vue"
          ),
      },
      {
        path: "posts/:id",
        name: 'post_update',
        component: () =>
          import(
            "../views/post/Create.vue"
          ),
        props: true
      }
    ]
  },
  {
    component: () => import( "../layouts/GuestLayout.vue"),
    children: [
      {
        path: "/login",
        component: () =>
          import("../views/auth/Login.vue"),
      },
      {
        path: "/register",
        component: () =>
          import("../views/auth/Register.vue"),
      }
    ]
  },
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})


export default router;