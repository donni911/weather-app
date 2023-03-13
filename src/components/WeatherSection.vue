<template>
  <li class="c-main__item" :class="{ active: cityWeather.starred }">
    <transition name="fade">
      <div class="c-main__action" v-show="cityWeather">
        <button
          class="c-main__action__save"
          @click="deleteItem"
          v-show="!isStarPage"
        >
          <div class="c-svg">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </div>
        </button>
        <button
          class="c-main__action__save"
          :class="{ active: cityWeather.starred }"
          @click="toggleSave"
        >
          <div class="c-svg">
            <font-awesome-icon icon="fa-solid fa-star" />
          </div>
        </button>
      </div>
    </transition>
    <Weather-Card
      v-if="cityWeather.temperatureToday"
      :weather="cityWeather.temperatureToday"
    />
    <Weather-Graph
      v-if="cityWeather.temperatureByHours && cityWeather.temperatureByWeek"
      :weather="cityWeather"
      :isFiveDays="isFiveDays"
    />
  </li>

  <Modal
    :modalIsOpen="modalIsOpen"
    @closeModal="closeModal"
    @modalConfirmed="deleteWeatherAction(cityWeather)"
  >
    <template v-slot:title> Delete item? </template>
    <template v-slot:description> You sure? </template>
  </Modal>
</template>

<script>
import WeatherCard from "./WeatherCard.vue";
import WeatherGraph from "./WeatherGraph.vue";
import Modal from "./UI/Modal.vue";

import { mapActions } from "pinia";
import { weatherStore } from "../store/weather.js";

export default {
  components: {
    WeatherCard,
    WeatherGraph,
    Modal,
  },

  props: ["cityWeather", "isFiveDays"],

  inject: {
    isStarPage: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      modalIsOpen: false,
    };
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

  methods: {
    ...mapActions(weatherStore, ["deleteWeatherAction", "updateLocalStorage"]),

    deleteItem() {
      this.modalIsOpen = true;
    },

    closeModal() {
      this.modalIsOpen = false;
    },

    toggleSave() {
      this.cityWeather.starred = !this.cityWeather.starred;

      this.updateLocalStorage();
    },
  },
};
</script>
