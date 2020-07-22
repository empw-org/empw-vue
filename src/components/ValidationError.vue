<template>
  <div>
    <span class="error-message"> <slot></slot> </span>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped lang="less">
.error-message {
  font-size: 10pt;
  color: red;
  margin-top: 2px;
}
</style>
