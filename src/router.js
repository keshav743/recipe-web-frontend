import { createRouter, createWebHistory } from "vue-router";

import AuthPage from "./pages/AuthPage.vue";
import HomePage from "./pages/HomePage.vue";

import LoginForm from "./components/LoginForm.vue";
import SignupForm from "./components/SignupForm.vue";

import RecipePage from "./components/RecipePage.vue";
import AllRecipes from "./components/AllRecipes.vue";
import NewRecipe from "./components/NewRecipe.vue";
import EditRecipe from "./components/EditRecipe.vue";
import MyRecipes from "./components/MyRecipes.vue";
import SearchRecipe from "./components/SearchRecipe.vue";

import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      redirect: "/auth/login",
      component: AuthPage,
      children: [
        {
          path: "login",
          component: LoginForm,
          meta: { requiresUnauth: true },
        },
        {
          path: "signup",
          component: SignupForm,
          meta: { requiresUnauth: true },
        },
      ],
    },
    {
      path: "/recipes",
      component: HomePage,
      redirect: "/recipes/all",
      children: [
        { path: "all", component: AllRecipes, meta: { requiresAuth: true } },
        { path: "new", component: NewRecipe, meta: { requiresAuth: true } },
        {
          path: "search",
          component: SearchRecipe,
          meta: { requiresAuth: true },
        },
        { path: "mine", component: MyRecipes, meta: { requiresAuth: true } },
        {
          path: "edit/:recipeId",
          props: true,
          component: EditRecipe,
          meta: { requiresAuth: true, checkForUserPermission: true },
        },
        {
          path: ":id",
          props: true,
          component: RecipePage,
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: "/", meta: { requiresAuth: true }, redirect: "/recipes" },
    {
      path: "/*",
      redirect: "/recipes/all",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresUnauth) {
    if (store.getters.token != null) {
      console.log("Requires Authentication");
      return next({ path: "/recipes/all" });
    }
  }
  if (to.meta.requiresAuth) {
    if (store.getters.token == null) {
      console.log("Requires Authentication");
      return next({ path: "/auth" });
    }
  }
  next();
});

export default router;
