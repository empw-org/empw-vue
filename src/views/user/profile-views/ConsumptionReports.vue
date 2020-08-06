<template>
  <div class="">
    <div class="ui equal width center aligned centered grid">
      <div class="row">
        <h1>Consumption Reports</h1>
      </div>
      <span>
        The consumption data sent from your sensor are processed for everyday.
        <br />
        The following chart shows your consumption reports for
        {{ chartData.labels.length }} days
      </span>
      <div class="row">
        <div class="ui form">
          <div class="inline fields">
            <div class="field" :key="index" v-for="(chart, index) in charts">
              <div class="ui radio checkbox">
                <input
                  type="radio"
                  :checked="chartType === chart"
                  @click="chartType = chart"
                />
                <label>{{ chart }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dimmable">
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui loader"></div>
      </div>
      <component
        v-if="showChart"
        :is="chartType"
        :chartdata="chartData"
        :styles="myStyles"
        :height="230"
      />
    </div>
  </div>
</template>

<script lang="ts">
import "@/components/Chart.js";
import api from "@/services/api";

import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

type ConsumptionReport = {
  date: string;
  consumption: number;
};

@Component({
  computed: mapState(["isLoading"]),
})
export default class UserConsumptionReports extends Vue {
  showChart = false;
  charts = ["LineChart", "BarChart", "HorizontalBarChart"];

  chartType = "LineChart";
  myStyles = {
    maintainAspectRatio: true,
    marginTop: "2rem",
  };
  chartData = {
    labels: [] as any[],
    datasets: [
      {
        label: "Consumption",
        backgroundColor: "#00bdce50",
        borderColor: "#0071d2",
        borderWidth: 2,
        data: [] as any[],
      },
    ],
  };
  created() {
    api.users.getConsumptionReports().then((r) => {
      const consumption_reports: ConsumptionReport[] = r.data;
      const consumptions = consumption_reports.map((r) => r.consumption);
      const dates = consumption_reports.map((r) => r.date);
      this.chartData.labels = dates;
      this.chartData.datasets[0].data = consumptions;
      this.showChart = true;
    });
  }
}
</script>
