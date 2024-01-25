<script setup lang="ts">
import { reactive, ref } from "vue";
import Quality from "./Quality.vue";
import { onMounted } from "vue";
import SettingsMenu from "./SettingsMenu.vue";
import Track from "./Track.vue";
import { useClickOutside } from "../composables/useClickOutSide";

interface IShow {
  settings: number | null;
}
const show: IShow = reactive({
  settings: null
});

const emits = defineEmits<{
  (e: "update:isSettings", value: boolean): void;
}>();
const modalsRef = ref<HTMLDivElement | null>(null);

const setModalsRef = (value: number) => {
  if (modalsRef.value) {
    let rect = modalsRef.value.children[value].getBoundingClientRect();
    // let oldRect: DOMRect;
    if (value === 0) {
      // oldRect = modalsRef.value.children[0].getBoundingClientRect();
      modalsRef.value.setAttribute(
        "style",
        `height: ${rect.height}px;
         width: ${rect.width}px;
         transform: translate(-${0}px, 0)
      `
      );
    } else {
      // oldRect = modalsRef.value.children[value - 1].getBoundingClientRect();
      let newRect: DOMRect;
      let ps: number = 0;
      // const container: HTMLCollectionOf<Element> = document.getElementsByClassName("settings-items-container");
      // let maxHeight = 0;

      for (let i = 0; i <= modalsRef.value.children.length; i++) {
        if (i < value) {
          newRect = modalsRef.value.children[i].getBoundingClientRect();
          ps += newRect.width;
        }
      }
      // if (container && show.settings !== null) {
      //   let activeElement: HTMLElement = container[show.settings - 1] as HTMLElement;
      //   maxHeight = (activeElement.offsetHeight / 2 )-( rect.height / 5);

      //   activeElement.setAttribute(
      //     "style",
      //     `max-height: ${maxHeight}px`
      //   )
      // }

      modalsRef.value.setAttribute(
        "style",
        `height: ${rect.height}px;
         width: ${rect.width}px;
         transform: translate(-${ps}px, 0)
      `
      );
    }
  }
};

useClickOutside(modalsRef, () => {
  emits("update:isSettings", false);
});

onMounted(() => {
  setModalsRef(0);
});
</script>

<template>
  <div class="modals-container">
    <div class="modals" ref="modalsRef">
      <SettingsMenu @setModalsRef="setModalsRef" v-model:settings="show.settings" />
      <Quality @setModalsRef="setModalsRef" v-model:settings="show.settings" />
      <Track @setModalsRef="setModalsRef" v-model:settings="show.settings" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modals-container {
  position: absolute;
  right: 0%;
  top: -100%;
  transform: translate(0%, -100%);
  overflow: hidden;
  border-radius: 0.5rem;
  transition: all 0.4s ease;
  background: hsla(0, 0, 8%, 0.95);
  .modals {
    transition: all 0.4s ease;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
}
</style>
