import { ref } from "vue";

export const useAppUrl = () => {
  const STS_DOMAIN = ref<string>("https://tauth.ihmatest.uz");
  const API_URL = ref<string>("https://tlrn.ihmatest.uz/api");

  if (window.location.href.indexOf("https://tlrn.ihmatest.uz") > -1) {
    STS_DOMAIN.value = "https://tauth.ihmatest.uz";
    API_URL.value = "https://tlrn.ihmatest.uz/api";
  }

  /* PRODUCTION */
  if (window.location.href.indexOf("https://tlrn.ihma.uz") > -1) {
    STS_DOMAIN.value = "https://tauth.ihma.uz";
    API_URL.value = "https://tlrn.ihma.uz/api";
  }

  return {
    STS_DOMAIN,
    API_URL,
  };
};
