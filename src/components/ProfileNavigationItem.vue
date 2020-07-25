<template>
  <div class="item-wrapper" :class="{ active: isActive }">
    <div class="icon"><slot name="icon"></slot></div>
    <div class="text"><slot name="text"></slot></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class GradientButton extends Vue {
  @Prop({ default: false, type: Boolean }) isActive!: boolean;
}
</script>

<style lang="less" scoped>
@import "@/assets/variables";

.item-wrapper {
  padding: 0.75rem 1rem;
  border-radius: 2em;
  color: @dark-gray;

  .icon {
    display: inline-block;
    margin-right: 1.25rem;
  }

  .text {
    display: inline-block;
  }

  &:hover {
    cursor: pointer;
  }
}

.active {
  .gradient-reverse();
  color: white;
}
</style>
