<script setup lang="ts"></script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  position: relative;
  cursor: pointer;
  color: white;
  background: transparent;
  opacity: 0.6;
  transition: all 0.4s;

  &:hover{
    opacity: 1;
  }
}
</style>
