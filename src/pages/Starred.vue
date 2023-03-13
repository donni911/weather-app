<template>
  <section class="c-section c-starred">
    <div class="c-main__section">
      <transition mode="out-in" name="fade">
        <ul class="c-main__list" v-if="starWeather.length">
          <WeatherSection
            v-for="cityWeather in starWeather"
            :cityWeather="cityWeather"
            :key="cityWeather.id"
          />
        </ul>
        <div
          v-else-if="!starWeather.length && loading"
          class="c-preloader__wrapper"
        >
          <Loader />
        </div>
        <div
          class="c-main__exclaimer"
          v-else-if="!starWeather.length && !loading"
        >
          Add some favourite on this page (click on Star)
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState } from "pinia";
import { weatherStore } from "../store/weather.js";

import WeatherSection from "../components/WeatherSection.vue";
import Loader from "../components/UI/Loader.vue";

export default {
  components: {
    WeatherSection,
    Loader,
  },

  provide() {
    return {
      isStarPage: true,
    };
  },

  computed: {
    ...mapState(weatherStore, ["starWeather", "loading"]),
  },
};
</script>
