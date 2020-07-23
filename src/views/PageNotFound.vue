<template>
  <div class="not-found-container">
    <img
      src="@/assets/images/404.svg"
      alt="404 page not found"
      class="not-found-img"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "@/assets/variables.less";

.not-found-img {
  min-width: 40%;
  max-width: 100%;
}

.not-found-container {
  width: 100%;
  .gradient();
  min-height: calc(100% - @header-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
