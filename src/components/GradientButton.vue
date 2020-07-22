<template>
  <button :class="{ loading: isLoading }">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class GradientButton extends Vue {
  @Prop({ default: false, type: Boolean }) isLoading!: boolean;
}
</script>

<style scoped lang="less">
.gradient {
  background: linear-gradient(to right, #00bdce 6%, #0071d2);
}

button {
  .gradient();
  border: 2px solid white;
  color: white;
  border-radius: 2em;
  padding: 15px;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s;

  &:hover:not(.loading):not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.loading {
  opacity: 0.5;
  cursor: wait;
}
</style>
