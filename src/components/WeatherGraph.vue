<template>
  <div class="c-chart">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import ChartJS from "../modules/chart";

export default {
  props: ["weather", "isFiveDays"],

  data() {
    return {
      myChart: null,
    };
  },

  watch: {
    isFiveDays: function (newValue) {
      if (this.myChart) {
        this.myChart.destroy();
      }

      if (this.$refs.chart) {
        if (newValue) {
          this.updateChart("week");
        } else {
          this.updateChart("day");
        }
      }
    },
  },

  methods: {
    updateChart(val) {
      switch (val) {
        case "week":
          return (this.myChart = new ChartJS(
            this.$refs.chart,
            this.weather.temperatureByWeek,
            true
          ));
        case "day":
          return (this.myChart = new ChartJS(
            this.$refs.chart,
            this.weather.temperatureByHours.list.slice(0, 9)
          ));
        default:
          return (this.myChart = new ChartJS(
            this.$refs.chart,
            this.weather.temperatureByHours.list.slice(0, 9)
          ));
      }
    },
  },

  mounted() {
    if (this.isFiveDays) {
      this.updateChart("week");
    } else {
      this.updateChart("day");
    }
  },

  beforeDestroy() {
    this.myChart.destroy();
  },
};
</script>
