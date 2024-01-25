<script setup lang="ts">
import classnames from "classnames";
import { withDefaults, defineProps, ref } from "vue";

export interface IAppHeader {
  elevated?: boolean;
}

withDefaults(defineProps<IAppHeader>(), {
  elevated: false
});

const langItems = [{ title: "O'zbek" }, { title: "Русский" }];
const selectedLang = ref(langItems[0]);

const changeLanguage = (lang: any) => {
  selectedLang.value = lang;
};
</script>
<template>
  <header
    :class="
      classnames($style.header, {
        [$style.isElevated]: elevated
      })
    "
  >
    <v-container fluid>
      <div :class="$style.wrapper">
        <div :class="$style.wrapper__left">
          <div>
            <img src="../../assets/images/logo.svg" />
          </div>
          <div class="userLoginName">Фойдаланувчи (Логин): NAME SURNAME FATHER'S NAME</div>
        </div>
        <div class="wrapper__right">
          <div class="language">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn class="language__button" color="green" v-bind="props"> {{ selectedLang.title }} </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in langItems" :key="index" :value="index" @click="changeLanguage(item)">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="userIcon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="transparent" height="24" width="24">
              <circle cx="12" cy="8" r="5" stroke="#201926" stroke-width="2" />
              <path
                d="M2.7793 21c1.9627-3.0102 5.35951-5 9.2211-5 3.8615 0 7.2583 1.9898 9.221 5"
                stroke="#201926"
                stroke-linecap="round"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </v-container>
  </header>
</template>

<style module lang="scss">
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  min-height: 80px;
  background-color: white;
  border-bottom: 1px solid #f3f4ff;
  transition: box-shadow 0.25s ease-in-out;

  z-index: 2000;
  &.isElevated {
    box-shadow: 0 0 10px rgba(168, 168, 168, 0.4);
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapper__left {
  display: flex;
  align-items: center;
  gap: 30px;
}
</style>
<style>
.wrapper__right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.language__button {
  height: 45px !important;
  border: 1px solid #679a62 !important;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.16);
  }
}

@media screen and (max-width: 576px) {
  .userLoginName {
    display: none;
  }
}

svg {
  cursor: pointer;
}

.userIcon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* background: #5e8f59; */
  border: 1px solid #679a62;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
