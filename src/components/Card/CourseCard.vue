<script setup lang="ts">
import { useImage } from "@vueuse/core";
import { withDefaults, defineProps } from "vue";

export interface ICourseCard {
  title?: string;
  image?: string;
  quantityVideos?: string | number;
}

const props = withDefaults(defineProps<ICourseCard>(), {
  image: "https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
});

const { isLoading: isLoadingImage } = useImage({ src: props.image });
</script>
<template>
  <SkeletonShimmerVue v-if="isLoadingImage" />
  <div class="card" v-else-if="!isLoadingImage">
    <div class="cardBody">
      <div class="cardTitle">{{ title }} Как найти работу: поиск вакансий, резюме, собеседование</div>

      <div class="img" :style="{
        'background-image': 'url(' + image + ')',
      }">
        <img src="../../assets/images/courceCardImage.png" />
      </div>
      <div class="arrowRight">
        <img src="../../assets/images/Arrow_right.svg" />
      </div>
    </div>
    <div class="quantityVideos">{{ quantityVideos }} quantity/videos</div>
    <div>
      <v-progress-linear color="deep-purple-accent-4" model-value="20" :height="13"></v-progress-linear>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 50px 30px;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;

    .arrowRight {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #5c8858;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img img {
      display: none;
    }
  }
}

.cardBody {
  display: flex;
  justify-content: space-between;
  height: 70px;
  margin-bottom: 35px;
}

.cardTitle {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
}

.img img {
  width: 56px;
  height: 56px;
}

.arrowRight {
  display: none;
}

.quantityVideos {
  margin-bottom: 10px;
  font-size: 13px;
}

.v-progress-linear__determinate,
.v-progress-linear__indeterminate {
  background: #5c8858 !important;
}

.v-progress-linear {
  border-radius: 6px;
}</style>