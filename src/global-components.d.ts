// Base components
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import SkeletonShimmerVue from "@/components/Loaders/SkeletonShimmer.vue";
import BaseBackButton from "@/components/Base/BaseBackButton.vue";

// Layout components
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppFooter from "@/components/Layout/AppFooter.vue";
import CourseCardVue from "@/components/Card/CourseCard.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    // Base components
    BaseButton: typeof BaseButton;
    BaseSpinner: typeof BaseSpinner;
    SkeletonShimmerVue: typeof SkeletonShimmerVue;
    BaseBackButton: typeof BaseBackButton;

    // Ui components
    AppHeader: typeof AppHeader;
    AppFooter: typeof AppFooter;
    CourseCardVue: typeof CourseCardVue;
  }
}
