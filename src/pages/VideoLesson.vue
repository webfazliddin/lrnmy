<script setup lang="ts">
import { ref } from "vue";
import Player from "@/features/player/Player.vue";

const drawer = ref<boolean>(false);
const isChangeSize = ref(false);

const Print = () => {
  console.log("hello world");
};
</script>
<template>
  <div>
    <div class="lg">
      <div class="videoLesson__wrapper">
        <div>
          <BaseBackButton />
        </div>
        <div class="courceLessonTitle">1.1 Как проходить курс. Знакомимся с дизайном интерьеров и декорированием</div>

        <div class="svg__videoLesson" @click.stop="drawer = !drawer">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.999 8v6.501c0 .854-.04 1.746-.119 2.653-.275 3.029-1.57 3.8-4.193 4.304-1.86.358-3.772.542-5.678.542h-.01c-1.916 0-3.828-.184-5.688-.542-2.621-.504-3.917-1.276-4.192-4.301A30.84 30.84 0 0 1 2 14.501V8h19.999Zm-9.99 12.5a28.56 28.56 0 0 0 5.395-.515c2.206-.424 2.787-.817 2.982-2.961.075-.863.113-1.712.113-2.523V9.5h-17v5.001c0 .81.038 1.66.113 2.52.195 2.147.776 2.54 2.982 2.964 1.773.342 3.592.515 5.404.515h.011Zm-2.01-2.771 5.412-3.125-5.412-3.125v6.25Zm9-12.729h-14v1.5h14V5Zm-3-3h-8v1.5h8V2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <v-navigation-drawer class="navigation-drawer" v-model="drawer" temporary>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider"></v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </div>

    <div class="videoLesson__wrapper--mobile">
      <div>
        <BaseBackButton />
      </div>
      <div class="icon__mobile">
        <div class="svg__videoLesson" @click.stop="drawer = !drawer">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.999 8v6.501c0 .854-.04 1.746-.119 2.653-.275 3.029-1.57 3.8-4.193 4.304-1.86.358-3.772.542-5.678.542h-.01c-1.916 0-3.828-.184-5.688-.542-2.621-.504-3.917-1.276-4.192-4.301A30.84 30.84 0 0 1 2 14.501V8h19.999Zm-9.99 12.5a28.56 28.56 0 0 0 5.395-.515c2.206-.424 2.787-.817 2.982-2.961.075-.863.113-1.712.113-2.523V9.5h-17v5.001c0 .81.038 1.66.113 2.52.195 2.147.776 2.54 2.982 2.964 1.773.342 3.592.515 5.404.515h.011Zm-2.01-2.771 5.412-3.125-5.412-3.125v6.25Zm9-12.729h-14v1.5h14V5Zm-3-3h-8v1.5h8V2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="svg__arrowLeft--mobile">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 11.327H6.872l5.27-5.267L11.081 5 4 12.078l7.084 7.081 1.06-1.06-5.275-5.272H19v-1.5Z" fill="currentColor" />
          </svg>
          <v-tooltip activator="parent" location="top">Back</v-tooltip>
        </div>
        <div class="svg__arrowRight--mobile">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4 11.327h12.128l-5.27-5.267L11.918 5 19 12.078l-7.082 7.081-1.062-1.06 5.274-5.272H4v-1.5Z" fill="currentColor" />
          </svg>
          <v-tooltip activator="parent" location="top">Next</v-tooltip>
        </div>
      </div>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider"></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div class="courceLessonTitle videoLesson__wrapper--mobile" style="text-align: center; margin-bottom: 20px">
      1.1 Как проходить курс. Знакомимся с дизайном интерьеров и декорированием
    </div>

    <div class="lg">
      <div class="svg__arrowLeft">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 11.327H6.872l5.27-5.267L11.081 5 4 12.078l7.084 7.081 1.06-1.06-5.275-5.272H19v-1.5Z" fill="currentColor" />
        </svg>
        <v-tooltip activator="parent" location="top">Back</v-tooltip>
      </div>
      <div class="svg__arrowRight">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M4 11.327h12.128l-5.27-5.267L11.918 5 19 12.078l-7.082 7.081-1.062-1.06 5.274-5.272H4v-1.5Z" fill="currentColor" />
        </svg>
        <v-tooltip activator="parent" location="top">Next</v-tooltip>
      </div>
    </div>
    <div
      class="center__wrapper"
      :class="{
        full: isChangeSize
      }"
    >
      <div></div>
      <div class="content">
        <Player @change-size="isChangeSize = !isChangeSize" :is-short="isChangeSize" />
        <!-- <SkeletonShimmerVue class="shimmerVideo" /> -->
        <div class="materials__title">Materials</div>
        <div class="materials" @click="Print">
          <hr />
          <div class="material__item">
            <div class="material__item--text">1.4 Правила выбора текстиля в интерьер .pdf</div>
            <div class="material__item--inner">
              <div class="material__item--quantity">6.14МБ</div>
              <div>
                <svg style="width: 20px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M3 22v-1.5h18V22H3Zm8.998-2.998 7.713-7.715-1.061-1.061-5.9 5.902V2h-1.5v14.132l-5.9-5.903-1.061 1.062 7.709 7.711Z"
                    fill="#8f8f8f"
                  />
                </svg>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div class="materials__dowloadBtn">
          <BaseButton>Download all</BaseButton>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<style lang="scss">
.videoLesson__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
}
.lg {
  display: none;

  @include breakpoint("lg") {
    display: block;
  }
}

.videoLesson__wrapper--mobile {
  display: block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @include breakpoint("lg") {
    display: none;
  }
}
.icon__mobile {
  display: flex;
  align-items: center;
  gap: 10px;
}
.svg__videoLesson {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 70ms ease-in-out;
  background-color: #f5f5f5;
  cursor: pointer;
}
.svg__arrowLeft {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 70ms ease-in-out;
  background-color: #f5f5f5;
  cursor: pointer;
  position: fixed;
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
}
.svg__arrowRight {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 70ms ease-in-out;
  background-color: #f5f5f5;
  cursor: pointer;
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translate(-50%, -50%);
}
.svg__arrowLeft--mobile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 70ms ease-in-out;
  background-color: #f5f5f5;
  cursor: pointer;
}
.svg__arrowRight--mobile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 70ms ease-in-out;
  background-color: #f5f5f5;
  cursor: pointer;
}
.courceLessonTitle {
  font-size: 14px;
  line-height: 40px;
  font-weight: 600;
  padding: 0 20px;

  @include breakpoint("md") {
    font-size: 16px;
  }

  @include breakpoint("lg") {
    font-size: 32px;
  }
}
.center__wrapper {
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;

  .content {
    width: 100%;
    margin: 0 auto;
  }

  &.full {
    grid-template-columns: 12fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 12fr;
  }
}
.v-navigation-drawer {
  position: absolute !important;
  right: 0 !important;
}
.materials {
  cursor: pointer;
  margin-bottom: 24px;
}
.materials__title {
  font-size: 24px;
  line-height: 36px;
  margin: 24px 0;
  font-weight: 600;
}
.material__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}
.material__item--text {
  font-size: 14px;
  font-weight: 400;
}
.material__item--inner {
  display: flex;
  align-items: center;
}
.material__item--quantity {
  color: #666;
  margin-right: 20px;
}
.shimmerVideo {
  height: 300px;

  @include breakpoint("md") {
    height: 600px;
  }
}
</style>
