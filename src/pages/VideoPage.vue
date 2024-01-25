<script setup lang="ts">
import { ref } from "vue";

const panel = ref([0]);
const readonly = ref(false);
</script>
<template>
  <div>
      <div class="backBtnMobile" style="width: 130px;padding:10px">
        <BaseBackButton />
      </div>
    <div class="vidCard__wrapper">
      <div class="backBtn">
        <BaseBackButton />
      </div>
      <div class="courceTitle">
        1.
        Как использовать платформу
      </div>

      <div class="img">
        <img src="../assets/images/courceCardImage.png" />
      </div>
    </div>

    <div>
      <v-expansion-panels v-model="panel" :readonly="readonly" multiple>
        <v-expansion-panel>
          <v-expansion-panel-title>1. Добро пожаловать</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="videoCard__list">
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div class="videoCard__title">1.1 Добро пожаловать</div>
                </div>
              </RouterLink>
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div class="videoCard__title">1.2 Как устроена платформа Skillbox</div>
                </div>
              </RouterLink>
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div class="videoCard__title">1.3 Как учиться на платформе Skillbox</div>
                </div>
              </RouterLink>
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div class="videoCard__title">1.4 Как устроены практические работы и тесты</div>
                </div>
              </RouterLink>
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div
                    class="videoCard__title"
                  >1.5 Кому задавать вопросы: команда кураторов и телегра</div>
                </div>
              </RouterLink>
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div
                    class="videoCard__title"
                  >1.6 Как делать итоговые проекты и когда выдаётся сертификат</div>
                </div>
              </RouterLink>
              <RouterLink to="/video-lesson">
                <div>
                  <div class="videoCard__video">
                    <SkeletonShimmerVue />
                  </div>
                  <div class="videoCard__title">1.7 Как пользоваться облачными хранилищами</div>
                </div>
              </RouterLink>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>2. Как устроена платформа Skillbox</v-expansion-panel-title>
          <v-expansion-panel-text>Some content</v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>3. Как учиться на платформе Skillbox</v-expansion-panel-title>
          <v-expansion-panel-text>Some content</v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>4. Как устроены практические работы и тесты</v-expansion-panel-title>
          <v-expansion-panel-text>Some content</v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>5. Как учиться на платформе Skillbox</v-expansion-panel-title>
          <v-expansion-panel-text>Some content</v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>6. Как устроена платформа Skillbox</v-expansion-panel-title>
          <v-expansion-panel-text>Some content</v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>7. Как учиться на платформе Skillbox</v-expansion-panel-title>
          <v-expansion-panel-text>Some content</v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<style lang="scss">
.backBtnMobile {
  // background-color: #f5f5f5;
  margin-bottom: 20px;
  border-radius: 10px;
  display: block;
  @include breakpoint("md") {
    display: none;
  }
}

.backBtn {
  background-color: #f5f5f5;
  width: auto;
  display: none;
  @include breakpoint("md") {
    display: block;
  }
}
.vidCard__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  position: sticky;
  top: 80px;
  z-index: 999;
}

.courceTitle {
  font-size: 14px;
  text-align: center;

  @include breakpoint("md") {
    font-size: 18px;
  }

  @include breakpoint("lg") {
    font-size: 18px;
  }
}
.v-expansion-panel {
  margin-bottom: 10px !important;
}
.videoCard__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @include breakpoint("md") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include breakpoint("lg") {
    grid-template-columns: repeat(4, 1fr);
  }
}
.videoCard__video {
  margin-bottom: 10px;
  cursor: pointer;
}
.videoCard__title {
  font-size: 16px;
  line-height: 20px;
  display: -webkit-box;
  overflow: hidden;
  font-weight: 500;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.v-expansion-panel-title--active {
  background: #cbffd3 !important;
  // opacity: 0.6 !important;
  // color: #fff !important;
}
</style>