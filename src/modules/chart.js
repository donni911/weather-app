import Chart from "chart.js/auto";
import { formatTime } from "./getTime";
class ChartJS {
  constructor(canvasRef, data) {
    this.labels = [];
    this.dayTemperature = [];

    data.forEach((el) => {
      this.dayTemperature.push(Math.round(el.main.temp));
      this.labels.push(formatTime(el.dt_txt));
    });

    this.canvas = canvasRef;
    this.ctx = this.canvas.getContext("2d");
    this.chart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.labels,
        showTooltips: false,
        datasets: [
          {
            data: this.dayTemperature,

            borderColor: "#83c5be",
            tension: 0.1,

            pointRadius: 8,
            pointHoverRadius: 6,
            pointHitRadius: 30,

            backgroundColor: "#83c5be",
          },
        ],
      },
      options: {
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
          },

          title: {
            display: true,
            text: "Day Temperature",
            color: "#000",
          },

          tooltip: {
            xAlign: "center",
            yAlign: "bottom",
            titleAlign: "center",
            bodyAlign: "center",
            backgroundColor: "#006d77",
            displayColors: false,
            titleSpacing: 3,
            callbacks: {
              label: function (context) {
                return context.formattedValue + " C°";
              },
            },
          },
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
        },
      },
    });

    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (this.chart) {
      this.chart.resize();
    }
  };

  updateData(newData) {
    this.chart.data.datasets[0].data = newData;
    this.chart.update();
  }

  destroy() {
    this.chart.destroy();
  }
}

export default ChartJS;
