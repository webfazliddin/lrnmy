<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import type { SwiperOptions } from "swiper/types";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { ref } from "vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Icon from "./Icon.vue";

interface breakpoints {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
}
interface IProps {
  breakpoints: breakpoints;
  list: any[];
  isControls?: boolean;
  options?: any;
  customButtons?: boolean;

  /* SET THIS PROPS FOR DETECT SHOW SWIPER-SLIDE ALL BUTTON OR NO */
  hasAllButton?: boolean;
  active?: number;
}

const activeIndex = ref<number>(0);
const endedSlide = ref();

const emits = defineEmits<{
  (e: "update:active", value: number): void;
}>();

const getCurrentSlide = (e: any) => {
  activeIndex.value = e.activeIndex;
  console.log(e);
  emits("update:active", activeIndex.value);
  endedSlide.value = false;
  if (e.isEnd) {
    endedSlide.value = true;
  }
};

withDefaults(defineProps<IProps>(), {
  isControls: true
});

const next = ref<string>();
const mySwiper = ref();
const prev = ref();

function makeStr(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

next.value = makeStr(5);
prev.value = makeStr(5);
</script>

<template>
  <div style="width: 100%" class="slider">
    <div :class="['handleSlider prev', prev]">
      <Icon hover-bg="var(--primary-orange-button)" bg="var(--light)" title="" size="secondary_medium" icon-size="icon-size">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 8L0.999999 8M0.999999 8L8 0.999999M0.999999 8L8 15"
            stroke="#232738"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Icon>
    </div>
    <Swiper
      ref="mySwiper"
      :navigation="{
        enabled: true,
        prevEl: `.${prev}`,
        nextEl: `.${next}`
      }"
      @slideChange="getCurrentSlide"
      :modules="[Pagination, Navigation, EffectCoverflow, Autoplay]"
      :breakpoints="breakpoints"
    >
      <SwiperSlide v-if="hasAllButton">
        <slot name="all"></slot>
      </SwiperSlide>
      <SwiperSlide v-for="(item, index) in list" :key="index">
        <slot :item="item" :index="index"></slot>
      </SwiperSlide>
    </Swiper>

    <div :class="['handleSlider next', next]">
      <Icon hover-bg="var(--primary-orange-button)" bg="var(--light)" title="" size="medium" icon-size="icon-size">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 8L15 8M15 8L8 15M15 8L8 1" stroke="#232738" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/views/myPages/design/mixins.scss";
$width: 0.5rem;
$gap: 1rem;

.slider {
  position: relative;
  :deep() .icon-size {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover {
    .handleSlider {
      opacity: 1;
    }
  }
}
.swiper {
  overflow: unset;
}

.handleSlider {
  position: absolute;
  left: 0;
  z-index: 2000;
  height: auto;
  top: 50%;
  opacity: 0;
  transform: translateY(-50%);
  transition: all 0.4s ease;

  :deep() button {
    &:enabled:hover {
      svg {
        path {
          stroke: var(--light);
        }
      }
    }
  }

  &.next {
    left: unset;
    right: 0;
  }

  @include media(tablet){
    display: none;
  }
}

.swiper-slide {
  width: auto;
  height: auto;
}

.swiper-pagination-clickable {
  width: auto !important;
  display: flex;
  align-items: center;
}

.swiper-controller {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  button {
    background: transparent;
    cursor: pointer;
  }
  .icon {
    position: relative;
    width: 2rem;
    height: 1.5rem;
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
