<script setup lang="ts">
import { CheckIcon, ChevronLeftIcon } from "vue-tabler-icons";
import PlBtn from "../components/PlBtn.vue";
import { IPlayerProvider } from "../types";
import { computed, inject } from "vue";
import { usePlayer } from "../player";
import DropDown from "../components/DropDown.vue";

const emits = defineEmits(["update:settings", "setModalsRef"]);
const videoInject = inject<IPlayerProvider>("videoPlayer");
const data = computed(() => (videoInject && videoInject.params.levels) || []);

const { isMobile } = usePlayer();

const setLevel = (item: any, index: number) => {
  if (videoInject?.setLevel) {
    console.log(index, item);
    videoInject.params.secondaryActiveLevel = item;
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
        <PlBtn class="item" @click="videoInject?.setLevel({}, -1), emits('update:settings', 0), emits('setModalsRef', 0)">
          <CheckIcon
            size="20"
            class="mr-3"
            :style="{
              opacity: videoInject?.params.activeLevel == -1 ? 1 : 0
            }"
          />
          <span>
            {{ $t("autoQuality") }}
          </span>
        </PlBtn>
        <PlBtn
          class="item"
          v-for="(item, index) in data"
          @click="videoInject?.setLevel(item.height, index), emits('update:settings', 0), emits('setModalsRef', 0)"
        >
          <CheckIcon
            size="20"
            class="mr-3"
            :style="{
              opacity: videoInject?.params.activeLevel == index ? 1 : 0
            }"
          />
          <span>
            {{ item?.height }}
            <sup>
              {{
                item.height >= 720 && item.height < 1080
                  ? "HD" // @ts-ignore
                  : item.height >= 1080 && item.height < 1440
                  ? // @ts-ignore
                    "FHD"
                  : // @ts-ignore
                  item.height >= 1440 && item.height < 2160
                  ? "QHD"
                  : // @ts-ignore
                  item.height >= 2160
                  ? "UHD"
                  : ""
              }}
            </sup>
          </span>
        </PlBtn>
      </div>
    </div>

    <div class="mobile-items" v-if="videoInject && videoInject.params && isMobile.any()">
      <label for="quality"> {{ $t("quality") }} </label>
      <DropDown
        :item-value="'height'"
        :item-title="'height'"
        :values="data"
        :options="data"
        name="quality"
        id="quality"
        v-model:value="videoInject.params.activeLevel"
        :can-search="false"
        return-object
        by-index
        @change="setLevel"
        :label="$t('autoQuality')"
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
    margin-bottom: 0.625em;
    font-weight: 600;
  }
}
.items {
  width: 13.125em;
  flex-shrink: 0;
  align-self: flex-end;
  height: auto;
  transition: all 0.4s ease;
  font-size: 1rem;
  .divider {
    width: 100%;
    height: 0.0625rem;
    background: #999898;
  }
  .back {
    padding: 0.625em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
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
      width: 0.25rem;
    }

    @media screen and (max-width: 1024px) {
      max-height: 9.375em;
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
      height: 1em;
      position: relative;
      margin-right: 1em;
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
