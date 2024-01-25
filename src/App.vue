<template>
  <RouterView></RouterView>
  <CustomNotification />
</template>

<script setup lang="ts">
import CustomNotification from "./components/CustomNotification.vue";
import ApiService from "./services/api.service";

import { RouterView } from "vue-router";
ApiService.setHeader();

</script>
<style>
tr:nth-child(odd) {
  background: #f7f6f6;
}

a {
  text-decoration: none;
  outline: none;
  color: inherit;
}
</style>
