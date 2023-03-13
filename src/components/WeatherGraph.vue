<template>
  <div class="c-chart">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import ChartJS from "../modules/chart";
export default {
  props: ["weather"],

  data() {
    return {
      myChart: null,
    };
  },

  methods: {
    updateChart() {
      const newData = [30, 40, 50, 60, 70];
      this.myChart.updateData(newData);
    },
  },

  mounted() {
    this.myChart = new ChartJS(this.$refs.chart, this.weather.list.slice(0, 9));
  },

  beforeDestroy() {
    this.myChart.destroy();
  },
};
</script>
