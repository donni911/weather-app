<template>
  <section class="c-section c-starred">
    <div class="c-main__section">
      <transition mode="out-in" name="fade">
        <div v-if="starWeather.length" class="c-starred__block">
          <h2 class="c-starred__heading">Choose weather for...</h2>
          <div class="c-starred__switcher">
            <span>One day</span>
            <Switcher @clickEvent="toggleDays" v-model="isFiveDays" />
            <span>5 days</span>
          </div>
        </div>
      </transition>
      <transition mode="out-in" name="fade">
        <ul class="c-main__list" v-if="starWeather.length">
          <WeatherSection
            v-for="cityWeather in starWeather"
            :cityWeather="cityWeather"
            :key="cityWeather.id"
            :isFiveDays="isFiveDays"
          />
        </ul>
        <div
          v-else-if="!starWeather.length && loading"
          class="c-preloader__wrapper"
        >
          <Loader />
        </div>
        <div
          class="c-starred__exclaimer"
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
import Switcher from "../components/UI/Switcher.vue";

export default {
  components: {
    WeatherSection,
    Loader,
    Switcher,
  },

  data() {
    return {
      isFiveDays: null,
      isStarPage: true,
    };
  },

  provide() {
    return {
      isFiveDays: this.$data.isFiveDays,
      isStarPage: this.$data.isStarPage,
    };
  },

  methods: {
    toggleDays() {
      this.$data.isFiveDays = !this.$data.isFiveDays;

      localStorage.isFiveDays = this.$data.isFiveDays;
    },
  },

  computed: {
    ...mapState(weatherStore, ["starWeather", "loading"]),
  },

  mounted() {
    if (localStorage.isFiveDays) {
      this.isFiveDays = JSON.parse(localStorage.isFiveDays);
    } else {
      this.isFiveDays = false;
    }
  },
};
</script>
