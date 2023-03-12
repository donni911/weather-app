<template>
  <section class="c-section c-main">
    <div class="c-main__heading">
      <div class="c-main__search" ref="inputWrapper">
        <div class="c-input__wrapper">
          <input
            class="c-input"
            type="text"
            v-model="searchLocationInput"
            @input="getLocations"
            @blur="closeList"
            @keyup.enter="getLocations"
            placeholder="Look for weather in..."
            @focus="increaseWidthInput"
            ref="inputSearch"
          />
          <button @click="getLocations" class="c-input__btn">
            <div class="c-svg">
              <font-awesome-icon icon="fa-solid fa-search" />
            </div>
          </button>
        </div>
        <transition name="fade">
          <ul v-if="showList" class="c-main__search__list" ref="cityList">
            <template v-if="cities.length">
              <li
                v-for="city in cities"
                :key="city"
                @click="selectLocation(city.name)"
                class="c-main__search__list__item"
              >
                {{ city.name }}
              </li>
            </template>
            <li
              v-else
              class="c-main__search__list__item"
              style="pointer-events: none"
            >
              No such cities
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <div class="c-main__section">
      <transition mode="out-in" name="fade">
        <ul class="c-main__list" v-if="searchCitiesWeather.length">
          <WeatherSection
            v-for="cityWeather in searchCitiesWeather"
            :cityWeather="cityWeather"
            :key="cityWeather.id"
          />
        </ul>
        <div
          v-else-if="!searchCitiesWeather.length && loading"
          class="c-preloader__wrapper"
        >
          <Loader />
        </div>
        <div
          class="c-main__exclaimer"
          v-else-if="!searchCitiesWeather.length && !loading"
        >
          Looking for a weather?
        </div>
      </transition>

      <div class="c-ghost" v-if="searchCitiesWeather.length < 5">
        <button class="c-ghost__button" @click="addWeatherCard">
          <div class="c-svg">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </div>
        </button>
      </div>
    </div>

    <Modal :modalIsOpen="modalIsOpen" @closeModal="closeModal">
      <template v-slot:title> Oh ooh... </template>
      <template v-slot:description>
        You can add only five(5) blocks ! <br />

        If you want to add a new one, you should delete one that you have.
      </template>
    </Modal>
  </section>
</template>

<script>
import WeatherSection from "../components/WeatherSection.vue";
import Loader from "../components/UI/Loader.vue";
import Modal from "../components/UI/Modal.vue";

import { debounce } from "../modules/debounce";

import { mapState, mapActions } from "pinia";
import { weatherStore } from "../store/weather.js";

export default {
  components: {
    WeatherSection,
    Loader,
    Modal,
  },

  data() {
    return {
      showList: false,
      searchLocationInput: "",
      modalIsOpen: false,
    };
  },

  computed: {
    ...mapState(weatherStore, [
      "cities",
      "loading",
      "searchCitiesWeather",
      "currentLocation",
    ]),
  },

  methods: {
    ...mapActions(weatherStore, [
      "getCitiesAction",
      "getWeatherAction",
      "getCurrentLocationAction",
    ]),

    increaseWidthInput() {
      this.$refs.inputWrapper.style.width = 350 + "px";
    },

    addWeatherCard() {
      this.$refs.inputSearch.focus();
    },

    closeList() {
      this.$refs.inputWrapper.style.width = 250 + "px";
      this.$data.showList = false;
    },

    closeModal() {
      this.modalIsOpen = false;
    },

    handleModalConfirmed() {},

    selectLocation(location) {
      this.$data.showList = false;

      if (this.searchCitiesWeather.length > 4) {
        this.modalIsOpen = true;
      } else {
        this.getWeatherAction(location);
      }
    },

    getLocations: debounce(function () {
      if (this.$data.searchLocationInput.length > 2) {
        this.$data.showList = true;
        this.getCitiesAction(this.$data.searchLocationInput);
      } else {
        this.$data.showList = false;
      }
    }, 300),
  },

  watch: {
    modalIsOpen(val) {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },

  async mounted() {
    const storage = localStorage.getItem("weatherInCities");

    if (storage && !this.searchCitiesWeather.length) {
      const parsedStorage = JSON.parse(storage);
      if (parsedStorage.length) {
        parsedStorage.forEach(async (el) => {
          this.selectLocation(el.temperatureToday.name);
        });
      }
    } else if (!storage && !this.searchCitiesWeather.length) {
      await this.getCurrentLocationAction();

      this.selectLocation(this.currentLocation.city);
    }
  },
};
</script>
