<script setup lang="ts">
import { CheckIcon, ChevronLeftIcon } from "vue-tabler-icons";
import PlBtn from "../components/PlBtn.vue";
import { IPlayerProvider } from "../types";
import { inject } from "vue";
import { computed } from "vue";
import { usePlayer } from "../player";
import DropDown from "../components/DropDown.vue";

const emits = defineEmits(["update:settings", "setModalsRef"]);
const videoInject = inject<IPlayerProvider>("videoPlayer");
const data = computed(() => (videoInject && videoInject.params.audioTracks) || []);

const { isMobile } = usePlayer();

const setTrack = (item: any) => {
  if (videoInject?.setTrack) {
    videoInject.params.secondaryActiveTrack = item;
  }
};
</script>

<template>
  <div>
    <div class="items" v-if="!isMobile.any()">
      <PlBtn class="back" @click="emits('update:settings', 0), emits('setModalsRef', 0)">
        <ChevronLeftIcon size="20" class="mr-2" />
        {{ $t("Back") }}
      </PlBtn>
      <div class="divider"></div>
      <div class="settings-items-container" v-if="videoInject">
        <PlBtn
          class="item"
          v-for="(item, index) in data"
          @click="videoInject?.setTrack(index), emits('update:settings', 0), emits('setModalsRef', 0)"
        >
          <CheckIcon
            size="20"
            class="mr-3"
            :style="{
              opacity: videoInject?.params.activeTrack == index ? 1 : 0
            }"
          />
          <span>
            {{ item?.name }}
          </span>
        </PlBtn>
      </div>
    </div>
    <div class="mobile-items" v-if="videoInject && videoInject.params && isMobile.any()">
      <label for="quality"> {{ $t("audioTrack") }} </label>
      <DropDown
        :item-value="'name'"
        :item-title="'name'"
        :values="data"
        name="track"
        id="track"
        v-model:value="videoInject.params.activeTrack"
        :can-search="false"
        @change="setTrack"
        by-index
      >
      </DropDown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-width: 18.75rem;
  label {
    margin-bottom: 0.625rem;
    font-weight: 600;
  }
}
.items {
  font-size: 1rem;
  width: 13.125rem;
  flex-shrink: 0;
  align-self: flex-end;
  height: auto;
  transition: all 0.4s ease;
  .divider {
    width: 100%;
    height: 0.0625rem;
    background: #999898;
  }
  .back {
    padding: 0.625em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // border-bottom: 0.0625rem solid var(--tollbar-item-hover-bg);
    :deep() .back-ico {
      width: 0.625em;
      height: 0.625em;
    }
  }
  .settings-items-container {
    max-height: 21.875em;
    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    will-change: scroll-position;
    &::-webkit-scrollbar {
      display: none;
    }

    @media screen and (max-width: 1024px) {
      max-height: 9.375rem;
    }
  }
  .item {
    padding: 0.9375em 0.625em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    flex: 1;
    width: 100%;
    align-items: center;
    .icon {
      width: 1em;
      height: 1rem;
      position: relative;
      margin-right: 1rem;
      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    span {
      font-size: 0.875em;
      font-weight: 700;
      sup {
        font-size: 0.875em;
      }
    }
  }
}
</style>
