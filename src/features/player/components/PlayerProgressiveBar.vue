<script setup lang="ts">
import { inject, ref } from "vue";
import { IPlayerProvider } from "../types";
import { usePlayer } from "../player";

const progress_holder = ref<HTMLDivElement | null>(null);
const cursorTimeRef = ref<HTMLDivElement | null>(null);
const cursorTime = ref<number>(0);

const videoInject = inject<IPlayerProvider>("videoPlayer");
const { secondsToHms } = usePlayer();

const played = ref<HTMLDivElement | null>(null);

const progressCursorHide = (e: Event) => {
  if (cursorTimeRef.value && progress_holder.value) {
    const pageX = (e as TouchEvent)?.touches?.length > 0 ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX;
    const scrub_time_percent = ((pageX - progress_holder.value.getBoundingClientRect().left) / progress_holder.value.offsetWidth) * 100;

    cursorTimeRef.value?.setAttribute(
      "style",
      `left: ${scrub_time_percent}%;
        opacity: 0;
        `
    );
  }
};

const progressCursor = (e: Event) => {
  if (cursorTimeRef.value) {
    const pageX = (e as TouchEvent)?.touches?.length > 0 ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX;

    if (progress_holder.value && videoInject?.videoElement) {
      const scrub_time_percent = ((pageX - progress_holder.value.getBoundingClientRect().left) / progress_holder.value.offsetWidth) * 100;

      cursorTime.value = (scrub_time_percent / 100) * videoInject?.videoElement.duration;

      if (pageX - progress_holder.value.getBoundingClientRect().left <= 0) {
        cursorTime.value = 0;
      } else if (pageX - progress_holder.value.getBoundingClientRect().left >= progress_holder.value.offsetWidth) {
        cursorTime.value = videoInject.videoElement.duration;
      } else {
        cursorTime.value = (scrub_time_percent / 100) * videoInject.videoElement.duration;
      }
      cursorTimeRef.value?.setAttribute(
        "style",
        `left: ${scrub_time_percent}%;
        opacity: 1;
        `
      );
    }
  }
};

const progressStart = (e: Event) => {
  e.preventDefault();
  if (videoInject?.videoElement && !videoInject.videoElement.paused) {
    videoInject.playPause();
  }

  if (played.value && progress_holder.value && videoInject?.videoElement) {
    const pageX = (e as TouchEvent)?.touches?.length > 0 ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX;

    const scrub_time_percent = ((pageX - played.value?.getBoundingClientRect().left) / progress_holder.value?.offsetWidth) * 100;

    videoInject.videoElement.currentTime = (scrub_time_percent / 100) * videoInject?.videoElement.duration;

    if ((e as TouchEvent)?.touches?.length > 0) {
      progress_holder.value.addEventListener("touchmove", progressMouseMove);
      progress_holder.value.addEventListener("touchend", progressMouseUp, { once: true });
    } else {
      progress_holder.value.addEventListener("mousemove", progressMouseMove);
      progress_holder.value.addEventListener("mouseup", progressMouseUp, { once: true });
    }
  }
};

const progressMouseMove = (e: Event) => {
  const pageX = (e as TouchEvent)?.touches?.length > 0 ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX;

  if (played.value && progress_holder.value && videoInject?.videoElement) {
    const scrub_time_percent = ((pageX - progress_holder.value.getBoundingClientRect().left) / progress_holder.value.offsetWidth) * 100;

    videoInject.videoElement.currentTime = (scrub_time_percent / 100) * +videoInject?.videoElement.duration;

    if (pageX - progress_holder.value.getBoundingClientRect().left <= 0) {
      videoInject.videoElement.currentTime = 0;
    } else if (pageX - progress_holder.value.getBoundingClientRect().left >= progress_holder.value.offsetWidth) {
      videoInject.videoElement.currentTime = videoInject.videoElement.duration;
    } else {
      videoInject.videoElement.currentTime = (scrub_time_percent / 100) * videoInject.videoElement.duration;
      played.value.setAttribute("style", `width: ${scrub_time_percent}%`);
    }
  }
};

const progressMouseUp = () => {
  if (played.value && progress_holder.value && videoInject?.videoElement) {
    try {
      videoInject.videoElement.currentTime = (played.value.offsetWidth / progress_holder.value.offsetWidth) * videoInject.videoElement.duration;
    } catch (e) {
      console.log(e);
    }
    progress_holder.value.removeEventListener("mousemove", progressMouseMove);
    progress_holder.value.removeEventListener("touchmove", progressMouseMove);
    videoInject.playPause();
  }
};
</script>

<template>
  <div
    class="progressive-bar"
    ref="progress_holder"
    @mousedown="progressStart"
    @touchstart="progressStart"
    @mousemove="progressCursor"
    @mouseleave="progressCursorHide"
  >
    <div class="cursor-time" ref="cursorTimeRef">
      <span>{{ secondsToHms(cursorTime) }}</span>
    </div>
    <div class="progressive-bar-inner">
      <div
        v-if="videoInject?.params.currentTime || videoInject?.params.duration"
        class="progressive-bar-inner-current-time"
        ref="played"
        :style="{
          width: `${(videoInject?.params.currentTime / videoInject?.params.duration) * 100}%`
        }"
      >
        <span></span>
      </div>
      <div
        ref="canplay"
        v-if="videoInject?.params.canPlay"
        class="progressive-bar-inner-updated-time"
        :style="{
          width: `${videoInject.params.canPlay * 100}%`
        }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progressive-bar {
  position: relative;
  padding: 0.625em 0;
  width: 100%;

  .cursor-time {
    position: absolute;
    top: -1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    color: #fff;
  }

  &-inner {
    background: var(--player-progressive-bar-background);
    border-radius: 6.25em;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    height: 0.3125em;
    width: 100%;
    &-current-time {
      width: 0;
      height: 100%;
      background: var(--primary);
      border-radius: 6.25em;
      position: relative;
      z-index: 3;
      pointer-events: none;
      span {
        position: absolute;
        width: 0.9375em;
        height: 0.9375em;
        background: var(--primary);
        border-radius: 50%;
        right: 0;
        top: 50%;
        transform: translate(50%, -50%);
        transition: all 0.3s ease;
      }
    }

    &-updated-time {
      position: absolute;
      height: 100%;
      width: 0;
      background: var(--player-progressive-bar-updated-time);
      top: 0;
      border-radius: 6.25em;
      pointer-events: none;
    }
  }

  &:hover {
    .progressive-bar-inner {
      &-current-time {
        span {
          opacity: 1;
        }
      }
    }
  }
}
</style>
