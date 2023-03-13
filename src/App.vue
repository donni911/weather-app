<template>
  <div class="container">
    <div class="c-weather">
      <c-header :menu-items="menuItems" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import CHeader from "./components/CHeader.vue";

import { mapState, mapActions } from "pinia";
import { weatherStore } from "./store/weather.js";

export default {
  components: {
    CHeader,
  },

  computed: {
    ...mapState(weatherStore, [
      "menuItems",
      "searchCitiesWeather",
      "currentLocation",
    ]),
  },

  methods: {
    ...mapActions(weatherStore, [
      "getWeatherAction",
      "getCurrentLocationAction",
    ]),
  },

  async mounted() {
    const storage = localStorage.getItem("weatherInCities");

    if (storage && !this.searchCitiesWeather.length) {
      const parsedStorage = JSON.parse(storage);
      if (parsedStorage.length) {
        parsedStorage.forEach(async (el) => {
          this.getWeatherAction(el);
        });
      }
    } else if (!storage && !this.searchCitiesWeather.length) {
      await this.getCurrentLocationAction();
      this.getWeatherAction(this.currentLocation.city);
    }
  },
};
</script>
