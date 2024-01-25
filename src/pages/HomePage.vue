<template>
  <div>
    <div class="cource__title">Your cources</div>
    <div class="cource__list">
      <RouterLink to="/video-page">
        <CourseCardVue />
      </RouterLink>
      <RouterLink to="/video-page">
        <CourseCardVue />
      </RouterLink>
      <RouterLink to="/video-page">
        <CourseCardVue />
      </RouterLink>
      <RouterLink to="/video-page">
        <CourseCardVue />
      </RouterLink>
      <RouterLink to="/video-page">
        <CourseCardVue />
      </RouterLink>

     
    </div>
  </div>
</template>

<style lang="scss">
.cource {
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;

    @include breakpoint("md") {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint("lg") {
      grid-template-columns: repeat(3, 1fr);
    }
    @include breakpoint("xl") {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
  }
}
</style>