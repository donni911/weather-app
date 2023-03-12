<template>
  <div class="c-card">
    <transition name="fade-scale" mode="out-in">
      <div :key="computedImage" class="c-card__wrap">
        <img class="c-img" :src="'/' + computedImage" :alt="computedImage" />
      </div>
    </transition>
    <div class="c-card__heading">
      <transition name="fade" mode="out-in">
        <h4 class="c-card__heading-heading" :key="weather.name">
          Weather {{ "in " + weather.name }}
        </h4>
      </transition>
    </div>
    <div class="c-card__main">
      <div class="c-card__main__wrapper">
        <transition name="fade" mode="out-in">
          <h3 class="c-card__main__wrapper__heading" :key="weather.main.temp">
            {{ Math.round(weather.main.temp) + "°C" }}
          </h3>
        </transition>
        <div class="c-card__main__feels">
          <transition name="fade" mode="out-in">
            <span :key="weather.main.feels_like">
              {{ Math.round(weather.main.feels_like) + "°C" }}
            </span>
          </transition>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <span :key="weather.weather[0].main">{{
          weather.weather[0].main
        }}</span></transition
      >
    </div>

    <div class="c-card__block__wrapper">
      <card-sm
        :title="'Pressure'"
        class="c-card__block--primary"
        :description="weather.main.pressure"
      />
      <card-sm
        :title="'Visibility'"
        class="c-card__block--muted"
        :description="weather.visibility"
      />
      <card-sm
        :title="'Humidity'"
        class="c-card__block--secondary"
        :description="weather.main.humidity"
      />
    </div>
  </div>
</template>

<script>
import CardSm from "./UI/CardSm.vue";

export default {
  components: {
    CardSm,
  },

  props: ["weather"],

  computed: {
    computedImage() {
      switch (this.weather.weather[0].main) {
        case "Clouds":
          return "cloud.png";
        case "Clear":
          return "clear.png";
        case "Snow":
          return "snow.png";
        case "Rain":
          return "rain.png";
        case "Drizzle":
          return "rain.png";
        case "Thunderstorm":
          return "thunderstorm.png";
        default:
          return "cloud.png";
      }
    },
  },
};
</script>
