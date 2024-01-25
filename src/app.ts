import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "@/app/config/router";
import vuetify from "./app/config/plugins/vuetify";
import "@/app/styles/style.scss";
import VueTablerIcons from "vue-tabler-icons";
import { maska } from "maska";
import "vue3-easy-data-table/dist/style.css";
import ApiService from "./services/api.service";
import Notifications from "@kyvg/vue3-notification";
import "vue-datepicker-next/index.css";
import "@/services/axios";

import { i18n } from "./app/config/i18n";
import VueScrollTo from "vue-scrollto";
import PerfectScrollbar from "vue3-perfect-scrollbar";
// @ts-ignore
import velocity from "velocity-animate";
import axios from "axios";

export const buildApp = () => {
  const app = createApp(App);
  const pinia = createPinia();

  ApiService.mount401Interceptor();
  app.directive("mask", maska);
  app.use(router);

  axios.defaults.headers.common["lang"] = (
    localStorage.getItem("lang") || "uz_cyrl"
  ).replace("_", "-");
  
  app.use(pinia);
  app.use(VueTablerIcons);
  app.use(Notifications, { velocity });
  app.use(vuetify);
  app.use(i18n);
  app.use(PerfectScrollbar);

  app.use(VueScrollTo, {
    duration: 1000,
    easing: "ease",
  });
  return { router, app, i18n, pinia };
};
