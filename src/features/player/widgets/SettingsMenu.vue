<script setup lang="ts">
import { inject } from "vue";
import PlBtn from "../components/PlBtn.vue";
import { IPlayerProvider } from "../types";
import { computed } from "vue";
const videoInject = inject<IPlayerProvider>("videoPlayer");
const emits = defineEmits(["update:settings", "setModalsRef"]);

const activeLevel = computed(() => (videoInject && videoInject.params.levels[videoInject.params.activeLevel]) || null);
const activeTrack = computed(() => (videoInject && videoInject.params.audioTracks[videoInject.params.activeTrack]) || null);
</script>

<template>
  <div class="settings">
    <div class="item" @click="emits('update:settings', 1), emits('setModalsRef', 1)">
      <div class="left-collar">
        <PlBtn>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8zM18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z"
              fill="currentColor"
            ></path>
          </svg>
        </PlBtn>
        <h4>
          {{ $t("quality") }}
          <span>
            {{ activeLevel && activeLevel?.height || "auto" }}
            <sup v-if="activeLevel">
              {{
                activeLevel.height >= 720 && activeLevel.height < 1080
                  ? "HD" // @ts-ignore
                  : activeLevel.height >= 1080 && activeLevel.height < 1440
                  ? // @ts-ignore
                    "FHD"
                  : // @ts-ignore
                  activeLevel.height >= 1440 && activeLevel.height < 2160
                  ? "QHD"
                  : // @ts-ignore
                  activeLevel.height >= 2160
                  ? "UHD"
                  : ""
              }}
            </sup>
          </span>
        </h4>
      </div>
    </div>
    <div class="item" @click="emits('update:settings', 2), emits('setModalsRef', 2)">
      <div class="left-collar">
        <PlBtn>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8zM18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z"
              fill="currentColor"
            ></path>
          </svg>
        </PlBtn>
        <h4>
          {{ $t("audioTrack") }}
          <span>
            <!-- {{ videoInject.params.activeTrack }} -->
            {{ (activeTrack && activeTrack?.name) || "auto" }}
          </span>
        </h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  font-size: 1em;
  width: 20.3125em;
  flex-shrink: 0;
  align-self: flex-end;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625em;
    transition: all 0.4s ease;
    cursor: pointer;
    color: #fff;
    .left-collar,
    .right-collar {
      display: flex;
      align-items: center;
      gap: 0.625em;
    }
    h4 {
      span {
        opacity: 0.5;
      }
    }
  }

  .icon-size {
    width: 1.125em;
    height: 1.125em;
  }
}
</style>
