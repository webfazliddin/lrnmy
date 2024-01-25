import { createRouter, createWebHistory } from "vue-router";
import MainRoutes from "./MainRoutes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/pages/Error.vue")
    },
    MainRoutes
  ]
});

// @ts-expect-error
router.beforeEach(async (to, from, next) => {
  next();
});
