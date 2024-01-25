<template>
  <div @click="$router.go(-1)" class="backButton__wrapper">
    <div class="backButton">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M15.07 19.138 8 12.07 15.072 5l1.06 1.06-6.011 6.01 6.009 6.008-1.06 1.06Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="backButton__title">Back</div>
  </div>
</template>

<style lang="scss">
.backButton__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover .backButton {
    background-color: #5c8858;

    svg path {
      fill: #fff;
    }
  }
}
.backButton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  cursor: pointer;

  &__title {
    font-size: 16px;
    font-family: $base-font;
  }
}
svg {
  width: 22px;
}
</style>