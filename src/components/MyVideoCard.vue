<script setup lang="ts">
interface IProps {
  src: string | undefined;
}

defineProps<IProps>();
</script>

<template>
  <div class="card">
    <div class="card-inner">
      <img :src="src" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;

  &-inner {
    position: relative;
    height: 0;
    overflow: hidden;
    width: 100%;
    display: block;
    border-radius: 1.25rem;
    padding-bottom: 56.25%;
    user-select: none;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background: transparent;
      user-select: none;
    }
  }
}
</style>
