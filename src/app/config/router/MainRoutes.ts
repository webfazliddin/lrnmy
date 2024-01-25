import { RouteRecordRaw } from "vue-router";
const MainRoutes: RouteRecordRaw = {
  path: "/main",
  component: () => import("@/app/config/layouts/FullLayout.vue"),
  children: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Dashboard",
      component: () => import("@/pages/dashboard.vue"),
      children: [
        {
          path: "",
          name: "HomePage",
          component: () => import("@/pages/HomePage.vue")
        },
        {
          name: "VideoPage",
          path: "/video-page",
          component: () => import("@/pages/VideoPage.vue")
        },
        {
          name: "VideoLesson",
          path: "/video-lesson",
          component: () => import("@/pages/VideoLesson.vue")
        }
      ]
    }
  ]
};

export default MainRoutes;
