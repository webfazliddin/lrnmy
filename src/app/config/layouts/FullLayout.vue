<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useWindowScroll } from "@vueuse/core";
// import VerticalSidebarVue from "./vertical-sidebar/VerticalSidebar.vue";
// import VerticalHeaderVue from "./vertical-header/VerticalHeader.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useCustomizerStore } from "./store/customizer";

const customizer = useCustomizerStore();
const route = useRoute();
const { y } = useWindowScroll();

const headerIsElevated = computed(() => {
  return y.value > 10;
});
</script>

<template>
  <v-locale-provider>
    <v-app theme="ORANGE_THEME">
      <AppHeader :elevated="headerIsElevated" />
      <v-main class="mt-5">
        <v-container fluid class="page-wrapper pb-sm-15 pb-10">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <BaseBreadcrumb
              v-if="route.meta.pageTitle || route.meta.breadcrumbs"
              :title="$t(route.meta.pageTitle as string)"
              :breadcrumbs="route.meta.breadcrumbs"
            />

            <router-view  v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component  :is="Component"></component>
              </transition>
            </router-view>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
