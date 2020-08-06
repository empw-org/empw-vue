<template>
  <div class="gradient-container">
    <div class="form-card" v-on:click.ctrl.alt.prevent="goToAdmin">
      <router-link class="full-width" :to="{ name: 'user-signin' }">
        <GradientButton>Contiue as User</GradientButton>
      </router-link>

      <div class="or-separator">
        OR
        <div class="hr-line"></div>
      </div>

      <router-link class="full-width" :to="{ name: 'company-signin' }">
        <GradientButton>Contiue as Company</GradientButton>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GradientButton from "@/components/GradientButton.vue";

@Component({
  components: {
    GradientButton,
  },
})
export default class GetStarted extends Vue {
  goToAdmin(): void {
    this.$router.push({ name: "admin-signin" });
  }
}
</script>

<style scoped lang="less">
@import "@/assets/variables";

.gradient-container {
  .gradient();
  min-height: calc(100% - @header-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .form-card {
    display: grid;
    grid-template-columns: 1fr 0.5fr 1fr;
    align-items: center;
    justify-items: center;

    .or-separator {
      color: @dark-gray;

      .hr-line {
        height: 1px;
        width: 100%;
        background-color: @dark-gray;
      }
    }
  }
}
</style>
