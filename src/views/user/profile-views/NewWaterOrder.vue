<template>
  <div>
    <h1 class="ui center aligned icon header">
      <i class="wpforms circular icon"></i>
      New Water Order
    </h1>
    <div class="ui container">
      <form
        class="ui form"
        :class="{ loading: isLoading }"
        @submit.prevent="onNewWaterOrder"
      >
        <div class="ui stackable grid container">
          <div class="ui sixteen wide column">
            <div class="field">
              <label>Amount</label>
              <input type="number" v-model="amount" />
            </div>
            <div class="field">
              <div
                class="location-warning"
                :class="{ 'location-error': locationError }"
              >
                * You need to allow access to your location.
                <span @click="onAskForLocation">Click here</span>
              </div>
            </div>
          </div>

          <div class="ui ten wide column">
            <button
              type="submit"
              class="ui submit button"
              :disabled="!location"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/services/api";
import { mapState } from "vuex";
import handleValidationErrors from "@/store/handle-validation-errors";

@Component({
  computed: mapState(["isLoading"]),
})
export default class UserNewWaterOrder extends Vue {
  amount = 1;
  locationError = false;
  location: { longitude: number; latitude: number } | null = null;

  onAskForLocation(): void {
    const geoOptions = { enableHighAccuracy: true };
    const geoSuccess = (l: any) => {
      const { longitude, latitude } = l.coords;
      this.location = { longitude, latitude };
    };
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      () => (this.locationError = true),
      geoOptions
    );
  }

  onNewWaterOrder() {
    const { amount, location } = this;
    const body = { amount, location };
    api.users
      .createNewWaterOrder(body)
      .then((r) => {
        (this as any).$swal(
          "Created",
          "Your water order has been created",
          "success"
        );
      })
      .catch((e) => {
        const errors = e.response.data;
        (this as any).$swal(
          "Error!",
          handleValidationErrors(errors).join(" "),
          "error"
        );
      });
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/variables";

.location-warning {
  margin-top: 15px;
  color: @dark-gray;
  font-size: 10pt;

  span {
    color: @gray;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
