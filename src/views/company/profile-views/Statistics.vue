<template>
  <div>
    <div class="dimmable">
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui loader"></div>
      </div>
      <h1 class="ui center aligned icon header">
        <i class="circular chart bar icon"></i>
        Statistics
      </h1>
      <div class="ui huge five statistics">
        <div
          v-for="[key, value] in Object.entries(stats)"
          class="ui statistic"
          :class="stateColor[key]"
          :key="key"
        >
          <div class="value counter">{{ value }}</div>
          <div class="label">{{ key }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/services/api";
import { mapState } from "vuex";

const stateColor = {
  ASSIGNED_TO_COMPANY: "yellow",
  READY_FOR_SHIPPING: "olive",
  ASSIGNED_TO_TRANSPORTER: "green",
  ON_ITS_WAY: "teal",
  DELIVERED: "blue",
};

@Component({
  computed: mapState(["isLoading"]),
})
export default class CompanyStatistics extends Vue {
  stats = {
    ASSIGNED_TO_COMPANY: 0,
    READY_FOR_SHIPPING: 0,
    ASSIGNED_TO_TRANSPORTER: 0,
    ON_ITS_WAY: 0,
    DELIVERED: 0,
  } as any;
  stateColor = stateColor;
  created() {
    api.companies.waterOrdersStatistics().then((r) => {
      this.startCounters(r.data);
    });
  }
  startCounters(newStats: []) {
    const counters = document.querySelectorAll(".counter");
    const speed = 500;
    console.log(counters.length);

    newStats.forEach((stat: any) => {
      const updateCount = () => {
        const target = stat.count;
        const current = this.stats[stat.state];

        // Lower inc to slow and higher to slow
        const inc = target / speed;

        // Check if target is reached
        if (current < target) {
          // Add inc to count and output in counter
          this.$set(this.stats, stat.state, Math.ceil(current + inc));

          // Call function every ms
          setTimeout(updateCount, 100);
        } else {
          this.$set(this.stats, stat.state, target);
        }
      };

      updateCount();
    });
  }
}
</script>

<style></style>
