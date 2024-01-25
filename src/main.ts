import { buildApp } from "./app";
import globalComponents from "@/components/global-components";
import "@/assets/scss/global.scss";

const { app, pinia, } = buildApp();
// @ts-ignore
const storeInitialState = window.INITIAL_DATA;
if (storeInitialState) {
  pinia.state.value = storeInitialState;
}

app.use(globalComponents);
app.mount("#app");
