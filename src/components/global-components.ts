import type { App } from "vue";

// UI components
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppFooter from "@/components/Layout/AppFooter.vue";
import CourseCardVue from "@/components/Card/CourseCard.vue";

// Base components
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import BaseBackButton from "@/components/Base/BaseBackButton.vue";

//Loaders
import SkeletonShimmerVue from "@/components/Loaders/SkeletonShimmer.vue";

export default {
  install(app: App): void {
    // Configure some parameters before installing components

    // Register global components here
    app.component("AppHeader", AppHeader);
    app.component("AppFooter", AppFooter);
    app.component("CourseCardVue", CourseCardVue);

    app.component("BaseButton", BaseButton);
    app.component("BaseSpinner", BaseSpinner);
    app.component("BaseBackButton", BaseBackButton);

    app.component("SkeletonShimmerVue", SkeletonShimmerVue);
  }
};
