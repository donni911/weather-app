<template>
  <section class="c-section c-main">
    <div class="c-main__heading">
      <div class="c-main__search">
        <input
          class="c-input"
          type="text"
          v-model="searchLocation"
          @input="getLocations"
          @keyup.enter="getLocations"
          @blur="closeList"
        />
        <transition name="fade">
          <ul v-if="showList" class="c-main__search__list">
            <li
              v-for="city in cities"
              :key="city"
              @click="selectLocation(city)"
              class="c-main__search__list__item"
            >
              {{ city.name }}
            </li>
          </ul>
        </transition>
      </div>

      <div class="c-main__action">
        <button
          class="c-main__action__save"
          :class="{ active: isActive }"
          @click="toggleSave"
        >
          <div class="c-svg">
            <font-awesome-icon icon="fa-solid fa-star" />
          </div>
        </button>
      </div>
    </div>
    <section class="c-main__section">
      <Weather-Card v-if="searchCityWeather" :weather="searchCityWeather" />
      <div v-else>{{ errorMessage }}</div>
    </section>
  </section>
</template>

<script>
import WeatherCard from "../components/WeatherCard.vue";

import { debounce } from "../modules/debounce";

import { mapState, mapActions } from "pinia";
import { weatherStore } from "../store/weather.js";

export default {
  components: {
    WeatherCard,
  },
  data() {
    return {
      isActive: false,
      searchLocation: "",
      showList: false,
      error: "",
    };
  },

  watch: {
    errorMessage(val) {
      this.error = val;
    },
  },

  computed: {
    ...mapState(weatherStore, ["cities", "searchCityWeather", "errorMessage"]),
  },

  methods: {
    ...mapActions(weatherStore, ["getCitiesAction", "getWeatherAction"]),

    toggleSave() {
      this.$data.isActive = !this.$data.isActive;
    },

    closeList() {
      this.showList = false;
    },

    selectLocation(location) {
      this.searchLocation = location.name;
      this.showList = false;

      this.getWeatherAction(location);
    },

    getLocations: debounce(function () {
      if (this.searchLocation.length > 2) {
        this.showList = true;
        this.getCitiesAction(this.searchLocation);
      } else {
        this.showList = false;
      }
      console.log(this.showList);
    }, 300),
  },
};
</script>
