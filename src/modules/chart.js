import Chart from "chart.js/auto";

const formatTime = (time) => {
  let hours = new Date(time).getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + " " + ampm;
  return strTime;
};

const chart = (el, data) => {
  const labels = [];
  const dayTemperature = [];

  data.forEach((el) => {
    dayTemperature.push(Math.round(el.main.temp));
    labels.push(formatTime(el.dt_txt));
  });

  new Chart(el, {
    type: "line",

    data: {
      labels: labels,
      showTooltips: false,
      datasets: [
        {
          data: dayTemperature,

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
};

export default chart;
