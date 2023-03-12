<template>
  <div class="c-chart">
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import chart from "../modules/chart";
import { getTime } from "../modules/getTime";
export default {
  props: ["weather"],
  data() {
    return {
      myChart: null,
    };
  },
  methods: {
    computedTime(value) {
      return getTime(value);
    },
    redrawChart() {
      if (this.myChart) {
        this.myChart.destroy();
      }
      this.myChart = chart(this.$refs.myChart, this.weather.list.slice(0, 9));
    },
  },
  mounted() {
    this.myChart = chart(this.$refs.myChart, this.weather.list.slice(0, 9));
    window.addEventListener("resize", this.redrawChart);
  },
};
</script>
