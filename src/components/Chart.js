// https://stackoverflow.com/questions/51821799/dynamically-extend-vuejs-component-based-on-prop
import { Line, Bar, HorizontalBar } from "vue-chartjs";

import Vue from "vue";

const chart = {
  Line,
  Bar,
  HorizontalBar,
};

//this makes registering all those components easier.
Object.entries(chart).forEach(([key, value]) => {
  console.log(`registering ${key}Chart`);
  Vue.component(`${key}Chart`, {
    extends: value,
    props: ["chartdata", "options"],
    mounted() {
      this.renderChart(this.chartdata, this.options);
    },
  });
});
