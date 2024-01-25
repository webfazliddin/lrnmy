<template>
  <button
    :type="type"
    :class="classnames($style.btn, $style[variant])"
    :disabled="disabled"
    @click="handleButtonClick"
  >
    <BaseSpinner v-if="loading" variant="white" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import classnames from "classnames";
import { withDefaults } from "vue";

export interface IBaseButton {
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "green" | "primary-outline" | "danger" | "danger-outline" | "none";
  loading?: boolean;
}

const emit = defineEmits<{
  (e: "on-click"): void;
}>();

withDefaults(defineProps<IBaseButton>(), {
  type: "button",
  disabled: false,
  variant: "primary",
  loading: false
});

const handleButtonClick = () => {
  emit("on-click");
};
</script>

<style module lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital@1&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,700;1,400&display=swap");
.btn {
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  // font-family: "Nunito", sans-serif;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  background-color: #4e60ff;
  border: none;
  transition: box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.16);
  }
}

.primary {
  background-color: #3d3bff;
  border: none;
  color: white;
}

.primary-outline {
  background-color: white;
  border: 1px solid #7240ff;
  box-shadow: none;
  color: #7240ff;
}

.danger {
  background-color: #e52e22;
  border: none;
  color: white;
}

.green {
  background-color: $color-green-lightest;
  border: none;
  color: white;
}

.danger-outline {
  background-color: white;
  border: 1px solid #e52e22;
  box-shadow: none;
  color: #e52e22;
}

.none {
  cursor: pointer;
  border: none;
  background: none;
  // font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin-left: 32px;
  color: grey;
}

:disabled {
  cursor: not-allowed;
  background-color: white;
  border: 1px solid grey;
  box-shadow: none;
  color: grey;
}
</style>
