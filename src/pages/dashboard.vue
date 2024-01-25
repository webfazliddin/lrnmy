<template>
  <div>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { useAuth } from "@/app/config/store/auth";
import AccountService from "@/services/others/account.service";
import { useErrorToast } from "@/utils/helpers/useErrorToast";
const auth = useAuth();
const { setError } = useErrorToast();
AccountService.GetAuthInfo()
  .then((res) => {
    localStorage.setItem("user_info", JSON.stringify(res.data));
    auth.LogIn(res.data);
  })
  .catch((e) => {
    setError(e);
    localStorage.removeItem("user_info");
  });
</script>
