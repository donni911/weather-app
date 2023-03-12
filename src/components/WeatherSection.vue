<template>
  <li class="c-main__item" :class="{ active: isActive }">
    <transition name="fade">
      <div class="c-main__action" v-show="cityWeather">
        <button class="c-main__action__save" @click="deleteItem">
          <div class="c-svg">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </div>
        </button>
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
    </transition>
    <Weather-Card
      v-if="cityWeather.temperatureToday"
      :weather="cityWeather.temperatureToday"
    />
    <Weather-Graph
      v-if="cityWeather.temperatureByHours"
      :weather="cityWeather.temperatureByHours"
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

  props: ["cityWeather"],

  data() {
    return {
      isActive: false,
      modalIsOpen: false,
    };
  },

  methods: {
    ...mapActions(weatherStore, ["deleteWeatherAction", "saveWeatherAction"]),

    deleteItem() {
      this.modalIsOpen = true;
    },

    closeModal() {
      this.modalIsOpen = false;
    },

    toggleSave() {
      this.$data.isActive = !this.$data.isActive;
      this.saveWeatherAction(this.cityWeather, this.$data.isActive);
    },
  },
};
</script>
